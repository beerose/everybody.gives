import Layout from 'app/core/layouts/Layout';
import { BlitzPage, Routes } from '@blitzjs/next';
import { CreateGroupForm } from 'app/groups/components/CreateGroupForm';
import { useRouter } from 'next/router';

const NewGroup: BlitzPage = () => {
	const router = useRouter()

	return (
		<Layout title="New Group">
			<main className="h-full flex items-center flex-col justify-center">
				<div>
					<div className="sm:text-center lg:text-left">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
							<span className="block xl:inline">New group</span>
						</h1>
					</div>
					<div className='py-4 lg:py-8'>
						<CreateGroupForm onSuccess={(newGroup) => {
							router.push(Routes.GroupPage({name: newGroup.name}))
						}} />
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default NewGroup;
