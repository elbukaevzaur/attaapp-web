import { NextRequest, NextResponse } from 'next/server'
import {authStorageKey} from "@/src/lib/config";

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const token = req.cookies.get(authStorageKey);

    let userRole = null;
    if (token?.value) {
        try {
            userRole = JSON.parse(token.value).role;
        } catch (e) {
            userRole = null;
        }
    }

    console.log("hello world")

    if (((path.startsWith("/panel") || path === "/") && !token?.value) ||
        ((path.startsWith("/panel") || path === "/") && userRole !== 'ROLE_ADMIN')) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    } else if (path === "/") {
        return NextResponse.redirect(new URL('/panel', req.nextUrl));
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}