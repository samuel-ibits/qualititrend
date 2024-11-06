"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Stats from "@/components/global/Stats";
import Tab from "@/components/global/Tab";
import Icons from "@/components/icons";
import CreateProductModal from "@/components/warehouse/CreateProductModal";
import WarehouseItemsFilterModal from "@/components/warehouse/ItemsFilterModal";
import { formatAmount } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type WarehouseLayoutProps = {
	children: React.ReactNode;
};

const WarehouseLayout = ({ children }: WarehouseLayoutProps) => {
	const pathname = usePathname();
	const [showCreateProductModal, setShowCreateProductModal] = useState(false);
	const [showProductFilterModal, setShowProductFilterModal] = useState(false);

	const routes = [
		{
			name: "warehouse inventory",
			path: "/warehouse/product-list/warehouse-inventory",
			isWider: true
		},
		{
			name: "assets",
			path: "/warehouse/product-list/assets",
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

	const stats = [
		{
			title: "Warehouse Inventory",
			value: "8,000",
		},
		{
			title: "Total Income",
			value: formatAmount(+1500000000, "NGN"),
		},
		{
			title: "Total Expenses",
			value: formatAmount(+500000000, "NGN"),
		},
	];

	return (
		<div>
			<div className='lg:flex lg:space-x-5 justify-between'>
				<div>
					<h1 className='lg:text-2xl font-semibold'>Warehouse</h1>
					<div className='text-sm lg:text-sm text-black-500 font-Roboto flex items-center space-x-3 mt-1'>
						<Link href='/dashboard'>Dashboard</Link>
						<span>
							<Icons.CaretIcon className='fill-black-900 transform -rotate-90' />
						</span>
						<Link href='/warehouse'>Warehouse</Link>
						<span>
							<Icons.CaretIcon className='fill-black-900 transform -rotate-90' />
						</span>
						<span className='capitalize text-primary'>
							{pathname?.split("/")[2]?.replace("-", " ")}
						</span>
					</div>
					<div className='mt-6'>
						<section className='lg:grid lg:grid-cols-1 lg:gap-8 max-lg:space-y-4'>
							<div className='col-span-2 space-y-6'>
								<Stats altStats stats={stats} showMobileTitle={false} />
							</div>
						</section>
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
							theme='plain'
							onClick={() => setShowProductFilterModal(true)}
							className='border text-black-500 max-lg:px-2.5 border-[#5A5A5A33] rounded'>
							<div className='flex items-center lg:space-x-2.5'>
								<Icons.FilterIcon />
								<div className='max-lg:hidden'>Filter</div>
								<Icons.CaretIcon className='fill-black-500 max-lg:hidden' />
							</div>
						</Button>
					</div>
					<div className='flex justify-between items-center lg:space-x-10 lg:justify-end'>
						<Button
							className='w-[200px] max-lg:h-9'
							onClick={() => setShowCreateProductModal(true)}
						>
							<div className='flex items-center space-x-3'>
								<Icons.PlusIcon className='fill-white size-3.5' />
								<div>Add Product</div>
							</div>
						</Button>
						<button>
							<Icons.ProjectDocumentIcon />
						</button>
						<button>
							<Icons.ProjectDocumentIcon />
						</button>
					</div>
				</div>
			</div>
			<div className='my-10'>
				<Tab
					routes={routes}
					initialRoute={{
						name: pathname?.split("/")[2]?.replace("-", " "),
						value: `/warehouse/${pathname?.split("/")[2]}`,
					}}
				/>
			</div>
			<div>{children}</div>
			<CreateProductModal
				showModal={showCreateProductModal}
				setShowModal={setShowCreateProductModal}
			/>
			<WarehouseItemsFilterModal
				showModal={showProductFilterModal}
				setShowModal={setShowProductFilterModal}
			/>
		</div>
	);
};

export default WarehouseLayout;
