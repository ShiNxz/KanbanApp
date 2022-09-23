// Styles
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'

// Redux
import { store } from '@/data/store'
import { Provider } from 'react-redux'

// Libraries
import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'

const App = ({ Component, pageProps }) => {
	return (
		<NextUIProvider>
			<Provider store={store}>
				<Component {...pageProps} />
				<ToastContainer
					rtl
					closeButton
					closeOnClick
					autoClose={3000}
					position='bottom-right'
				/>
			</Provider>
		</NextUIProvider>
	)
}

export default App
