import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from 'react';
import { useField, UseFieldConfig } from 'react-final-form';

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
	/** Field name. */
	name: string;
	/** Field label. */
	label: string;
	/** Field type. Doesn't include radio buttons and checkboxes */
	type?: 'text' | 'password' | 'email' | 'number';
	outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
	labelProps?: ComponentPropsWithoutRef<'label'>;
	fieldProps?: UseFieldConfig<string>;
	addOn: string;
}

export const LabeledFieldWithAddOn = forwardRef<
	HTMLInputElement,
	LabeledTextFieldProps
>(({ name, label, outerProps, fieldProps, labelProps, addOn, ...props }, ref) => {
	const { input, meta: { touched, error, submitError, submitting } } = useField(name, {
		parse:
			props.type === 'number'
				? Number as any
				: // Converting `""` to `null` ensures empty values will be set to null in the DB
					(v) => (v === '' ? null : v),
		...fieldProps
	});

	const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError;

	return (
		<div
			className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
			{...outerProps}
		>
			<label
				htmlFor="username"
				className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
				{...labelProps}
			>
				{label}
			</label>
			<div className="mt-1 sm:col-span-2 sm:mt-0">
				<div className="flex max-w-lg rounded-md shadow-sm">
					<span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
						{addOn}
					</span>
					<input
						type="text"
						id="username"
						autoComplete="username"
						className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						{...input}
						disabled={submitting}
						{...props}
						ref={ref}
						data-lpignore="true"
					/>
				</div>

				{touched &&
				normalizedError && (
					<div role="alert" className='text-red-600 text-xs mt-1'>
						{normalizedError}
					</div>
				)}
			</div>
		</div>
	);
});
