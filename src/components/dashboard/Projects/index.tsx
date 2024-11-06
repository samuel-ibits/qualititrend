import { cn } from "@/lib/utils";

const Projects = () => {
	const projectStats = [
		{
			title: "Not Started",
			desc: "Total projects not started",
			count: 0,
			style: "bg-[#5a5a5a33] text-[#5A5A5A] border border-[#5A5A5A]",
		},
		{
			title: "Ongoing",
			desc: "Total projects in progress",
			count: 0,
			style: "bg-[#17a2b84d] text-[#17A2B8] border border-[#17A2B8]",
		},
		{
			title: "Paused",
			desc: "Total projects on hold",
			count: 0,
			style: "bg-[#ffa50033] text-[#FFA500] border border-[#FFA500]",
		},
		{
			title: "Completed",
			desc: "Total completed projects",
			count: 0,
			style: "bg-[#00800033] text-[#008000] border border-[#008000]",
		},
	];

	return (
		<div className='px-2.5 py-6 bg-white drop-shadow-md rounded-lg'>
			<h2 className='lg:text-xl font-bold px-4'>Projects</h2>
			<hr className='h-[1.5px] bg-[#CBCFD3] mt-3 mb-1' />
			<ul>
				{projectStats.map((project, index) => (
					<li
						key={index}
						className='space-x-5 flex items-center px-4 py-2 border-b border-[#CBCFD3]'>
						<div
							className={cn(
								"px-2.5 py-0.5 rounded text-xl font-bold",
								project.style
							)}>
							{project.count}
						</div>
						<div className='max-lg:text-xs text-[#2B2B29] '>
							<div className='font-semibold'>{project.title}</div>
							<div>{project.desc}</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Projects;
