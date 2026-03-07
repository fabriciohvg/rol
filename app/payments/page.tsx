// (server component) is the main entry point for the payments page, it fetches the payments data and renders the <DataTable /> component

import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

async function getPayments(): Promise<Payment[]> {
  // in a real app, you would fetch this data from your database or an API
  return [
    {
      id: "1",
      amount: 100,
      status: "pending",
      email: "user1@example.com",
    },
    { id: "2", amount: 200, status: "processing", email: "user2@example.com" },
    { id: "3", amount: 300, status: "success", email: "user3@example.com" },
    { id: "4", amount: 400, status: "failed", email: "user4@example.com" },
    { id: "5", amount: 500, status: "pending", email: "user5@example.com" },
    { id: "6", amount: 600, status: "processing", email: "user6@example.com" },
    { id: "7", amount: 700, status: "success", email: "user7@example.com" },
    { id: "8", amount: 200, status: "processing", email: "user2@example.com" },
    { id: "9", amount: 300, status: "success", email: "user3@example.com" },
    { id: "10", amount: 400, status: "failed", email: "user4@example.com" },
    { id: "11", amount: 500, status: "pending", email: "user5@example.com" },
    { id: "12", amount: 600, status: "processing", email: "user6@example.com" },
    { id: "13", amount: 700, status: "success", email: "user7@example.com" },
  ];
}

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <DataTable columns={columns} data={payments} />
    </div>
  );
}
