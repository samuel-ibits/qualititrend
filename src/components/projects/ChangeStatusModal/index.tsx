"use client";

import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import RadioInput from "@/components/global/RadioInput";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type ChangeStatusModalProps = {
	showModal: boolean;
	setShowModal: (value: boolean) => void;
};

const ChangeStatusModal = ({
	showModal,
	setShowModal,
}: ChangeStatusModalProps) => {
	const methods = useForm({
		defaultValues: {
			code: null,
			type: null,
			manager: null,
			status: null,
		},
	});

	const {
		formState: { errors, isValid },
		reset,
	} = methods;

	const onSubmit: SubmitHandler<any> = async (payload) => {
		try {
			setShowModal(false);
		} catch (err) {}
	};

	return (
		<Modal
			title='Change Status'
			show={showModal}
			width='lg:w-[414px]'
			onRequestClose={() => {
				setShowModal(false);
			}}>
			<section className='w-full'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
						<RadioInput required label='Not Started (0%)' name='status' />
						<RadioInput required label='Foundation (10%)' name='status' />
						<RadioInput required label='Building (40%)' name='status' />
						<RadioInput required label='Finishing (80%)' name='status' />
						<RadioInput required label='Completed (100%)' name='status' />
						<div className='flex justify-center py-4'>
							<Button
								type='submit'
								disabled={!isValid}
								className='w-full lg:w-auto'>
								Change Status
							</Button>
						</div>
					</form>
				</FormProvider>
			</section>
		</Modal>
	);
};

export default ChangeStatusModal;
