"use client";


import { Provider as ProviderWrapper } from "react-redux";
import { store } from "..";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { SidebarProvider } from "./SidebarProvider";

type ProviderProps = {
	children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
	return (
		<>
			<SessionProvider>
				<ToastContainer />
				<ProgressBar
					color='#FF5E14'
					height='2px'
					options={{ showSpinner: false }}
					shallowRouting
				/>
				<SidebarProvider>
					<ProviderWrapper store={store}>{children}</ProviderWrapper>
				</SidebarProvider>
			</SessionProvider>
		</>
	);
};

export default Provider;
