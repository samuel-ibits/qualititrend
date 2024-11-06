"use client";

import ExpenseDetails from "@/components/requests/expense-details";
import { useParams } from "next/navigation";

const ExpenseRequestsDetailsPage = () => {

    const params = useParams();

    return (
        <ExpenseDetails />
    );
};

export default ExpenseRequestsDetailsPage;
