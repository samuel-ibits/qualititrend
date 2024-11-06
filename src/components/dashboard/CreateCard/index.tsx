import Icons from "@/components/icons";

const CreateCard = () => {
	const createActions = [
		{
			name: "Create Purchase Order",
		},
		{
			name: "Create Task",
		},
		{
			name: "Create New Project",
		},
		{
			name: "Approve Requests",
		},
	];
	return (
		<div className='rounded-lg hidden lg:block bg-white drop-shadow-md py-5 px-8'>
			<ul className='space-y-3'>
				{createActions.map((action, index) => {
					return (
						<li key={index}>
							<button className='px-5 py-4 w-full bg-white rounded-lg drop-shadow-md flex items-center space-x-5'>
								<Icons.PlusIcon className='fill-[#5A5A5A] size-3.5' />
								<div className='text-[#2B2B29]'>{action.name}</div>
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default CreateCard;
