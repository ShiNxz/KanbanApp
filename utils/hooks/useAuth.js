import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { useRouter } from 'next/router'

import cookie from 'js-cookie'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

import { setBoards } from '@/utils/slices/boardsSlice'
import { useDispatch } from 'react-redux'

const useAuth = () => {
	const router = useRouter()
	const dispatch = useDispatch()

	const { data, mutate } = useSWR('/api/auth/auth', fetcher)

	const handleLogout = async () => {
		cookie.remove('token')
		await mutate()
		toast.warning('התנתקת בהצלחה!', {
			autoClose: 3000,
			closeButton: true,
			closeOnClick: true,
		})
		return router.push('/login')
	}

	// make a client state for the boards & cards
	useEffect(() => {
		dispatch(setBoards(data?.boards))
	}, [data?.boards])

	return {
		loggedIn: data?.userId ? true : false,
		user: data,
		mutate,

		handleLogout,
	}
}

export default useAuth
