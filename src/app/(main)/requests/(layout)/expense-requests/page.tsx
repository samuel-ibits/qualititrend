import ExpenseRequests from '@/components/requests/expense';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Requests | Expense",
};

const ExpenseRequestsPage = () => {
    return (
        <ExpenseRequests />
    )
}

export default ExpenseRequestsPage