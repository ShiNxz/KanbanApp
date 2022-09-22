import AuthLayout from '@/components/Auth/Layout'
import RegisterComponent from '@/components/Auth/Register'

const LoginPage = () => {
	return (
		<AuthLayout title='הרשמה'>
			<RegisterComponent />
		</AuthLayout>
	)
}

export default LoginPage
