import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "QualitrendsGS | %s",
		default: "QualitrendsGS",
	},
	description: "At Qualitrends we build your visions.",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://qualitrendsng.com",
		title: "QualitrendsGS",
		description: "At Qualitrends we build your visions.",
		images: [
			{
				url: "https://qualitrendsng.com/wp-content/uploads/2023/08/1-1.png",
				width: 1200,
				height: 630,
				alt: "QualitrendsGS",
			},
		],
		siteName: "QualitrendsGS",
	},
};

type LayoutProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<section className='flex h-screen'>
			<Navigation />
			<div className='w-full lg:ml-[278px] lg:w-[calc(100%-278px)]'>
				<Header />
				<main className='bg-white max-lg:container lg:w-full min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-80px)] py-4 lg:p-7 mt-[72px] lg:mt-20 max-lg:pb-20'>
					{children}
				</main>
			</div>
		</section>
	);
};

export default Layout;
