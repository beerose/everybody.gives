import { ReactNode, PropsWithoutRef } from 'react';
import { Form as FinalForm, FormProps as FinalFormProps } from 'react-final-form';
import { z } from 'zod';
import { validateZodSchema } from 'blitz';
export { FORM_ERROR } from 'final-form';

export interface FormProps<S extends z.ZodType<any, any>>
	extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
	/** All your form fields */
	children?: ReactNode;
	/** Text to display in the submit button */
	submitText: string;
	schema?: S;
	onSubmit: FinalFormProps<z.infer<S>>['onSubmit'];
	initialValues?: FinalFormProps<z.infer<S>>['initialValues'];
	formName?: string;
	mutators?: FinalFormProps<z.infer<S>>["mutators"],
	formDescription?: string;
}

export function Form<S extends z.ZodType<any, any>>({
	children,
	submitText,
	schema,
	initialValues,
	onSubmit,
	formName,
	formDescription,
	mutators,
	...props
}: FormProps<S>) {
	return (
		<FinalForm
			initialValues={initialValues}
			validate={validateZodSchema(schema)}
			onSubmit={onSubmit}
			mutators={mutators}
			render={({ handleSubmit, submitting, submitError }) => {
				return (
				<form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit} {...props} autoComplete="off">
					<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
						<div className="space-y-6 sm:space-y-5">
							{formName && (
								<div>
									<h3 className="text-lg font-medium leading-6 text-gray-900">{formName}</h3>
									{formDescription && (
										<p className="mt-1 max-w-2xl text-sm text-gray-500">
											This information will be displayed publicly so be careful what you share.
										</p>
									)}
								</div>
							)}
							{/* Form fields supplied as children are rendered here */}
							{children}

							{submitError && (
								<div role="alert" style={{ color: 'red' }}>
									{submitError}
								</div>
							)}

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={submitting}
                    type="submit"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-default"
                  >
                    Save
                  </button>
                </div>
              </div>
						</div>
					</div>
				</form>
			)}}
		/>
	);
}

export default Form;
