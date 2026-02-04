/**
 * API Client Helper for frontend components
 * Replaces direct Supabase calls with fetch to API routes
 */

export async function fetchAPI<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`/api${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `API error: ${res.status}`);
    }

    return res.json();
}

/**
 * Upload a file to the server
 */
export async function uploadFile(
    file: File,
    folder: string = 'general',
    oldUrl?: string
): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    if (oldUrl) {
        formData.append('oldUrl', oldUrl);
    }

    const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(error.error || 'Failed to upload file');
    }

    return res.json();
}
