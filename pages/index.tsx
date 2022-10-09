import Layout from 'app/core/layouts/Layout';
import { Routes, BlitzPage } from '@blitzjs/next';
import Link from 'next/link';
import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/outline';

const Home: BlitzPage = () => {
	return (
		<Layout title="Home">
			<main className="h-full flex items-center">
				<div className="text-left">
					<h1 className="text-6xl font-extrabold tracking-tight sm:text-8xl flex flex-col">
						<span
							style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
							className="block xl:inline md:whitespace-nowrap"
						>
							GIFTING MADE
						</span>
						<span
							style={{ textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000' }}
							className="block text-background xl:inline"
						>
							EASIER
						</span>
					</h1>
					<p className="mt-3 text-base text-gray-800 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl md:mx-0">
						It’s hard to find thoughtful presents for everybody in a group. What if you could focus on one
						person insetad? Make more personalized, well-thought, environmental and financial concsious
						presents.
					</p>
					<div className="mt-5 sm:mt-8 flex justify-start">
						<div className="inline">
							<Link href={Routes.NewGroup()}>
								<a className="cursor-pointer group flex flex-row w-full whitespace-nowrap h-full items-center justify-center rounded-full border border-black bg-action px-4 font-semibold py-3 text-xl hover:text-background hover:bg-black md:py-4 md:px-6">
									<div className="flex pt-1">
										<ArrowRightIcon className="transition transform group-hover:translate-x-[125px] motion-reduce:transition-none motion-reduce:group-hover:transform-none w-6 h-6 stroke-1.5" />
										<span className="transition transform group-hover:-translate-x-6 motion-reduce:transition-none motion-reduce:group-hover:transform-none ml-1 group-hover:ml-0">
											GET STARTED
										</span>
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
