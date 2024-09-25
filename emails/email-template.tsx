import { Html } from '@react-email/html'
import { Tailwind } from '@react-email/tailwind'
import { Container } from '@react-email/container'
import { Text } from '@react-email/text'
import { Body } from '@react-email/body'

interface EmailTemplateProps {
	name: string
	email: string
	subject: string
	message: string
}

const main = {
	backgroundColor: '#f5f5f5',
	paddingTop: '2rem',
	paddingBottom: '2rem',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

export default function EmailTemplate({
	name,
	email,
	subject,
	message,
}: EmailTemplateProps) {
	return (
		<Html lang="en" dir="ltr">
			<Body style={main}>
				<Tailwind>
					<Container className="bg-white text-[#1e1e1e] mx-auto font-sans px-6 py-4 rounded-lg">
						<Text className="leading-[24px] text-xl font-bold">
							juliuszlioba<span className="text-[#a3a3a3]">.com</span>
						</Text>
						<Text className="leading-normal font-sans">
							A new form has been submitted on my website.
						</Text>

						<Text className="leading-[12px] font-sans">
							<span className="font-semibold">Name:</span> {name}
						</Text>

						<Text className="leading-[12px] font-sans">
							<span className="font-semibold">Email:</span> {email}
						</Text>

						<Text className="leading-[12px] font-sans">
							<span className="font-semibold">Message Subject:</span> {subject}
						</Text>

						<Text className="leading-[24px] font-sans">
							<span className="font-semibold">Message:</span>
							<br />
							{message}
						</Text>
					</Container>

					<Text className="leading-[24px] font-sans text-sm text-center mb-8 text-[#a3a3a3]">
						This e-mail was sent from{' '}
						<a
							href="https://juliuszlioba.com/"
							target="_blank"
							className="text-[#a3a3a3]"
						>
							juliuszlioba.com
						</a>
					</Text>
				</Tailwind>
			</Body>
		</Html>
	)
}

