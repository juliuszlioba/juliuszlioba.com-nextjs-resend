import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const allowedOrigins =
	process.env.NODE_ENV === 'production'
		? ['https://juliuszlioba.com']
		: ['http://localhost:3000']

export function middleware(request: NextRequest) {
	const origin = request.headers.get('origin')

	console.log("allowedOrigins", allowedOrigins);

	console.log("origin", origin);

  // DEV
	// if (origin && !allowedOrigins.includes(origin)) {
  //   return new NextResponse(null, {
  //     status: 400,
  //     statusText: "Bad Request",
  //     headers: {
  //       "Content-Type": "text/plain",
  //     },
  //   });
  // }

	// PRODUCTION
	if ((origin && !allowedOrigins.includes(origin)) || !origin) {
		return new NextResponse(null, {
			status: 400,
			statusText: 'Bad Request',
			headers: {
				'Content-Type': 'text/plain',
			},
		})
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/api/:path*',
}
