import Layout from 'app/core/layouts/Layout';
import { Routes, BlitzPage } from '@blitzjs/next';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/outline';

const Home: BlitzPage = () => {
	return (
		<Layout title="Home">
			<main className='h-full flex items-center'>
				<div className="text-left">
					<h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-8xl">
						<span style={{textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;'}} className="block xl:inline sm:whitespace-nowrap">GIFTING MADE</span>
						<span style={{textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;'}} className="block text-background xl:inline">EASIER</span>
					</h1>
					<p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl md:mx-0">
						It’s hard to find thoughtful presents for everybody in a group. What if you could focus on one
						person insetad? Make more personalized, well-thought, environmental and financial concsious
						presents.
					</p>
					<div className="mt-5 sm:mt-8 sm:flex justify-start">
						<div className='inline'>
							<Link href={Routes.NewGroup()}>
								<a className="flex flex-row w-full whitespace-nowrap h-full items-center justify-center rounded-full border border-transparent bg-action px-6 py-3 text-2xl md:text-xl font-bold hover:bg-indigo-700 md:py-4 md:px-8">
									<div className='flex pt-1'>
										GET STARTED
										<ArrowRightIcon className='ml-3 w-7 h-7 md:w-6 md:h-6'/>
									</div>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Home;
