import React, { useContext, useEffect, useState } from 'react';
import GlobalStateContext from '../contextprovider/Context';

function Form() {
	const { openSideBar } = useContext(GlobalStateContext);

	const [query, setQuery] = useState({
		name: '',
		email: '',
	});

	// Update inputs value
	const handleParam = () => (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setQuery((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	// Form submit function
	const formSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		Object.entries(query).forEach(([key, value]) => {
			formData.append(key, value);
		});
		fetch('https://getform.io/f/1123de77-c137-4b78-a48e-1d5745223d28', {
			method: 'POST',
			body: formData,
		}).then(() => setQuery({ name: '', email: '', message: '' }));
	};

	return (
		<div className='primary-theme dark:secondary-theme flex h-screen w-screen flex-col items-center'>
			<div
				className={`flex h-full w-4/5 flex-col items-center justify-between ${
					openSideBar ? 'blur-sm filter' : ''
				}`}
			>
				<div className='flex h-full flex-col items-center justify-center'>
					<h1 className='mb-12 text-3xl font-bold text-gray-800 dark:text-gray-100 md:text-4xl lg:text-5xl'>
						Get In Touch
					</h1>

					<form
						onSubmit={formSubmit}
						className='flex w-full flex-col items-center'
					>
						<div>
							<div>
								<input
									className='input-text'
									type='text'
									name='name'
									required
									placeholder='Your name'
									value={query.name}
									onChange={handleParam()}
								/>
							</div>
							<div>
								<input
									className='input-text'
									type='email'
									name='email'
									placeholder='Email'
									value={query.email}
									onChange={handleParam()}
								/>
							</div>
							<div className='mb-3 md:mb-5 lg:mb-8'>
								<textarea
									className='textarea-text'
									name='message'
									placeholder='Your message...'
									required
									value={query.message}
									onChange={handleParam()}
									rows='8'
									cols='43'
								/>
							</div>
							<div className='mb-10 flex w-full items-start md:mb-16 lg:mb-12'>
								<button
									className='rounded-md border-2 border-fuchsia-500 px-2 py-2 font-bold tracking-wider hover:bg-fuchsia-500 dark:border-[#00FFFF] dark:hover:bg-[#00FFFF] dark:hover:text-gray-800 md:px-4 lg:text-lg'
									type='submit'
								>
									Send Message
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Form;
