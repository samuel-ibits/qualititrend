"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LeasePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/lease-and-sales/sales");
  }, []);
  return <main className=""></main>;
}
