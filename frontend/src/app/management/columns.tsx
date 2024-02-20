export type ReimbursementRequests = {
  id: number;
  bank_account_number: string;
  amount: number;
  transaction_date: Date;
  reason: string;
  status: string;
};

export type UpdateRequests = {
  message: string;
};

export const columns = [
  {
    key: "transaction_date",
    label: "Date",
  },
  {
    key: "reason",
    label: "Description",
  },
  {
    key: "bank_account_number",
    label: "Bank Account",
  },
  {
    key: "amount",
    label: "Amount",
  },
  {
    key: "status",
    label: "Status",
  },
];
