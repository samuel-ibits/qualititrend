import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SelectInput from "../SelectInput";
import { TabProps } from "@/types/global/TabProps";

const Tab = ({ routes, initialRoute }: TabProps) => {
	const [canScrollRight, setCanScrollRight] = useState(true);
	const [canScrollLeft, setCanScrollLeft] = useState(false);

	const router = useRouter();
	const pathname = usePathname();

	const methods = useForm({
		mode: "onChange",
		defaultValues: {
			route: "" as unknown as {
				name: string;
				value: string;
			},
		},
	});

	const {
		formState: { errors },
		watch,
		setValue,
	} = methods;

	const route = watch("route") as unknown as {
		name: string;
		value: string;
	};

	useEffect(() => {
		setValue("route", initialRoute);
	}, []);

	useEffect(() => {
		if (route) {
			router.push(route.value);
		}
	}, [route]);

	const scrollableElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleResize = () => {
			setCanScrollLeft(scrollableElement?.current?.scrollLeft! > 0);
			setCanScrollRight(
				scrollableElement?.current?.scrollLeft! <
					scrollableElement?.current?.scrollWidth! -
						scrollableElement?.current?.clientWidth!
			);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<div className='relative hidden lg:block'>
				<div
					ref={scrollableElement}
					className='max-w-full scrollbar-none mt-7 mb-10 overflow-x-auto border-b border-[#CBCFD3]'>
					<ul className='flex items-center space-x-4 py-2'>
						{routes.map((route, index) => {
							return (
								<li key={index} className='relative max-lg:w-1/2'>
									<Link
										className={cn(
											"capitalize max-lg:text-sm whitespace-nowrap transition-all text-black-500 lg:w-[200px] flex justify-center",
											{
												"font-semibold text-black-900": pathname.includes(
													route.path
												),
												"lg:w-[220px]": route.isWider,
											}
										)}
										href={route.path}>
										{route.name}
									</Link>

									<div
										className={cn(
											"absolute left-1/2 transition-width transform -translate-x-1/2 -bottom-2 h-[3px] w-0 bg-primary",
											{
												"opacity-0": !pathname.includes(route.path),
												"w-2/4": pathname.includes(route.path),
											}
										)}
									/>
								</li>
							);
						})}
						<li className='w-80 h-full bg-red-600'></li>
					</ul>
					<div
						className={cn(
							"absolute h-[40px] w-12 flex items-center justify-center right-0 top-1/2 transform -translate-y-1/2 bg-white",
							{
								"pointer-events-none opacity-0": !canScrollRight,
							}
						)}>
						<button
							onClick={() => {
								scrollableElement.current?.scrollBy({
									left: 200,
									behavior: "smooth",
								});
								setCanScrollLeft(scrollableElement?.current?.scrollLeft! > 0);
								setCanScrollRight(
									scrollableElement?.current?.scrollLeft! <
										scrollableElement?.current?.scrollWidth! -
											scrollableElement?.current?.clientWidth! -
											200
								);
							}}
							className='bg-white/30 bg-white rounded-full p-1 transition-all hover:bg-primary/45'>
							<Icons.CaretIcon className='fill-black-900 transform -rotate-90' />
						</button>
					</div>
					<div
						className={cn(
							"absolute h-[40px] w-12 flex items-center justify-center left-0 top-1/2 transform -translate-y-1/2 bg-white",
							{
								"pointer-events-none opacity-0": !canScrollLeft,
							}
						)}>
						<button
							onClick={() => {
								scrollableElement.current?.scrollBy({
									left: -200,
									behavior: "smooth",
								});
								setCanScrollLeft(scrollableElement?.current?.scrollLeft! > 0);
								setCanScrollRight(
									scrollableElement?.current?.scrollLeft! <
										scrollableElement?.current?.scrollWidth! -
											scrollableElement?.current?.clientWidth! -
											200
								);
							}}
							className='bg-white/30 bg-white rounded-full p-1 transition-all hover:bg-primary/45'>
							<Icons.CaretIcon className='fill-black-900 transform rotate-90' />
						</button>
					</div>
				</div>
			</div>
			<div className='mb-6 mt-2 lg:hidden'>
				<FormProvider {...methods}>
					<SelectInput
						name='route'
						options={routes.map((route) => {
							return {
								name: route.name,
								value: route.path,
							};
						})}
						optionComponent={(option, selectedOption) => {
							return (
								<div
									className={cn(
										"py-2 w-full border-b px-4 flex items-center space-x-5 text-tc-main hover:bg-[#FF69001A]",
										{
											"bg-[#FF69001A]": option?.value === selectedOption?.value,
										}
									)}>
									<div className='w-full text-sm flex items-center space-x-2'>
										<div className='capitalize'>{option?.name}</div>
									</div>

									{option?.name === selectedOption?.name && (
										<div>
											<Icons.SelectedIcon />
										</div>
									)}
								</div>
							);
						}}
						trigger={(selected) => {
							return (
								<div className='flex h-min bg-transparent items-center space-x-1'>
									{selected ? (
										<div className='text-tc-main flex space-x-2 items-center text-sm'>
											<span className='capitalize'>{selected.name}</span>
										</div>
									) : (
										<div className='text-sm mt-[2px] text-tc-secondary'>
											Select Section
										</div>
									)}
								</div>
							);
						}}
					/>
				</FormProvider>
			</div>
		</>
	);
};

export default Tab;
