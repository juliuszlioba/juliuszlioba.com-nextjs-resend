import { EmailTemplate } from '../../components/email-template'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { limiter } from '../config/limiter'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
	const origin = request.headers.get('origin')

	const remaining = await limiter.removeTokens(1)
	//console.log(`remaining: ${remaining}`)

	if (remaining < 0) {
		return new NextResponse(null, {
			status: 429,
			statusText: 'Too meny request',
			headers: {
				'Access-Control-Allow-Origin': origin || '*',
				'Content-Type': 'text/plain',
			},
		})
	}

	return new NextResponse(JSON.stringify({ data: 'ok' }), {
		headers: {
			'Access-Control-Allow-Origin': origin || '*',
			'Content-Type': 'application/json',
		},
	})
}

export async function POST(request: NextRequest) {
	const origin = request.headers.get('origin')

	const remaining = await limiter.removeTokens(1)
	//console.log(`remaining: ${remaining}`)

	if (remaining < 0) {
		return new NextResponse(null, {
			status: 429,
			statusText: 'Too meny request',
			headers: {
				'Access-Control-Allow-Origin': origin || '*',
				'Content-Type': 'text/plain',
			},
		})
	}

	try {
		const req = await request.json()

		if (!req) {
			return NextResponse.json({ error: true, message: 'empty request' })
		}

		// simple check for bots (to pass must have false value)
		if (req.botcheck) {
			return new NextResponse(null, {
				status: 403,
				statusText: 'Forbidden',
				headers: {
					'Access-Control-Allow-Origin': origin || '*',
					'Content-Type': 'text/plain',
				},
			})
		}

		await resend.emails.send({
			from: 'juliuszlioba.com <writeme@juliuszlioba.com>',
			to: 'juliuszlioba@gmail.com',
			subject: req.subject,
			react: EmailTemplate({
				name: req.name,
				email: req.email,
				subject: req.message_subject,
				message: req.message,
			}),
		})

		return new NextResponse(JSON.stringify({ status: 'ok', message: 'sent' }), {
			headers: {
				'Access-Control-Allow-Origin': origin || '*',
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		return new NextResponse(null, {
			status: 500,
			statusText: 'Erro',
			headers: {
				'Access-Control-Allow-Origin': origin || '*',
				'Content-Type': 'text/plain',
			},
		})
	}
}
