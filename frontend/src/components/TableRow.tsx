import type { Cell } from "../types";
import { TableCell } from "./TableCell";

export type TableRowProps = {
  rowIndex: number;
  cells: Cell[];
  onEdit: (id: string, value: string) => void;
  selectedColumn: string | null;
  selectedRow: number | null;
  onRowSelect: (row: number | null) => void;
};

export const TableRow = ({
  rowIndex,
  cells,
  onEdit,
  selectedColumn,
  selectedRow,
  onRowSelect,
}: TableRowProps) => {
  return (
    <tr className={selectedRow === rowIndex ? "bg-blue-100" : ""}>
      <td
        className="border border-gray-500 p-4 cursor-pointer"
        onClick={() => onRowSelect(selectedRow === rowIndex ? null : rowIndex)}
      >
        {rowIndex + 1}
      </td>
      {Array.from({ length: 10 }, (_, colIndex) => {
        const col = String.fromCharCode(65 + colIndex);
        const cell = cells.find((c) => c.row === rowIndex + 1 && c.col === col);
        return (
          <TableCell
            key={colIndex}
            value={cell?.value || ""}
            onEdit={(value) => onEdit(cell?._id || "", value)}
            isHighlighted={selectedColumn === col}
          />
        );
      })}
    </tr>
  );
};
