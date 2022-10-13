import { UserGroupIcon, XIcon } from '@heroicons/react/outline';
import LabeledTextField from 'app/core/components/LabeledTextField';
import { useFormState } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';

const NewMemberInput = ({idx, onDelete, onChange}: {idx: number, onDelete: () => void, onChange: (value: string) => void}) => {
	return (
		<li className="flex items-center justify-between space-x-3 py-1 w-96">
			<div className='w-full'>
			<LabeledTextField disabled={idx === 0} name={`members[${idx}].name`} onChangeHook={onChange} placeholder="New group member name..."/>
			</div>
			<div className="flex-shrink-0  sm:pt-5">
				<button
					onClick={() => {
						onDelete();
					}}
					type="button"
					className="inline-flex items-center rounded-full border border-transparent bg-gray-100 py-2 px-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<XIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
				</button>
			</div>
		</li>
	)
}

export const AddMembers = () => {
	const {fields} = useFieldArray("members")
	const formState = useFormState();

	return (
		<div className="">
			<div className="text-center">
				<UserGroupIcon className="mx-auto h-12 w-12 text-gray-400 stroke-1" />
				<h2 className="mt-1 text-lg font-medium text-gray-900">Group members</h2>
			</div>
			<div>
				<ul role="list" className="mt-4">
					{formState.values.members?.map((_, personIdx) => (
						<NewMemberInput key={personIdx} idx={personIdx} onDelete={() => fields.remove(personIdx)} onChange={(value) => {
							if (value && personIdx === fields.value.length - 1) {
								fields.push({name: ""})
							}
						}}/>
					))}
				</ul>
			</div>
		</div>
	);
};
