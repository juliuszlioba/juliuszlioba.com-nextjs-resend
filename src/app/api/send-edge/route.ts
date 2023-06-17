import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	const origin = request.headers.get('origin')

	return new NextResponse(JSON.stringify({ data: 'ok' }), {
		headers: {
			'Access-Control-Allow-Origin': origin || '*',
			'Content-Type': 'application/json',
		},
	})
}

// export async function POST(request: NextRequest) {
// 	const origin = request.headers.get('origin')

// 	try {
// 		const req = await request.json()

// 		if (!req) {
// 			return NextResponse.json({ error: true, message: 'empty request' })
// 		}

// 		// simple check for bots (to pass must have false value)
// 		if (req.botcheck) {
// 			return new NextResponse(null, {
// 				status: 403,
// 				statusText: 'Forbidden',
// 				headers: {
// 					'Access-Control-Allow-Origin': origin || '*',
// 					'Content-Type': 'text/plain',
// 				},
// 			})
// 		}

// 		const res = await fetch('https://api.resend.com/emails', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
// 			},
// 			body: JSON.stringify({
// 				from: 'juliuszlioba.com <writeme@juliuszlioba.com>',
// 				to: 'juliuszlioba@gmail.com',
// 				subject: req.subject,
// 				html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// 		<html lang="en" dir="ltr">
// 			<body data-id="__react-email-body" style="background-color:#f5f5f5;padding-top:2rem;padding-bottom:2rem;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
// 				<table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;background-color:rgb(255,255,255);color:rgb(30,30,30);margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;padding-left:1.5rem;padding-right:1.5rem;padding-top:1rem;padding-bottom:1rem;border-radius:0.5rem">
// 					<tbody>
// 						<tr style="width:100%">
// 							<td>
// 								<p data-id="react-email-text" style="font-size:1.25rem;line-height:1.75rem;margin:16px 0;font-weight:700">juliuszlioba<span style="color:rgb(163,163,163)">.com</span></p>
// 								<p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji">A new form has been submitted on my website.</p>
// 								<p data-id="react-email-text" style="font-size:14px;line-height:12px;margin:16px 0;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"><span style="font-weight:600">Name:</span> ${req.name}</p>
// 								<p data-id="react-email-text" style="font-size:14px;line-height:12px;margin:16px 0;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"><span style="font-weight:600">Email:</span> ${req.email}</p>
// 								<p data-id="react-email-text" style="font-size:14px;line-height:12px;margin:16px 0;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"><span style="font-weight:600">Message Subject:</span> ${req.message_subject}</p>
// 								<p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"><span style="font-weight:600">Message:</span><br />${req.message}</p>
// 							</td>
// 						</tr>
// 					</tbody>
// 				</table>
// 				<p data-id="react-email-text" style="font-size:0.875rem;line-height:1.25rem;margin:16px 0;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;text-align:center;margin-bottom:2rem;color:rgb(163,163,163)">This e-mail was sent from <a href="https://juliuszlioba.com/" target="_blank" style="color:rgb(163,163,163)">juliuszlioba.com</a></p>
// 			</body>
// 		</html>`,
// 			}),
// 		})

// 		if (res.ok) {
// 			return new NextResponse(
// 				JSON.stringify({ status: 'ok', message: 'sent' }),
// 				{
// 					headers: {
// 						'Access-Control-Allow-Origin': origin || '*',
// 						'Content-Type': 'application/json',
// 					},
// 				}
// 			)
// 		} else {
// 			return new NextResponse(null, {
// 				status: 500,
// 				statusText: 'Error',
// 				headers: {
// 					'Access-Control-Allow-Origin': origin || '*',
// 					'Content-Type': 'text/plain',
// 				},
// 			})
// 		}
// 	} catch (error) {
// 		return new NextResponse(null, {
// 			status: 500,
// 			statusText: 'Error',
// 			headers: {
// 				'Access-Control-Allow-Origin': origin || '*',
// 				'Content-Type': 'text/plain',
// 			},
// 		})
// 	}
// }
