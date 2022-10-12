import React, { PropsWithoutRef } from 'react';
import * as z from 'zod';
import { Form, FormProps as FinalFormProps } from 'react-final-form';
import { validateZodSchema } from 'blitz';

export interface MultistepFormProps<S extends z.ZodType<any, any>>
	extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit' | 'children'> {
	/** Text to display in the submit button */
	submitText: string;
	onSubmit: FinalFormProps<z.infer<S>>['onSubmit'];
	initialValues?: FinalFormProps<z.infer<S>>['initialValues'];
	formName?: string;
	mutators?: FinalFormProps<z.infer<S>>['mutators'];
	formDescription?: string;
	children: MultistepPage<any>[];
}

export type MultistepPage<S extends z.ZodType<any, any>> = React.ReactElement<{ schema: S }>;

export const MultistepForm = <S extends z.ZodType<any, any>>(props: MultistepFormProps<S>) => {
	const [ page, setPage ] = React.useState(0);
	const [ initialValues, setInitialValues ] = React.useState(props.initialValues);

	const next = (values: Parameters<FinalFormProps<z.infer<S>>['onSubmit']>[0]) => {
		setPage((s) => Math.max(s + 1, props.children.length - 1));
		setInitialValues(values);
	};

	const previous = () => setPage((p) => Math.max(p - 1, 0));

	const validate = (values: any) => {
		const activePage = React.Children.toArray(props.children)[page] as React.ReactElement;
		if (activePage.props.schema) {
			return validateZodSchema(activePage.props.schema)(values);
		}

		return {};
	};

	const handleSubmit = (values: any, rest: any) => {
		const { children, onSubmit } = props;
		const isLastPage = page === React.Children.count(children) - 1;
		if (isLastPage) {
			return onSubmit(values, rest);
		} else {
			next(values);
		}
	};

	const activePage = React.Children.toArray(props.children)[page];
	const isLastPage = page === React.Children.count(props.children) - 1;

	return (
		<Form
			initialValues={initialValues}
			validate={validate}
			onSubmit={handleSubmit}
			mutators={props.mutators}
			render={({ handleSubmit, submitting, submitError }) => (
				<form
					className="space-y-4 divide-y divide-gray-200"
					{...props}
					onSubmit={handleSubmit}
					autoComplete="off"
				>
					<div className="space-y-4 divide-y divide-gray-200 sm:space-y-5">
						<div className="space-y-4">
							{activePage}

							{submitError && (
								<div role="alert" style={{ color: 'red' }}>
									{submitError}
								</div>
							)}

							<div className="pt-5">
								<div className="flex justify-end">
									{page > 0 && (
										<button
											type="button"
											className="bg-white rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											onClick={previous}
										>
											« Previous
										</button>
									)}
									{!isLastPage && (
										<button
											className="bg-white rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											type="submit"
										>
											Next »
										</button>
									)}
									{isLastPage && (
										<button
											disabled={submitting}
											type="submit"
											className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-default"
										>
											Save
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</form>
			)}
		/>
	);
};

const MultistepFormPage = <T extends z.ZodType<any, any>>(props: { schema?: T; children: any }) => props.children;

MultistepForm.Page = MultistepFormPage;
