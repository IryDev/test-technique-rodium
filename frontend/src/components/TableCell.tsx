export type TableCellProps = {
  value: string;
  onEdit: (value: string) => void;
  isHighlighted: boolean;
};

export const TableCell = ({ value, onEdit,  isHighlighted }: TableCellProps) => {
  return (
    <td
      className={`border border-gray-500 p-4 transition-colors duration-200
        ${isHighlighted ? "bg-blue-100" : ""}`}
      contentEditable
      onBlur={(e) => onEdit(e.currentTarget.innerText)}
      suppressContentEditableWarning={true}
    >
      {value}
    </td>
  );
};
