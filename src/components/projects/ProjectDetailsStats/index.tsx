type ProjectDetailsStatsProps = {
	data: {
		label: string;
		value: string;
	}[];
};

const ProjectDetailsStats = ({ data }: ProjectDetailsStatsProps) => {
	return (
		<ul className='w-full grid grid-cols-3 gap-2 lg:flex lg:space-x-4 lg:items-center'>
			{data?.map((item, index) => {
				return (
					<li key={index}>
						<div className='bg-white w-full lg:w-[131px] drop-shadow-md space-y-2 rounded-lg py-4 px-2'>
							<div className='max-lg:text-sm font-semibold text-black-500'>
								{item.value}
							</div>
							<div className='text-[10px] lg:text-xs text-primary'>
								{item.label}
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default ProjectDetailsStats;
