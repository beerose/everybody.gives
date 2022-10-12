import { UserGroupIcon, XIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useFormState } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';

export const AddMembers = () => {
	const formState = useFormState();
	const {fields} = useFieldArray('members');
	const [ value, setValue ] = useState('');

	return (
		<div className="mx-auto max-w-lg">
			<div className="text-center">
				<UserGroupIcon className="mx-auto h-12 w-12 text-gray-400 stroke-1" />
				<h2 className="mt-1 text-lg font-medium text-gray-900">Add group members</h2>
			</div>
			<div>
				<div className="flex mt-3">
					<label htmlFor="email" className="sr-only">
						Name
					</label>
					<input
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="New member's name"
					/>
					<button
						disabled={value === ''}
						type="button"
						onClick={() => {
							if (value) {
								fields.push({ name: value });
								setValue('');
							}
						}}
						className="ml-4 flex-shrink-0 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-default"
					>
						Add
					</button>
				</div>
				<ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200 mt-4">
					<li className="flex items-center justify-between space-x-3 py-2">
						<div className="flex min-w-0 flex-1 items-center space-x-3">
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-medium text-gray-900">
									{formState.values.createdBy}
								</p>
							</div>
						</div>
					</li>
					{fields.value?.map(({name}, personIdx) => (
						<li key={personIdx} className="flex items-center justify-between space-x-3 py-2">
							<div className="flex min-w-0 flex-1 items-center space-x-3">
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium text-gray-900">
										{name}
									</p>
								</div>
							</div>
							<div className="flex-shrink-0">
								<button
									onClick={() => {
										fields.remove(personIdx);
									}}
									type="button"
									className="inline-flex items-center rounded-full border border-transparent bg-gray-100 py-2 px-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									<XIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
