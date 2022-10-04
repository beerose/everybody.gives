import Layout from 'app/core/layouts/Layout';
import { Routes, BlitzPage } from '@blitzjs/next';
import Link from 'next/link';

const Home: BlitzPage = () => {
	return (
		<Layout title="Home">
			<main>
				<div className="sm:text-center lg:text-left">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
						<span className="block xl:inline">everybody.</span>
						<span className="block text-indigo-600 xl:inline">gives</span>
					</h1>
					<p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
						Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit
						sunt amet fugiat veniam occaecat fugiat aliqua.
					</p>
					<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
						<div className="rounded-md shadow">
							<Link href={Routes.NewGroup()}>
								<a className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg">
									Create new group
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
