export type TableHeadProps = {
  selectedColumn: string | null;
  onColumnSelect: (col: string | null) => void;
};

export const TableHead = ({
  selectedColumn,
  onColumnSelect,
}: TableHeadProps) => {
  return (
    <thead>
      <tr>
        <th></th>
        {[..."ABCDEFGHIJ"].map((col) => (
          <th
            key={col}
            className={`border border-gray-500 p-4 cursor-pointer transition-colors duration-200
              ${selectedColumn === col ? "bg-blue-100" : "hover:bg-gray-100"}`}
            onClick={() => onColumnSelect(selectedColumn === col ? null : col)}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};
