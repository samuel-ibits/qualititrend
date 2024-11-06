import Login from "@/components/auth/login";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "QualitrendsGS | Login",
};

const LoginPage = () => {
	return (
		<Suspense>
			<Login />
		</Suspense>
	);
};

export default LoginPage;
