"use client";

import { formatAmount } from "@/lib/utils";
import CreateCard from "../CreateCard";
import IncomeAndExpensesChart from "../IncomeAndExpensesChart";
import PendingRequests from "../PendingRequests";
import Projects from "../Projects";
import RecentTransactions from "../RecentTransactions";
import SideStats from "../../global/SideStats";
import Icons from "@/components/icons";
import Stats from "@/components/global/Stats";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const session = useSession();
  console.log(session);

  const stats = [
    {
      title: "Total Income",
      value: formatAmount(0, "NGN"),
      icon: <Icons.IncomeIcon />,
    },
    {
      title: "Total Expenses",
      value: formatAmount(0, "NGN"),
      icon: <Icons.ExpensesIcon />,
    },
    {
      title: "Projects",
      value: 0,
      icon: <Icons.ProjectStatsIcon />,
    },
    {
      title: "Customers",
      value: 0,
      icon: <Icons.CustomersIcon />,
    },
  ];

  const sideStats = [
    {
      title: "Pending Expenses",
      value: formatAmount(0, "NGN"),
    },
    {
      title: "Unpaid Receivables",
      value: formatAmount(0, "NGN"),
    },
  ];

  return (
    <section className="lg:grid lg:grid-cols-3 lg:gap-8 max-lg:space-y-4">
      <div className="col-span-2 space-y-6">
        <Stats stats={stats} />
      </div>
      <div className="col-span-1 space-y-6">
        <SideStats stats={sideStats} />
      </div>
      <div className="col-span-2 space-y-6">
        <IncomeAndExpensesChart />
        <RecentTransactions />
      </div>
      <div className="col-span-1 space-y-6">
        <Projects />
        <CreateCard />
        <PendingRequests />
      </div>
    </section>
  );
};

export default Dashboard;
