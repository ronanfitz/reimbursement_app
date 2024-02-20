import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import nock from "nock";

import RequestsPage from "../app/reimbursement_requests/page";

beforeEach(() => {
  nock("http://localhost:5000")
    .get("/api/bank_members/123456789/reimbursement_requests")
    .reply(200, [
      {
        id: 1,
        reason: "Test Reason 1",
        amount: 100,
        transaction_date: "2022-02-12",
      },
      {
        id: 2,
        reason: "Test Reason 2",
        amount: 200,
        transaction_date: "2022-02-13",
      },
    ]);

  nock("http://localhost:5000")
    .post("/api/bank_members/123456789/reimbursement_requests")
    .reply(200, { message: "Reimbursement request submitted successfully" });
});

test("renders requests page with table", async () => {
  render(<RequestsPage />);

  // Wait for data to be loaded
  await waitFor(() => screen.getByText("Test Reason 1"));

  // Check if the table is rendered with correct data
  expect(screen.getByText("Test Reason 1")).toBeInTheDocument();
  expect(screen.getByText("$100.00")).toBeInTheDocument();
  expect(screen.getByText("2022-02-12")).toBeInTheDocument();
});

test("submits new reimbursement request", async () => {
  render(<RequestsPage />);

  // Wait for data to be loaded
  await waitFor(() => screen.getByText("Test Reason 1"));

  // Fill and submit the new request form
  fireEvent.change(screen.getByLabelText("Reason"), {
    target: { value: "New Test Reason" },
  });
  fireEvent.change(screen.getByLabelText("Amount"), {
    target: { value: "300.00" },
  });
  fireEvent.change(screen.getByLabelText("Transaction Date"), {
    target: { value: "2022-02-14" },
  });
  fireEvent.click(screen.getByText("Save"));

  // Wait for the submission to complete
  await waitFor(() =>
    screen.getByText("Reimbursement request submitted successfully")
  );

  // Verify that the success message is displayed
  expect(
    screen.getByText("Reimbursement request submitted successfully")
  ).toBeInTheDocument();
});
