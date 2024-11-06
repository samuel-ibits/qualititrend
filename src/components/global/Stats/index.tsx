import { cn } from "@/lib/utils";

type StatsProps = {
	stats: {
		title: string;
		value: string | number;
		icon?: React.ReactNode;
	}[];
	showMobileTitle?: boolean;
	warehouseStats?: boolean;
	leaseStats?: boolean;
	altStats?: boolean;
};

const Stats = ({
	stats,
	showMobileTitle = true,
	warehouseStats = false,
	leaseStats = false,
	altStats = false,
}: StatsProps) => {
	return (
		<div>
			{showMobileTitle && (
				<h1 className='mb-4 font-semibold lg:hidden'>Dashboard</h1>
			)}
			<div
				className={cn(
					"grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8",
					{
						"lg:grid-cols-3": warehouseStats,
					},
					{
						leaseStats: "lg:grid-cols-4",
					}
				)}>
				{stats.map((stat, index) => (
					<div
						key={index}
						className='bg-white px-4 lg:px-5 py-3 lg:py-6 drop-shadow-md rounded-lg'>
						{stat.icon}
						<p className='lg:text-xl font-bold mt-1.5 lg:mt-3'>{stat.value}</p>
						<p
							className={cn("text-sm lg:text-lg mt-1 lg:mt-2", {
								"text-primary lg:text-base":
									altStats || warehouseStats || leaseStats,
							})}>
							{stat.title}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Stats;
