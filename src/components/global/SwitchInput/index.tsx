import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
	label?: string;
	name: string;
	required?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const SwitchInput = ({ label, name, required, ...rest }: Props) => {
	const { register } = useFormContext();
	const [isChecked, setIsChecked] = useState(false);

	// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	//     setIsChecked(e.target.checked);
	// };

	return (
		<div className='flex items-center justify-center w-full'>
			<label htmlFor={name} className='flex items-center cursor-pointer'>
				<div className='relative'>
					<input
						type='checkbox'
						id={name}
						{...rest}
						{...register(name, {
							required,
						})}
						onChange={() => setIsChecked(!isChecked)}
						className='sr-only'
					/>
					<div
						className={cn("block background w-11 h-7 rounded-full", {
							"bg-white border-4 border-black-500": !isChecked,
							"bg-black-500": isChecked,
						})}></div>
					<div
						className={cn(
							"dot absolute left-2 top-2 w-3 h-3 rounded-full transition",
							{
								"bg-white": isChecked,
								"bg-gray-600": !isChecked,
							}
						)}></div>
				</div>
				{label && <div className='ml-3 text-gray-700 font-medium'>{label}</div>}
			</label>
		</div>
	);
};

export default SwitchInput;
