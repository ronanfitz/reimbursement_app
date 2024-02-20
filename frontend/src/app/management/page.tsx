"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { useDisclosure } from "@nextui-org/react";

import AtomDropdown from "@/components/atoms/Dropdown";
import AtomPageTitle from "@/components/atoms/PageTitle";
import MoleculeDataTable from "@/components/molecules/Table";
import { columns, ReimbursementRequests } from "./columns";

// Move into separate file
async function getReimbursementRequests(
  selection?: string | undefined
): Promise<ReimbursementRequests[]> {
  const param = selection !== undefined ? "?status=" + selection : "";

  const res = await fetch(
    "http://localhost:5000/api/bank_administrators/1/reimbursement_requests" +
      param
  );

  const data = (await res.json()) as ReimbursementRequests[];
  if (!res.ok || !data) {
    throw new Error("Page Not Found 404");
  }

  return data;
}

const ManagementPage: React.FC = () => {
  const values = [
    {
      id: 1,
      value: "Pending",
    },
    {
      id: 2,
      value: "Approved",
    },
    {
      id: 3,
      value: "Denied",
    },
  ];

  const [data, setData] = useState<ReimbursementRequests[]>([]);
  const [rowSelection, setRowSelection] = useState<
    ReimbursementRequests | undefined
  >();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchData = async () => {
    try {
      const result = await getReimbursementRequests(statusFilter);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const onRowClick = (key: number) => {
    const rowData = data.find((row) => row.id === key);
    setRowSelection(rowData);
    // onOpen();
  };

  const onSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    const selectData = values.find((value) => value.id === index);
    setStatusFilter(selectData?.value);
  };

  return (
    <DefaultLayout>
      <div className="container">
        <AtomPageTitle>Management</AtomPageTitle>
        <AtomDropdown
          containerClass="mt-10"
          className="mb-5 w-52"
          label="Status"
          items={values}
          onSelectionChange={onSelectionChange}
        />
        <MoleculeDataTable
          rowAction={onRowClick}
          columns={columns}
          data={data}
        />
      </div>
    </DefaultLayout>
  );
};

export default ManagementPage;
