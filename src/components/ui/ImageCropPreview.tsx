"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Check, Move } from 'lucide-react';

interface ImageCropPreviewProps {
  file: File;
  onConfirm: (croppedFile: File) => void;
  onCancel: () => void;
}

export default function ImageCropPreview({ file, onConfirm, onCancel }: ImageCropPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [displayDimensions, setDisplayDimensions] = useState({ width: 0, height: 0 });
  const [cropOffset, setCropOffset] = useState(0); // Pixel offset of the crop region on the display image
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragStartOffset, setDragStartOffset] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Determine if the image is wider or taller than 16:9
  const targetRatio = 16 / 9;
  const currentRatio = imageDimensions.width / (imageDimensions.height || 1);
  const isWiderThan16by9 = currentRatio > targetRatio;

  // Calculate crop region dimensions on the display image
  let cropDisplayWidth: number, cropDisplayHeight: number, maxOffset: number;
  if (isWiderThan16by9) {
    // Crop is horizontal (left/right drag)
    cropDisplayHeight = displayDimensions.height;
    cropDisplayWidth = Math.round(displayDimensions.height * targetRatio);
    maxOffset = Math.max(0, displayDimensions.width - cropDisplayWidth);
  } else {
    // Crop is vertical (up/down drag)
    cropDisplayWidth = displayDimensions.width;
    cropDisplayHeight = Math.round(displayDimensions.width / targetRatio);
    maxOffset = Math.max(0, displayDimensions.height - cropDisplayHeight);
  }

  // Load image
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = url;

    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Calculate display dimensions based on container size
  useEffect(() => {
    if (!containerRef.current || !imageDimensions.width) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const imgRatio = imageDimensions.width / imageDimensions.height;
    let displayW: number, displayH: number;

    if (imgRatio > containerWidth / containerHeight) {
      // Image is wider than container
      displayW = containerWidth;
      displayH = containerWidth / imgRatio;
    } else {
      // Image is taller than container
      displayH = containerHeight;
      displayW = containerHeight * imgRatio;
    }

    setDisplayDimensions({ width: Math.round(displayW), height: Math.round(displayH) });

    // Set initial offset to center
    const curRatio = imageDimensions.width / imageDimensions.height;
    if (curRatio > targetRatio) {
      const cropW = Math.round(displayH * targetRatio);
      setCropOffset(Math.round((displayW - cropW) / 2));
    } else {
      const cropH = Math.round(displayW / targetRatio);
      setCropOffset(Math.round((displayH - cropH) / 2));
    }
  }, [imageDimensions, targetRatio]);

  // Mouse/Touch drag handlers
  const handleDragStart = useCallback((clientPos: number) => {
    setIsDragging(true);
    setDragStart(clientPos);
    setDragStartOffset(cropOffset);
  }, [cropOffset]);

  const handleDragMove = useCallback((clientPos: number) => {
    if (!isDragging) return;
    const delta = clientPos - dragStart;
    const newOffset = Math.max(0, Math.min(maxOffset, dragStartOffset + delta));
    setCropOffset(newOffset);
  }, [isDragging, dragStart, dragStartOffset, maxOffset]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(isWiderThan16by9 ? e.clientX : e.clientY);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleDragMove(isWiderThan16by9 ? e.clientX : e.clientY);
    const onMouseUp = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, handleDragMove, handleDragEnd, isWiderThan16by9]);

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(isWiderThan16by9 ? touch.clientX : touch.clientY);
  };

  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleDragMove(isWiderThan16by9 ? touch.clientX : touch.clientY);
    };
    const onTouchEnd = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd, isWiderThan16by9]);

  // Confirm crop
  const handleConfirm = async () => {
    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = imageUrl;
      await new Promise<void>((resolve) => { img.onload = () => resolve(); });

      // Map display offset back to original image coordinates
      const scale = imageDimensions.width / displayDimensions.width;

      let srcX: number, srcY: number, srcW: number, srcH: number;

      if (isWiderThan16by9) {
        srcX = Math.round(cropOffset * scale);
        srcY = 0;
        srcH = imageDimensions.height;
        srcW = Math.round(imageDimensions.height * targetRatio);
      } else {
        srcX = 0;
        srcY = Math.round(cropOffset * scale);
        srcW = imageDimensions.width;
        srcH = Math.round(imageDimensions.width / targetRatio);
      }

      // Clamp to image bounds
      srcW = Math.min(srcW, imageDimensions.width - srcX);
      srcH = Math.min(srcH, imageDimensions.height - srcY);

      const canvas = document.createElement('canvas');
      canvas.width = srcW;
      canvas.height = srcH;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        onConfirm(file);
        return;
      }

      ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

      canvas.toBlob((blob) => {
        if (!blob) {
          onConfirm(file);
          return;
        }
        const croppedFile = new File([blob], file.name, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        onConfirm(croppedFile);
      }, 'image/jpeg', 0.92);
    } catch {
      onConfirm(file); // Fallback
    }
  };

  if (!imageUrl || !displayDimensions.width) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm">
        <div className="text-white text-sm">Loading image...</div>
      </div>
    );
  }

  // Crop region position
  const cropStyle: React.CSSProperties = isWiderThan16by9
    ? { left: cropOffset, top: 0, width: cropDisplayWidth, height: cropDisplayHeight }
    : { left: 0, top: cropOffset, width: cropDisplayWidth, height: cropDisplayHeight };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-bold">Crop to 16:9</h3>
          <p className="text-white/50 text-xs mt-0.5">
            Drag the highlighted area to choose which part to keep
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          aria-label="Close crop preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image with crop overlay */}
      <div
        ref={containerRef}
        className="relative flex-1 w-full max-w-4xl max-h-[60vh] flex items-center justify-center overflow-hidden rounded-lg"
      >
        <div
          className="relative"
          style={{ width: displayDimensions.width, height: displayDimensions.height }}
        >
          {/* The image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Crop preview"
            className="w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
          />

          {/* Dark overlay covering the entire image */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          {/* Bright crop region (clear area) */}
          <div
            className={`absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              ...cropStyle,
              // Override the full dark overlay within this area
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {/* Clear window showing the image underneath */}
            <div className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt=""
                className="select-none pointer-events-none"
                draggable={false}
                style={{
                  width: displayDimensions.width,
                  height: displayDimensions.height,
                  position: 'absolute',
                  left: isWiderThan16by9 ? -cropOffset : 0,
                  top: isWiderThan16by9 ? 0 : -cropOffset,
                }}
              />
            </div>

            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />

            {/* Center drag indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/40 text-white rounded-full p-2 backdrop-blur-sm">
                <Move className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-4xl flex items-center justify-between mt-4 gap-3">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all border border-white/10"
        >
          Skip (Use Original)
        </button>
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="px-6 py-2.5 bg-[#E3572D] hover:bg-[#256a7a] text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-60"
        >
          {isProcessing ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Cropping...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Confirm Crop
            </>
          )}
        </button>
      </div>
    </div>
  );
}
