import React, { useRef, useState } from "react";
import Select from "react-select"; // Importar react-select
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

const defaultData = [
    { firstName: "tanner", lastName: "linsley", age: 24, visits: 100, status: "In Relationship", progress: 50, periodo: "OCT-24-1PER" },
    { firstName: "tandy", lastName: "miller", age: 40, visits: 40, status: "Single", progress: 80, periodo: "SEP-24-2PER" },
    { firstName: "joe", lastName: "dirte", age: 45, visits: 20, status: "Complicated", progress: 10, periodo: "SEP-24-1PER" },
  ];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("firstName", {
    id: "firstName",
    header: () => "First Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    id: "lastName",
    header: () => <span>Last Name</span>,
    cell: (info) => <i>{info.getValue()}</i>
  }),
  columnHelper.accessor("age", {
    id: "age",
    header: () => "Age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("visits", {
    id: "visits",
    header: () => <span>Visits</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: () => "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("progress", {
    id: "progress",
    header: () => "Profile Progress",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("periodo", {
    id: "periodo",
    header: () => "Periodo",
    cell: (info) => info.getValue(),
  }),
];

const DataTable = () => {
  const [data] = useState(() => [...defaultData]);
  const [ageRange, setAgeRange] = useState([20, 50]);
  const [globalFilter, setGlobalFilter] = useState(""); // Filtro global
  const [multiSelectOptions, setMultiSelectOptions] = useState([]); // Estado para opciones seleccionadas
  const [columnOrder, setColumnOrder] = useState(
    columns.map((column) => column.id)
  );

  const [movingColumnId, setMovingColumnId] = useState(null);
  const [targetColumnId, setTargetColumnId] = useState(null);

  const [highlightSearchTerm, setHighlightSearchTerm] = useState("");
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(-1);
  const rowRefs = useRef([]);

  // Estado para controlar la visibilidad de las columnas
  const [columnVisibility, setColumnVisibility] = useState(
    columns.reduce((acc, column) => {
      acc[column.id] = true; // Todas las columnas son visibles por defecto
      return acc;
    }, {})
  );

  const reorderColumn = (movingColumnId, targetColumnId) => {
    const newColumnOrder = [...columnOrder];
    newColumnOrder.splice(
      newColumnOrder.indexOf(targetColumnId),
      0,
      newColumnOrder.splice(newColumnOrder.indexOf(movingColumnId), 1)[0]
    );
    return newColumnOrder;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnOrder,
      columnVisibility, // Agregamos el estado de visibilidad aquí
    },
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility, // Controlar el cambio de visibilidad
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  // Nueva lógica de filtrado incluyendo MultiSelect y filtros existentes
  const filteredData = data.filter((row) => {
    const ageFilter = row.age >= ageRange[0] && row.age <= ageRange[1];
    const globalSearchFilter = Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(globalFilter.toLowerCase())
    );
    const multiSelectFilter =
      multiSelectOptions.length === 0 ||
      multiSelectOptions.some((option) => Object.values(row).includes(option.value));
    
    return ageFilter && globalSearchFilter && multiSelectFilter;
  });

  const multiSelectOptionsData = [
    { value: "OCT-24-1PER", label: "OCT-24-1PER" },
    { value: "SEP-24-2PER", label: "SEP-24-2PER" },
    { value: "SEP-24-1PER", label: "SEP-24-1PER" },
  ];

  const handleDragStart = (header) => {
    setMovingColumnId(header.id);
  };

  const handleDragOver = (e, header) => {
    e.preventDefault();
    setTargetColumnId(header.id);
  };

  const handleDrop = () => {
    if (movingColumnId && targetColumnId) {
      const newOrder = reorderColumn(movingColumnId, targetColumnId);
      setColumnOrder(newOrder);
    }
    setMovingColumnId(null);
    setTargetColumnId(null);
  };

  // Maneja el cambio de visibilidad de columnas
  const handleCheckboxChange = (columnId) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId], // Cambia la visibilidad al contrario
    }));
  };

  const handleHighlightSearch = () => {
    const index = data.findIndex((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(highlightSearchTerm.toLowerCase())
      )
    );
  
    setHighlightedRowIndex(index);
    if (index !== -1 && rowRefs.current[index]) {
      rowRefs.current[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="p-2">
      {/* Input para resaltar y enfocar filas sin filtrar */}
      <div className="mb-2">
        <label>
          Resaltar fila:
          <input
            type="text"
            value={highlightSearchTerm}
            onChange={(e) => setHighlightSearchTerm(e.target.value)}
            placeholder="Buscar y resaltar fila..."
          />
          <button onClick={handleHighlightSearch}>Buscar y resaltar</button>
        </label>
      </div>
      {/*  Select multiple options */}
      <div className="mb-2 w-auto flex justify-center">
        <Select
          isMulti
          options={multiSelectOptionsData}
          value={multiSelectOptions}
          onChange={setMultiSelectOptions}
          placeholder="Select multiple options..."
        />
      </div>
      {/*  Input para búsqueda global */}
      <div className="mb-2">
        <label>
          Buscar:
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
          />
        </label>
      </div>
      {/* Range Slider para el rango de edad */}
      <div>
        <label>
          Edad (rango: {ageRange[0]} - {ageRange[1]})
        </label>
        <input
          type="range"
          min="20" // Valor mínimo
          max="50" // Valor máximo
          value={ageRange[1]} // Solo uno de los extremos, pero esto es solo un ejemplo
          onChange={(e) => setAgeRange([ageRange[0], Number(e.target.value)])}
        />
      </div>
      {/* Control de visibilidad de columnas */}
      <div className="mb-2">
        <h4>Seleccionar columnas a mostrar:</h4>
        {columns.map((column) => (
          <label key={column.id}>
            <input
              type="checkbox"
              checked={columnVisibility[column.id]}
              onChange={() => handleCheckboxChange(column.id)}
            />
            {column.header()}
          </label>
        ))}
      </div>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  draggable
                  onDragStart={() => handleDragStart(header)}
                  onDragOver={(e) => handleDragOver(e, header)}
                  onDrop={handleDrop}
                  style={{
                    cursor: "move",
                    backgroundColor:
                      header.id === movingColumnId
                        ? "#e0e0e0"
                        : header.id === targetColumnId
                        ? "#f0f0f0"
                        : "transparent",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex} ref={(el) => (rowRefs.current[rowIndex] = el)}
            style={{ backgroundColor: rowIndex === highlightedRowIndex ? "#f5f5a3" : "transparent" }}>
              {table
                .getRowModel()
                .rows[rowIndex].getVisibleCells()
                .map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};

export default DataTable;
