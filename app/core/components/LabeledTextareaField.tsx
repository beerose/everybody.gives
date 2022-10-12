import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from 'react';
import { useField, UseFieldConfig } from 'react-final-form';

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['textarea']> {
	/** Field name. */
	name: string;
	/** Field label. */
	label: string;
	/** Field type. Doesn't include radio buttons and checkboxes */
	type?: 'text' | 'password' | 'email' | 'number';
	outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
	labelProps?: ComponentPropsWithoutRef<'label'>;
	fieldProps?: UseFieldConfig<string>;
}

export const LabeledTextareaField = forwardRef<
	HTMLTextAreaElement,
	LabeledTextFieldProps
>(({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
	const { input, meta: { touched, error, submitError, submitting } } = useField(name, fieldProps);

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
					<textarea
						rows={2}
						className={`block w-full rounded-md ${touched && normalizedError ? 'border-red-500 focus:border-red-500 focus:ring-red-500': "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"} shadow-sm sm:text-sm`}
						{...input}
						disabled={submitting}
						{...props}
						ref={ref}
					/>
				</div>
			</div>
		</div>
	);
});

export default LabeledTextareaField;
