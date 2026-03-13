import { NextResponse } from 'next/server';

interface RateLimitTracker {
  count: number;
  lastReset: number;
}

const rateLimits = new Map<string, RateLimitTracker>();

// Default settings: Max 30 requests per IP per 1 minute window
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 30;

export async function rateLimit(request: Request, limit = MAX_REQUESTS, windowMs = WINDOW_MS): Promise<NextResponse | null> {
  // Extract client IP (Vercel uses x-forwarded-for headers)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown-ip';

  const now = Date.now();
  const tracker = rateLimits.get(ip) || { count: 0, lastReset: now };

  // Reset window if it has expired
  if (now - tracker.lastReset > windowMs) {
    tracker.count = 0;
    tracker.lastReset = now;
  }

  tracker.count++;
  rateLimits.set(ip, tracker);

  if (tracker.count > limit) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': Math.ceil((windowMs - (now - tracker.lastReset)) / 1000).toString(),
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': '0',
      },
    });
  }

  // Calculate remaining
  const remaining = Math.max(0, limit - tracker.count);

  // Return null if request should proceed. We'll add remaining headers directly in the route where possible,
  return null;
}
