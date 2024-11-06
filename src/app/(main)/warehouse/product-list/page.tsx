"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductListPage() {
	
	const router = useRouter();

	useEffect(() => {
		router.push("/warehouse/product-list/warehouse-inventory");
	}, []);

	return <main className=''></main>;
}