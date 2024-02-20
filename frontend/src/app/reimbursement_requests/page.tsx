"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/app/layouts/DefaultLayout";

import AtomPageTitle from "@/components/atoms/PageTitle";
import MoleculeDataTable from "@/components/molecules/Table";
import { columns, ReimbursementRequests } from "./columns";

async function getReimbursementRequests(): Promise<ReimbursementRequests[]> {
  const res = await fetch(
    "http://localhost:5000/api/bank_members/123456789/reimbursement_requests"
  );

  const data = (await res.json()) as ReimbursementRequests[];
  if (!res.ok || !data) {
    throw new Error("Page Not Found 404");
  }
  return data;
}

const RequestsPage: React.FC = () => {
  const [data, setData] = useState<ReimbursementRequests[]>([]);

  const fetchData = async () => {
    try {
      const result = await getReimbursementRequests();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div className="container">
        <AtomPageTitle>Requests</AtomPageTitle>
        <MoleculeDataTable columns={columns} data={data} />
      </div>
    </DefaultLayout>
  );
};

export default RequestsPage;
