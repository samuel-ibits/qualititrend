import { Fragment } from "react";

type SideStatsProps = {
	stats: {
		title: string;
		value: string;
	}[];
};

const SideStats = ({ stats }: SideStatsProps) => {
	return (
		<div className='px-2.5 py-3 flex items-center lg:py-6 bg-white drop-shadow-md rounded-lg h-full'>
			<div className='w-full'>
				{stats.map((stat, index) => (
					<Fragment key={index}>
						<div key={index} className='space-x-8 px-4'>
							<span className='lg:text-xl font-bold'>{stat.value}</span>
							<span className='max-lg:text-sm'>{stat.title}</span>
						</div>
						{index < stats.length - 1 && (
							<hr className='border border-b border-[#CBCFD3] my-3' />
						)}
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default SideStats;
