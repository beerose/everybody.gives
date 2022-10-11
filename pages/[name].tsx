import { BlitzPage, Routes } from '@blitzjs/next';
import { useQuery } from '@blitzjs/rpc';
import Layout from 'app/core/layouts/Layout';
import getGroup from 'app/groups/queries/getGroup';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GroupPage: BlitzPage = () => {
	const router = useRouter();
	if (!router.query.name || typeof router.query.name !== 'string') {
		return <div>No group found. Go to the <Link href={Routes.Home()}><a className='cursor-pointer bold underline'>home page</a></Link>.</div>;
	}

	const [ group ] = useQuery(getGroup, { groupName: router.query.name });

	if (!group) {
		return <div>No group found. Go to the <Link href={Routes.Home()}><a className='cursor-pointer bold underline'>home page</a></Link>.</div>;
	}

	return (
		<div>
			<div className="sm:text-center lg:text-left">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
					<span className="block xl:inline">{group.eventName}</span>
				</h1>
			</div>
			<div className="mt-5 border-t border-gray-200">
				<dl>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
						<dt className="text-sm font-medium text-gray-500">Group name</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{group.name}</dd>
					</div>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
						<dt className="text-sm font-medium text-gray-500">Created by</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{group.createdBy}</dd>
					</div>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
						<dt className="text-sm font-medium text-gray-500">Description</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{group.description}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};

GroupPage.getLayout = (page) => (
	<Layout title="New Group">
		<main className="h-full flex items-center flex-col justify-center">{page}</main>
	</Layout>
);

export default GroupPage;
