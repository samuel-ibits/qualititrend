"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequestsPage() {
	const router = useRouter();

	useEffect(() => {
		router.push("/requests/purchase-order");
	}, []);
	return <main className=''></main>;
}
