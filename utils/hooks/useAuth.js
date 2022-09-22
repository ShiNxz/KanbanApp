import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { useRouter } from 'next/router'

import cookie from 'js-cookie'
import { toast } from 'react-toastify'

const useAuth = () => {
	const router = useRouter()

	const { data, mutate } = useSWR('/api/auth/auth', fetcher)

	const handleLogout = async () => {
		cookie.remove('token')
		mutate()
		router.push('/login')
		return toast.warning('התנתקת בהצלחה!', {
			autoClose: 3000,
			closeButton: true,
			closeOnClick: true,
		})
	}

	return {
		loggedIn: data?.userId ? true : false,
		user: data,
		mutate,

		handleLogout,
	}
}

export default useAuth
