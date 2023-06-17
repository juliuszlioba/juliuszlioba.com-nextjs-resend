import { EmailContent } from './components/email-template'

// live preview of email template content
export default function Page() {
	return (
		<main>
			<EmailContent
				name="Test Name"
				email="test@test.com"
				subject="Test"
				message="Just a test"
			/>
		</main>
	)
}
