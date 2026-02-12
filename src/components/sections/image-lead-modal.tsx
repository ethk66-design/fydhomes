"use client";

import React, { useState, useEffect } from 'react';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import { X, ChevronLeft, ChevronRight, Check, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface ImageLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    initialIndex?: number;
    propertyTitle: string;
}

export default function ImageLeadModal({
    isOpen,
    onClose,
    images = [],
    initialIndex = 0,
    propertyTitle
}: ImageLeadModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: `Hello, I am interested in ${propertyTitle}`,
        userType: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setCurrentIndex(initialIndex);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, initialIndex]);

    if (!isOpen) return null;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    message: `${formData.message} [User Type: ${formData.userType}]`,
                    source: 'gallery_modal'
                })
            });

            if (!res.ok) throw new Error('Failed to submit');

            setIsSuccess(true);
            toast.success("Inquiry sent successfully!");
        } catch (error: unknown) {
            console.error('Error submitting lead:', error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const userTypes = ["I'm a buyer", "I'm a tenant", "I'm an agent", "Other"];

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-0 sm:p-4 md:p-6 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Close Button - Outside on mobile, Inside on Desktop for cleanliness */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[10000] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10"
                aria-label="Close gallery"
            >
                <X className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-[1500px] max-h-[90vh] bg-white sm:rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-2xl ring-1 ring-white/10">

                {/* Left Side: Image Viewer */}
                <div className="w-full lg:w-2/3 h-[40vh] lg:h-full bg-[#050505] relative flex items-center justify-center group">
                    {images.length > 0 && (
                        <>
                            <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-12">
                                <div className="relative w-full h-full">
                                    <ImageWithFallback
                                        src={images[currentIndex]}
                                        alt={`Property image ${currentIndex + 1}`}
                                        fill
                                        className="object-contain"
                                        priority
                                        quality={100}
                                    />
                                </div>
                            </div>

                            {/* Navigation Arrows - Styled */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                className="absolute left-4 p-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all active:scale-95 hidden lg:flex items-center justify-center backdrop-blur-sm"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                className="absolute right-4 p-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all active:scale-95 hidden lg:flex items-center justify-center backdrop-blur-sm"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Mobile Navigation Areas (Invisible tap zones) */}
                            <div className="absolute inset-y-0 left-0 w-1/4 z-10 lg:hidden" onClick={(e) => { e.stopPropagation(); handlePrev(); }} role="button" aria-label="Previous image" />
                            <div className="absolute inset-y-0 right-0 w-1/4 z-10 lg:hidden" onClick={(e) => { e.stopPropagation(); handleNext(); }} role="button" aria-label="Next image" />

                            {/* Image Counter */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-1.5 rounded-full text-white text-xs font-medium border border-white/10 backdrop-blur-md tracking-wider">
                                {currentIndex + 1} / {images.length}
                            </div>
                        </>
                    )}
                </div>

                {/* Right Side: Contact Form */}
                <div className="w-full lg:w-1/3 h-full overflow-y-auto bg-white p-6 lg:p-10 flex flex-col border-l border-gray-100">
                    {isSuccess ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in slide-in-from-bottom-5 duration-500">
                            <div className="w-20 h-20 bg-green-50 text-[#00C05D] rounded-full flex items-center justify-center mb-2 ring-1 ring-green-100 shadow-sm">
                                <Check className="w-10 h-10" strokeWidth={3} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                                <p className="text-gray-500 max-w-[280px] mx-auto leading-relaxed">
                                    Thanks for your interest. We&apos;ll get back to you with more details shortly.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="mt-4 px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
                            >
                                Return to Gallery
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <span className="inline-block px-3 py-1 bg-blue-50 text-[#00AEEF] text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                                    Interested?
                                </span>
                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                                    Get more details
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Fill out the form below to receive brochure and floor plans for <span className="font-semibold text-gray-900">{propertyTitle}</span>.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 flex-1">
                                <div className="space-y-5">
                                    <div className="relative group">
                                        <input
                                            id="lead-name"
                                            type="text"
                                            name="name"
                                            placeholder=" "
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="peer w-full px-4 py-3.5 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-gray-50/30 focus:bg-white text-sm"
                                        />
                                        <label htmlFor="lead-name" className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-black pointer-events-none peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-xs">
                                            Full Name
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            id="lead-phone"
                                            type="tel"
                                            name="phone"
                                            placeholder=" "
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="peer w-full px-4 py-3.5 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-gray-50/30 focus:bg-white text-sm"
                                        />
                                        <label htmlFor="lead-phone" className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-black pointer-events-none peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-xs">
                                            Phone Number
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            id="lead-email"
                                            type="email"
                                            name="email"
                                            placeholder=" "
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="peer w-full px-4 py-3.5 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-gray-50/30 focus:bg-white text-sm"
                                        />
                                        <label htmlFor="lead-email" className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-black pointer-events-none peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-xs">
                                            Email Address
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <select
                                            name="userType"
                                            value={formData.userType}
                                            onChange={handleInputChange}
                                            required
                                            aria-label="Select user type"
                                            className="w-full px-4 py-3.5 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-gray-50/30 focus:bg-white text-sm appearance-none text-gray-700 cursor-pointer"
                                        >
                                            <option value="" disabled>I am a...</option>
                                            {userTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            name="message"
                                            rows={3}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            aria-label="Message"
                                            className="w-full px-4 py-3.5 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-gray-50/30 focus:bg-white text-sm resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-[#000000] hover:bg-[#333333] text-white font-bold rounded-lg transition-all shadow-lg active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </span>
                                        ) : (
                                            <>
                                                Send Inquiry
                                                <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300" />
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[11px] text-gray-400 mt-3 text-center">
                                        By sending this inquiry, you agree to our Terms of Service & Privacy Policy.
                                    </p>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
