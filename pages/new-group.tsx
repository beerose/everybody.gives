import Layout from 'app/core/layouts/Layout';
import { Routes, BlitzPage } from '@blitzjs/next';
import Link from 'next/link';

const NewGroup: BlitzPage = () => {
	return (
		<Layout title="New Group">
			<main>
				<div className="sm:text-center lg:text-left">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
						<span className="block xl:inline">New group</span>
					</h1>
				</div>
			</main>
		</Layout>
	);
};

export default NewGroup;
