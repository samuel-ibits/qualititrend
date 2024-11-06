"use client";

import Button from "@/components/global/Button";
import Checkbox from "@/components/global/Checkbox";
import Input from "@/components/global/Input";
import Icons from "@/components/icons";
import { useSigninMutation } from "@/services/auth";
import { SignInRequest } from "@/types/services/auth";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
	const router = useRouter();

	const methods = useForm({
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const {
		formState: { errors, isValid },
		watch,
	} = methods;

	const searchParams = useSearchParams();

	const from = searchParams.get("from");

	const [_signin, { isLoading }] = useSigninMutation();

	const onSubmit: SubmitHandler<SignInRequest> = async (payload) => {
		try {
			const result = await _signin(payload).unwrap();

			const signInResult = await signIn("credentials", {
				redirect: false,
				token: result?.data?.token,
			});

			if (signInResult?.ok) {
				if (from) router.push(decodeURIComponent(from));
				else router.push("/dashboard");
			}
		} catch (err: any) {
			toast.error(err?.data?.message);
		}
	};

	return (
		<div className='w-full bg-white min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-y-5'>
			<main className='col-span-1 order-2 lg:order-1 flex items-center justify-center'>
				<div className='space-y-6 lg:space-y-10 w-full max-lg:container lg:max-w-[332px] lg:px-4'>
					<div className='space-y-1 lg:space-y-2 text-center'>
						<h1 className='text-2xl lg:text-3xl font-semibold'>
							Welcome Back!
						</h1>
						<p className='text-sm lg:text-base'>
							Log in with your details below
						</p>
					</div>

					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)}>
							<div className='space-y-4 lg:space-y-6'>
								<Input
									label='Email Address'
									name='email'
									type='email'
									placeholder='user@example.com'
									rules={["required", "email"]}
									paddingRight='pr-12'
									right={
										<div className='w-9'>
											<Icons.EmailIcon />
										</div>
									}
								/>
								<Input
									label='Password'
									name='password'
									type='password'
									placeholder='user@example.com'
									rules={["required"]}
								/>
							</div>
							<div className='mt-6 flex items-center space-x-4 justify-between'>
								<Checkbox
									name='rememberMe'
									id='rememberMe'
									label='Keep me logged in'
									labelClassName='text-sm'
								/>
								<button className='text-sm text-primary font-bold underline'>
									Forgot Password?
								</button>
							</div>
							<div className='max-w-[240px] my-11 lg:mt-20 mx-auto'>
								<Button
									type='submit'
									disabled={!isValid}
									className='w-full'
									loading={isLoading}>
									Login
								</Button>
							</div>
						</form>
					</FormProvider>
				</div>
			</main>
			<aside className='col-span-2 lg:order-2 py-1.5 lg:py-10 max-lg:container lg:px-16'>
				<div className='relative h-[366px] lg:h-full'>
					<div className='absolute w-full h-full border-[5px] border-primary'></div>
					<div className='relative w-full h-full'>
						<div className="h-[calc(100%-40px)] lg:h-[calc(100%-128px)] w-full flex justify-center items-center absolute top-1/2 transform -translate-y-1/2 -left-5 lg:-left-16 bg-[url('/assets/images/auth-bg.jpg')] bg-cover bg-no-repeat bg-center">
							<Icons.Logo className='w-[99px] h-[74px] lg:w-[300px] lg:h-[225px]' />
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default Login;
