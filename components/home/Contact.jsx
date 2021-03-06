import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Projects() {
	const [ref, inView] = useInView({ threshold: 0.3 });
	const animation = useAnimation();

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

	useEffect(() => {
		if (inView) {
			animation.start({
				y: 0,
				opacity: 1,
				transition: {
					duration: 1.5,
				},
			});
		}
	}, [inView]);

	return (
		<div
			ref={ref}
			className=' flex h-full w-full flex-col items-center justify-center py-14 lg:py-40'
			id='contact'
		>
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={animation}
				className='flex h-full w-4/5 flex-col items-center justify-center'
			>
				<div className='flex h-full flex-col items-center justify-center'>
					<div className='relative mb-10 flex w-full flex-col items-center lg:mb-20'>
						<h2 className='text-5xl font-bold uppercase text-gray-300 dark:text-gray-800 md:text-6xl lg:text-9xl'>
							contact
						</h2>
						<h3 className='absolute top-4 text-xl font-bold tracking-wide text-fuchsia-600 dark:text-[#00ffff] md:top-5 md:text-2xl lg:top-16 lg:mb-16 lg:text-3xl'>
							Get in touch
						</h3>
					</div>

					<p className='mb-8 font-medium text-gray-800 dark:text-gray-300 md:mb-12 md:text-lg lg:mb-12 lg:px-72 lg:text-lg'>
						Do you think that I would make a great addition to your team? I
						think so too. I am a young and passionate learner, ready to succeed
						in the tech world. I have a background that has built up my
						collabrative and communication skills. I'm dedicated to learning the
						ins and outs of your tech stack to keep up with high standard your
						users are used to.
					</p>

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
									required
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
									className='rounded-md border border-gray-600 px-3 py-1 text-sm font-bold tracking-wider text-gray-700 hover:bg-fuchsia-500 dark:border-[#00FFFF] dark:text-gray-300 dark:hover:bg-[#00FFFF] dark:hover:text-gray-700 md:px-6 md:py-2 md:text-base'
									type='submit'
								>
									Send
								</button>
							</div>
						</div>
					</form>
				</div>
			</motion.div>
		</div>
	);
}

export default Projects;
