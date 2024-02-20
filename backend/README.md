#### Overview

This repository contains the backend implementation for a banking application. It provides REST API endpoints to fulfill the functional requirements specified for bank members and administrators.

#### Installation

1. Clone this repository to your local machine.
2. Install dependencies using `pip install -r requirements.txt`.
3. Set up your database configuration in the `.env` file.
4. Run the Flask application using `flask run`.

#### Implemented Endpoints

1. **GET /api/bank_members/{member_id}/reimbursement_requests**: Retrieves reimbursement requests submitted by a bank member.
2. **POST /api/bank_members/{member_id}/reimbursement_requests**: Submits a new reimbursement request by a bank member.
3. **GET /api/bank_administrators/{admin_id}/reimbursement_requests**: Retrieves reimbursement requests for approval by a bank administrator.
4. **PUT /api/bank_administrators/{admin_id}/reimbursement_requests/{request_id}**: Approves or denies a reimbursement request by a bank administrator.

#### Testing

1. Run unit tests using `pytest`.
2. Functional tests for endpoints are included in the `tests/` directory.

#### Additional Notes

- The database models are defined in the `models.py` file.
- Ensure to set appropriate environment variables for database connection.
