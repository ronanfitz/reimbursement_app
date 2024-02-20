import React from "react";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface Column {
  key: string;
  label: string;
}

interface DataItem {
  id?: number;
  [key: string]: unknown;
}

interface MoleculeDataTableProps<T extends DataItem> {
  columns: Column[];
  data: T[];
  rowAction?: (key: number) => void;
}

function MoleculeDataTable<T extends DataItem>({
  columns,
  data,
  rowAction,
}: MoleculeDataTableProps<T>) {
  return (
    <Table
      aria-label="Rows actions table example with dynamic content"
      onRowAction={(key) => rowAction?.(Number(key))}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default MoleculeDataTable;
