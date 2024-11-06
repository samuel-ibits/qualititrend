"use client";

import Dropdown from "@/components/global/Dropdown";
import Input from "@/components/global/Input";
import Icons from "@/components/icons";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import { SidebarContext } from "@/store/Provider/SidebarProvider";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Header = () => {
	const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
	const methods = useForm({
		mode: "onChange",
		defaultValues: {
			search: "",
		},
	});

	const {
		formState: { errors, isValid },
		watch,
	} = methods;

	const dropdownButtons = [
		{
			label: "Create New Project",
			onClick: () => setShowCreateProjectModal(true),
		},
		{
			label: "Create Expenses",
			onClick: () => { },
		},
		{
			label: "Create Offer Letter",
			onClick: () => { },
		},
		{
			label: "Create Material Transfer",
			onClick: () => { },
		},
		{
			label: "Item Lease",
			onClick: () => { },
		},
		{
			label: "Item Sales",
			onClick: () => { },
		},
	];

	const sidebar_context = useContext(SidebarContext)
	return (
		<>
			<header className='max-lg:container bg-white lg:px-8 py-4 w-full fixed z-50 top-0 right-0 lg:w-[calc(100%-278px)] shadow-sm'>
				<div className='flex items-center justify-between space-x-8 lg:space-x-6'>
					<button className='lg:hidden' onClick={()=>sidebar_context.setIsSidebarOpen(true)}>
						<Icons.MenuIcon />
					</button>
					<FormProvider {...methods}>
						<form className='max-lg:max-w-[300px] lg:!ml-0 flex-1'>
							<div className='lg:w-[300px]'>
								<Input
									name='search'
									placeholder='Search'
									paddingLeft='pl-11'
									type='search'
									left={
										<div className='w-9 pl-3'>
											<Icons.SearchIcon />
										</div>
									}
								/>
							</div>
						</form>
					</FormProvider>

					<div className='flex items-center space-x-4 lg:space-x-6'>
						<Dropdown
							trigger={() => (
								<button className='hidden lg:flex justify-center items-center p-4 rounded border border-primary'>
									<Icons.PlusIcon className='fill-primary size-3.5' />
								</button>
							)}
							className='-left-24 top-14'>
							<div className='w-[240px] bg-white rounded-md'>
								{dropdownButtons.map((button, index) => (
									<button
										key={index}
										onClick={button.onClick}
										className='flex w-full dropdown-item hover:bg-[#FFE2D2] transition-all text-sm items-center justify-between p-3 border-b last:border-b-0 border-[#CBCFD3]'>
										{button.label}
									</button>
								))}
							</div>
						</Dropdown>
						<div className='hidden lg:block w-[1px] h-10 bg-[#CBCFD3]' />
						<button className='flex max-lg:!ml-0 justify-center items-center '>
							<Icons.NotificationsIcon />
						</button>
						<div className='hidden lg:block w-[1px] h-10 bg-[#CBCFD3]' />
						<button className='flex items-center space-x-4'>
							<div className='size-8 rounded-full border border-[#FFE2D2] bg-primary flex items-center justify-center text-xs text-white font-bold'>
								DD
							</div>
							<div className='hidden lg:block text-black-900 text-left'>
								<div className='font-medium'>Daniel Donald</div>
								<div className='text-xs'>Super Admin</div>
							</div>
						</button>
					</div>
				</div>
			</header>
			<CreateProjectModal
				showModal={showCreateProjectModal}
				setShowModal={setShowCreateProjectModal}
			/>
		</>
	);
};

export default Header;
