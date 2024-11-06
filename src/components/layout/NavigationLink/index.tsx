import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavigationLinkProps = {
	is_bottom_nav?:boolean;
	link: {
		name: string;
		to: string;
		icon: React.ReactNode;
		absoluteRoute?: string;
		children?: {
			name: string;
			to: string;
			absoluteRoute?: string;
		}[];
	};
};

const NavigationLink = ({ link, is_bottom_nav }: NavigationLinkProps) => {
	const [expanded, setExpanded] = useState(false);

	const pathname = usePathname();

	useEffect(() => {
		if (pathname.split("/")[1] !== link.to.split("/")[1]) setExpanded(false);
	}, [pathname]);

	if (link.children)
		return (
			<li className={cn("'w-full'", {'hidden lg:block':is_bottom_nav})}>
				<button
					onClick={() => setExpanded(!expanded)}
					className={cn(
						"transition-all flex items-center justify-between space-x-4 rounded-lg w-full text-white px-4 py-3",
						{
							"bg-white text-primary font-semibold": pathname.includes(
								link.absoluteRoute || link.to + "/"
							),
						}
					)}>
					<div className='flex items-center space-x-6'>
						<div
							className={cn("fill-white transition-all", {
								"fill-primary": pathname.includes(
									link.absoluteRoute || link.to + "/"
								),
							})}>
							{link.icon}
						</div>
						<div className=''>{link.name}</div>
					</div>
					<div
						className={cn("transition-all", {
							"transform rotate-180": expanded,
						})}>
						<Icons.CaretIcon
							className={cn("fill-white", {
								"fill-primary": pathname.includes(
									link.absoluteRoute || link.to + "/"
								),
							})}
						/>
					</div>
				</button>

				<ul
					className={cn(
						"mt-2 transition-max-height max-h-0 overflow-hidden bg-white rounded",
						{
							"max-h-[200px]": expanded,
						}
					)}>
					{link.children.map((child) => {
						return (
							<li key={child.name}>
								<Link
									className={cn(
										"block text-sm transition-all text-black-900 px-8 py-[18.5px]",
										{
											"font-semibold bg-[#FF69001A]": child.to === pathname,
										}
									)}
									href={child.to}>
									{child.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</li>
		);

	return (
		<>
			{is_bottom_nav? (
			<li className='' key={link.name}>
				<Link href={link.to}>
					<div className='flex flex-col px-4 sm:px-14 items-center space-y-1'>
						<div
							className={cn("fill-[#ffffff80] transition-all", {
								"fill-white": pathname.includes(link.absoluteRoute || link.to),
							})}>
							{link.icon}
						</div>
						<div
							className={cn("text-[10px] text-[#ffffff80]", {
								"text-white": pathname.includes(link.absoluteRoute || link.to),
							})}>
							{link.name}
						</div>
					</div>
				</Link>
			</li>

			):(

			<li className=''>
				<Link
					href={link.to}
					className={cn(
						"block transition-all rounded-lg w-full text-white px-4 py-3",
						{
							"bg-white text-primary font-semibold": pathname.includes(
								link.absoluteRoute || link.to
							),
						}
					)}>
					<div className='flex items-center space-x-6'>
						<div
							className={cn("fill-white transition-all", {
								"fill-primary": pathname.includes(
									link.absoluteRoute || link.to
								),
							})}>
							{link.icon}
						</div>
						<div className=''>{link.name}</div>
					</div>
				</Link>
			</li>

			)}
		</>
	);
};

export default NavigationLink;
