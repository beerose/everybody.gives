import { ArrowRightIcon } from '@heroicons/react/outline';

interface ActionButtonProps {
	text: string;
  as: "a" | "button"
}
export const ActionButton = ({ text, as }: ActionButtonProps) => {
  const Component = as

	return (
		<Component className="cursor-pointer group flex flex-row w-full whitespace-nowrap h-full items-center justify-center rounded-full border border-black bg-action px-4 font-semibold py-3 text-xl hover:text-background hover:bg-black md:py-4 md:px-6">
			<div className="flex pt-1">
				<ArrowRightIcon
					className="transition transform group-hover:translate-x-[125px] motion-reduce:transition-none motion-reduce:group-hover:transform-none w-6 h-6 stroke-1.5"
				/>
				<span
					className="transition transform group-hover:-translate-x-6 motion-reduce:transition-none motion-reduce:group-hover:transform-none ml-1 group-hover:ml-0"
				>
					{text}
				</span>
			</div>
		</Component>
	);
};
