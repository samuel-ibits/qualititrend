"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Tab from "@/components/global/Tab";
import Icons from "@/components/icons";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import ProjectFilterModal from "@/components/projects/ProjectFilterModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ProjectsLayoutProps = {
	children: React.ReactNode;
};

const ProjectsLayout = ({ children }: ProjectsLayoutProps) => {
	const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
	const [showProjectFilterModal, setShowProjectFilterModal] = useState(false);

	const pathname = usePathname();

	const routes = [
		{
			name: "ongoing projetcs",
			path: "/projects/ongoing-projects",
		},
		{
			name: "completed projects",
			path: "/projects/completed-projects",
		},
	];

	const methods = useForm({
		mode: "onChange",
		defaultValues: {
			search: "",
		},
	});

	const {
		formState: { errors },
		watch,
	} = methods;

	return (
		<div>
			<div className='max-lg:pb-5 lg:flex lg:space-x-5 justify-between'>
				<div>
					<h1 className='lg:text-2xl font-semibold'>Projects</h1>
					<div className='text-sm lg:text-sm text-black-500 font-Roboto flex items-center space-x-3 mt-1'>
						<Link href='/dashboard'>Dashboard</Link>
						<span>
							<Icons.CaretIcon className='fill-black-900 transform -rotate-90' />
						</span>
						<Link href='/projects'>Projects</Link>
						<span>
							<Icons.CaretIcon className='fill-black-900 transform -rotate-90' />
						</span>
						<span className='capitalize text-primary'>
							{pathname?.split("/")[2]?.replace("-", " ")}
						</span>
					</div>
					<div className='max-lg:hidden mt-6 font-semibold'>
						Data Summaries of Ongoing and Completed Projects
					</div>
				</div>
				<div className='space-y-4 lg:space-y-6 max-lg:mt-4'>
					<div className='flex items-center space-x-5 lg:space-x-6'>
						<FormProvider {...methods}>
							<form className='lg:!ml-0 flex-1'>
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
						<Button
							onClick={() => setShowProjectFilterModal(true)}
							theme='plain'
							className='border text-black-500 max-lg:px-2.5 h-[42px] border-[#5A5A5A33] rounded'>
							<div className='flex items-center lg:space-x-2.5'>
								<Icons.FilterIcon />
								<div className='max-lg:hidden'>Filter</div>
								<Icons.CaretIcon className='fill-black-500 max-lg:hidden' />
							</div>
						</Button>
					</div>
					<div className='flex justify-between items-center lg:justify-end'>
						<Button
							onClick={() => setShowCreateProjectModal(true)}
							className='w-[200px] max-lg:h-9'>
							<div className='flex items-center space-x-3'>
								<Icons.PlusIcon className='fill-white size-3.5' />
								<div>Create Project</div>
							</div>
						</Button>
						<button className='lg:hidden'>
							<Icons.ProjectEmailIcon />
						</button>
						<button className='lg:hidden'>
							<Icons.ProjectPrinterIcon />
						</button>
						<button className='lg:hidden'>
							<Icons.ProjectDocumentIcon />
						</button>
					</div>
				</div>
			</div>
			<Tab
				routes={routes}
				initialRoute={{
					name: pathname?.split("/")[2]?.replace("-", " "),
					value: `/projects/${pathname?.split("/")[2]}`,
				}}
			/>
			<div>{children}</div>
			<CreateProjectModal
				showModal={showCreateProjectModal}
				setShowModal={setShowCreateProjectModal}
			/>
			<ProjectFilterModal
				showModal={showProjectFilterModal}
				setShowModal={setShowProjectFilterModal}
			/>
		</div>
	);
};

export default ProjectsLayout;
