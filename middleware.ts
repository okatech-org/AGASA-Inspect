import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // Demo mode is always enabled for this application
    // NOTE: process.env.NEXT_PUBLIC_* may not be available in Edge middleware
    const enableDemoMode = true;

    // Static files and Next.js internals bypass
    if (
        pathname.startsWith('/_next') ||
        pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|json|txt|woff2?|css|js)$/)
    ) {
        return NextResponse.next();
    }

    // Session check
    const sessionToken = request.cookies.get('__session')?.value;
    const isDemoToken = !!sessionToken && sessionToken.startsWith("demo-");
    const isSessionToken = !!sessionToken && /^[a-f0-9]{64}$/i.test(sessionToken);
    const isAuthenticated = isSessionToken || (enableDemoMode && isDemoToken);

    if (!enableDemoMode && pathname.startsWith('/demo')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 1. Pages publiques
    if (pathname === '/' || pathname.startsWith('/a-propos') || pathname.startsWith('/fonctionnalites') || pathname.startsWith('/contact') || (enableDemoMode && pathname.startsWith('/demo'))) {
        return NextResponse.next();
    }

    // 2. Auth routes
    if (pathname.startsWith('/login') || pathname.startsWith('/pin')) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    // 3. Protected routes (app)
    if (!isAuthenticated && !(enableDemoMode && pathname.startsWith('/demo'))) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', encodeURI(pathname));
        return NextResponse.redirect(url);
    }

    // 4. Role-based routes (admin / superviseur)
    // NOTE: Fine-grained role checks are done inside components using AuthGuard 
    // because reading JWT/Convex sessions directly in Edge Middleware requires custom decoding
    // that we handle primarily client-side for PWA offline capabilities.

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
