import NavBar from '../components/NavBar';
import Head from 'next/head';
import '../styles.css';
import { GlobalStateProvider } from '../contextprovider/Context';
import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const [show, setShow] = useState(false);
	const { setTheme } = useTheme();

	const router = useRouter();

	useEffect(() => {
		let timeOut;
		if (router.pathname === '/') {
			timeOut = setTimeout(() => setShow(true), 9000);
		} else if (router.pathname !== '/') {
			setShow(true);
		}
		return () => clearTimeout(timeOut);
	}, []);
	useEffect(() => {
		setTheme('dark');
	}, []);
	return (
		<div className=''>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
				<link
					href='https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<GlobalStateProvider>
				<ThemeProvider attribute='class'>
					{show && <NavBar />}
					<Component {...pageProps} />
					{show && <Footer />}
				</ThemeProvider>
			</GlobalStateProvider>
		</div>
	);
}

export default MyApp;
