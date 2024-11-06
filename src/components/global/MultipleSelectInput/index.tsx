import { useEffect, useRef, useState } from "react";
import { ChangeHandler, Controller, useFormContext } from "react-hook-form";
import { useUpdateEffect } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import type { SelectInputProps } from "@/types/global/SelectInputProps";
import { cn, listenForOutsideClicks } from "@/lib/utils";
import ProgressBar from "../ProgressBar";
import Icons from "@/components/icons";
import Select from "react-select"

export const __Select = <T,>({
	options,
	name,
	multiple,
	label,
	value,
	onChange,
	position = "bottom",
	disabled = false,
	required = false,
	optionComponent,
	optionsHeader,
	trigger,
	errors,
	onOptionSelect,
	onDropdownClose = () => { },
	className = "",
	readOnly = false,
	isLoading = false,
	...rest
}: SelectInputProps<T>) => {
	const _value = multiple ? value || [] : value
	const [showDropdown, setShowDropdown] = useState(false);
	const [customSelectValue, setCustomSelectValue] = useState(_value);

	useUpdateEffect(() => {
		setCustomSelectValue(_value);
	}, [_value]);

	const menuRef = useRef(null);

	const [listening, setListening] = useState(false);

	function selectOption(option: typeof options[0]) {
		if (multiple) {
			setCustomSelectValue([...customSelectValue || [], option]);
		}
		else {
			setCustomSelectValue(option);
		}
		onOptionSelect && onOptionSelect(option);
	}

	useEffect(
		listenForOutsideClicks(listening, setListening, menuRef, setShowDropdown)
		, []);

	useUpdateEffect(() => {
		if (!showDropdown) {
			onChange?.(customSelectValue);
			onDropdownClose();
		}
	}, [showDropdown]);

	return (
		<div
			{...rest}
			className={cn(
				"w-full",
				disabled ? "pointer-events-none cursor-not-allowed" : "cursor-pointer"
			)}>
			{label && (
				<label>
					<div
						className={cn(
							"w-full font-medium space-x-1 text-sm h-5 text-tc-main capitalize tracking-tight text-left mb-2",
							disabled
								? "pointer-events-none cursor-not-allowed"
								: "cursor-pointer"
						)}>
						<span>{label}</span>
						{required && <span className='text-status-error-100'>*</span>}
					</div>
				</label>
			)}

			<div
				onClick={() => !readOnly && !disabled && setShowDropdown(!showDropdown)}
				role='button'
				aria-pressed='false'
				aria-label='select'
				ref={menuRef}
				className={cn("relative py-2 px-3", {
					"bg-[#83819729] rounded pointer-events-none cursor-not-allowed":
						disabled,
				})}>
				<div
					role='button'
					tabIndex={0}
					onKeyDown={(e) => {
						e.stopPropagation();
						if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
							!readOnly && !disabled && setShowDropdown(!showDropdown);
						}
					}}
					className={cn(
						"flex absolute z-10 top-0 left-0 h-full right-0 border border-pc-03 bg-transparent focus:border-primary outline-none items-center justify-between w-full py-3 px-4 rounded",
						{
							"bg-pc-02": showDropdown,
							"border-status-error-100 focus:border-status-error-100": errors,
							"border border-[#83819729]": disabled,
						},
						className
					)}>
					{isLoading && (
						<div className='absolute overflow-hidden rounded-b h-1 left-0 right-0 -bottom-1'>
							<ProgressBar value={0.7} indeterminate={true} />
						</div>
					)}
					{trigger(customSelectValue)}
					<div
						className={cn(
							"transition-transform",
							{ "rotate-180": showDropdown },
							"mr-1"
						)}>
						<Icons.CaretIcon className='fill-black-500' />
					</div>
				</div>
				<div className='w-full py-3 px-4'>
					<AnimatePresence>
						{showDropdown && (
							<motion.div
								initial={{ scale: 0.5, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.1 }}
								exit={{ scale: 0.5, opacity: 0 }}
								className={cn(
									"absolute w-full",
									position === "bottom" ? "top-[43px]" : "bottom-[43px]",
									"z-30 left-0 shadow-select-dropdown right-0 border py-0 overflow-hidden bg-white border-pc-03 rounded"
								)}>
								<div
									onClick={(e) => e.stopPropagation()}
									className='absolute w-full top-0'>
									{optionsHeader}
								</div>
								<div
									className={cn(
										"max-h-[170px] w-full sm:max-h-[192px] overflow-y-auto xl:scrollbar scrollbar-w-1 scrollbar-thumb-primary scrollbar-track-pc-02 scrollbar-track-rounded-md scrollbar-thumb-rounded-md",
										{ "mt-[75px]": optionsHeader }
									)}>
									{options &&
										options.map((option, i) => (
											<button
												type='button'
												role={"option"}
												onClick={() => {
													if (option.isUnselectedable) return;
													selectOption(option)
												}}
												key={i}
												className='w-full text-left'>
												{optionComponent(option, customSelectValue)}
											</button>
										))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
			{errors && (
				<span className='text-xs mt-2 text-status-error-100'>*{errors}</span>
			)}
		</div>
	);
};

const SelectInput = (props: any) => {
	const { name, label, required = false, onChange: _onChange = undefined, hide_errors } = props;
	const { register, ...methods } = useFormContext() ?? {};


	if (!register) {
		return (
			<div></div>
		)
	}


	const {
		control,
		formState: { errors },
	} = methods;

	return (
		<Controller
			name={name}
			control={control}
			rules={{
				required: {
					value: required,
					message: `${label || name} is required`,
				},
			}}
			render={({ field: { onChange, value } }) => (
				/* <__Select */
				/* 	onChange={_onChange || onChange} */
				/* 	multiple={props.multiple} */
				/* 	value={value} */
				/* 	{...props} */
				/* 	errors={errors[name]?.message} */
				/* /> */

				<div
					{...props}
					className={cn(
						"w-full",
						props.disabled ? "pointer-events-none cursor-not-allowed" : "cursor-pointer"
					)}>
					{label && (
						<label>
							<div
								className={cn(
									"w-full font-medium space-x-1 text-sm h-5 text-tc-main capitalize tracking-tight text-left mb-2",
									props.disabled
										? "pointer-events-none cursor-not-allowed"
										: "cursor-pointer"
								)}>
								<span>{label}</span>
								{required && <span className='text-status-error-100'>*</span>}
							</div>
						</label>
					)}

					<Select
						isClearable
						isMulti={props.multiple}
						isSearchable
						/* isLoading */
						{...props}
						onChange={(val: any) => {
							if (val?.value) {
								onChange(val?.value)
								return
							}
							onChange(val)
						}}
						defaultValue={value?.value ? value?.value : value}
						options={props.options}
					/>

					{(!hide_errors && errors[name]) && (
						<span className='text-xs mt-2 text-status-error-100'>*{errors[name]?.message?.toString()}</span>
					)}
				</div>
			)}
		/>
	);
};

export default SelectInput;

type _Props = {
	label?: string;
	name: string;
	options: any[];
	is_string_options?: boolean;
	value_key?: string;
	name_key?: string;
	required?: boolean;
	hide_errors?: boolean;
	multiple?: boolean;
	placeholder?: string;
	onChange?: ChangeHandler
}

export function _Select({ placeholder = "Select an option", multiple, required, options, is_string_options, label, name, value_key, name_key, hide_errors, ...rest }: _Props) {
	options = options.map((option) => ({ label: option[name_key || "title"], value: option[value_key || "value"] }))
	return (
		<SelectInput
			label={label}
			name={name}
			required={required}
			multiple={multiple}
			options={options}
			hide_errors={hide_errors}
			{...rest}
		/>
	)

}

