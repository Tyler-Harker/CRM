import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface DataTableProps<T> {
  headers: TableHeader<T>[];
  rows: TableRow<T>[];
}

export interface TableHeader<T> {
  text: string;
  field: (v: T) => React.ReactNode | string | number;
}

export interface TableRow<T> {
  isSelected?: boolean;
  data: T;
}

export function DataTable<T>({ headers, rows }: DataTableProps<T>) {
  return (
    <TableContainer>
      <Table>
        <TableHead className="bg-slate-800 rounded-t-md">
          <TableRow>
            {headers.map((h, index) => (
              <TableCell
                key={index}
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {h.text}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, index) => (
            <TableRow key={index}>
              {headers.map((h, index) => (
                <TableCell key={index}>{h.field(r.data)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
