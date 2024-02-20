"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/app/layouts/DefaultLayout";

import AtomPageTitle from "@/components/atoms/PageTitle";
import MoleculeDataTable from "@/components/molecules/Table";
import NewRequestModal from "@/components/organisms/NewRequestModal";
import {
  columns,
  FormData,
  ReimbursementRequests,
  UpdateRequests,
} from "./columns";

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

async function addReimbursementRequests(
  formData: FormData
): Promise<UpdateRequests> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer my-token",
    },
    body: JSON.stringify(formData),
  };

  const res = await fetch(
    "http://localhost:5000/api/bank_members/123456789/reimbursement_requests",
    requestOptions
  );

  const data = (await res.json()) as UpdateRequests;
  if (!res.ok || !data) {
    throw new Error("Page Not Found 404");
  }

  return data;
}

const RequestsPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    reason: "",
    amount: "",
    transaction_date: "",
  });
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

  const onSubmit = () => {
    addReimbursementRequests(formData);
    fetchData();
  };

  return (
    <DefaultLayout>
      <div className="container">
        <AtomPageTitle>Requests</AtomPageTitle>
        <NewRequestModal onSubmit={onSubmit} setFormData={setFormData} />
        <MoleculeDataTable columns={columns} data={data} />
      </div>
    </DefaultLayout>
  );
};

export default RequestsPage;
