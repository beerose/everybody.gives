import Layout from 'app/core/layouts/Layout';
import { Routes, BlitzPage } from '@blitzjs/next';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/solid';

const Home: BlitzPage = () => {
	return (
		<Layout title="Home">
			<main>
				<div className="text-left">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
						<span className="block xl:inline">GIFTING MADE</span>
						<span className="block text-indigo-600 xl:inline">EASIER</span>
					</h1>
					<p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl md:mx-0">
						It’s hard to find thoughtful presents for everybody in a group. What if you could focus on one
						person insetad? Make more personalized, well-thought, environmental and financial concsious
						presents.
					</p>
					<div className="mt-5 sm:mt-8 sm:flex justify-start">
						<div className='inline'>
							<Link href={Routes.NewGroup()}>
								<a className="flex flex-row w-full whitespace-nowrap h-full items-center justify-center rounded-full border border-transparent bg-action px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-8 md:text-lg">
									GET STARTED
									<ArrowRightIcon className='ml-3 w-6 h-6'/>
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
