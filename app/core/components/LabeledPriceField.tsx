import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef, useState } from 'react';
import { useField, UseFieldConfig } from 'react-final-form';

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
	/** Field name. */
	name: string;
	currencyFieldName: string;
	/** Field label. */
	label: string;
	/** Field type. Doesn't include radio buttons and checkboxes */
	type?: 'text' | 'password' | 'email' | 'number';
	outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
	labelProps?: ComponentPropsWithoutRef<'label'>;
	fieldProps?: UseFieldConfig<string>;
}

export const LabeledPriceField = forwardRef<
	HTMLInputElement,
	LabeledTextFieldProps
>(({ name, label, outerProps, fieldProps, labelProps, currencyFieldName, ...props }, ref) => {
	const { input, meta: { touched, error, submitError, submitting } } = useField(name, {
		parse:
			props.type === 'number'
				? Number as any
				: // Converting `""` to `null` ensures empty values will be set to null in the DB
					(v) => (v === '' ? null : v),
		...fieldProps
	});

	const { input: currencyInput } = useField(currencyFieldName, {...fieldProps, type: "select"});

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
				<div className="relative mt-1 rounded-md shadow-sm">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span className="text-gray-500 sm:text-sm">$</span>
					</div>
					<input
						data-lpignore="true"
						type="text"
						id="username"
						autoComplete="username"
						className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						{...input}
						disabled={submitting}
						{...props}
						ref={ref}
					/>
					<div className="absolute inset-y-0 right-0 flex items-center">
						<label htmlFor="currency" className="sr-only">
							Currency
						</label>
						<select
							{...currencyInput}
							disabled={submitting}
							id="currency"
							className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							>
							<option value="PLN">PLN</option>
							<option value="USD">USD</option>
							<option value="EUR">EUR</option>
						</select>
					</div>
				</div>

				{touched &&
				normalizedError && (
					<div role="alert" className="text-red-600 text-xs mt-1">
						{normalizedError}
					</div>
				)}
			</div>
		</div>
	);
});

export default LabeledPriceField;
