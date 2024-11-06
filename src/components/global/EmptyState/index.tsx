type EmptyStateProps = {
	icon?: JSX.Element;
	description: string;
};

const EmptyState = ({ icon, description }: EmptyStateProps) => {
	return (
		<section className='w-full h-full flex justify-center items-center'>
			<div className='flex flex-col items-center space-y-[10px]'>
				{icon}
				<p className='text-sm font-medium text-center text-tc-main'>
					{description}
				</p>
			</div>
		</section>
	);
};

export default EmptyState;
