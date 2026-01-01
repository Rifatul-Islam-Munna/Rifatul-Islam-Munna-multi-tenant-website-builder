// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { GetRequestNormal } from './api-hook/api-hook'
import { ShopConfigResponse } from './types/webisteDetails'

export async function proxy(request: NextRequest) {
    const websiteCookie = request.cookies.get('website-data')
    
    // If no cookie exists, fetch and set it
    if (!websiteCookie) {
        try {
            const res = await GetRequestNormal<ShopConfigResponse>("/global-user/get-website-details?ShopName=www")
            
            
            const response = NextResponse.next()
            
            // Set cookie with 7 day expiry
            response.cookies.set('website-data', JSON.stringify(res), {
                maxAge: 60 * 60 * 24 * 2, // 7 days
                path: '/',
                httpOnly: false, // Allow client-side access
                sameSite: 'lax'
            })
            
            return response
        } catch (error) {
            console.error('Failed to fetch website details:', error)
        }
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: '/:path*'
}
