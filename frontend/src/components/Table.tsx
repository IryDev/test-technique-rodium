import { useEffect, useState } from "react";
import type { Cell } from "../types";
import { TableHead } from "./TableHead";
import { TableRow } from "./TableRow";
import { showToast } from "./Toast";

export const Table = () => {
  const [cells, setCells] = useState<Cell[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const loadCells = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/v1/table");

      if (!response.ok) throw new Error("Failed to load cells");

      const data = await response.json();
      setCells(data);
    } catch {
      showToast({
        title: "Error",
        description: "Failed to load cells",
        type: "error",
      });
    }
  };

  useEffect(() => {
    loadCells();
  }, []);

  const handleEdit = async (id: string, newValue: string) => {
    try {
      const response = await fetch(
        `http://localhost:5500/api/v1/table/cells/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: newValue }),
        }
      );

      if (!response.ok) throw new Error("Failed to update cell");
      
      setCells((prev) =>
        prev.map((cell) =>
          cell._id === id ? { ...cell, value: newValue } : cell
        )
      );

      showToast({
        title: "Success",
        description: "Cell updated successfully",
        type: "success",
      });
    } catch {
      showToast({
        title: "Error",
        description: "Failed to update cell",
        type: "error",
      });
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/v1/table/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to reset table");

      showToast({
        title: "Success",
        description: "Table reset successfully",
        type: "success",
      });

      loadCells();
    } catch {
      showToast({
        title: "Error",
        description: "Failed to reset table",
        type: "error",
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <button
        onClick={() => handleReset()}
        className="border-border border cursor-pointer bg-[#FAFAFA] hover:bg-[#f4f4f4] text-black px-4 py-2 rounded mb-2 duration-300"
      >
        Reset
      </button>
      <table className="border-collapse border border-gray-500">
        <TableHead
          selectedColumn={selectedColumn}
          onColumnSelect={setSelectedColumn}
        />
        <tbody>
          {Array.from({ length: 10 }, (_, rowIndex) => (
            <TableRow
              key={rowIndex}
              rowIndex={rowIndex}
              cells={cells}
              onEdit={handleEdit}
              selectedColumn={selectedColumn}
              selectedRow={selectedRow}
              onRowSelect={setSelectedRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
