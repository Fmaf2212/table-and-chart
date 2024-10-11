import React, { useRef, useState } from "react";
import Select from "react-select"; // Importar react-select
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Range } from "react-range";
import './style-datatable.css'
import Switch from 'react-switch';

const defaultData = [
  { año: 2023, mes: 1, Multinivel: 2307946, VentaDirect: 0, YachayWasi: 38014, Franquicias: 49574, Digital: 10727, CallCenter: 587555, Personal: 4536, Retail: 371091, Tiendas: 18377, Total: 3387820 },
  { año: 2023, mes: 2, Multinivel: 1945222, VentaDirect: 0, YachayWasi: 128587, Franquicias: 52073, Digital: 11583, CallCenter: 611350, Personal: 3531, Retail: 0, Tiendas: 15354, Total: 2767700 },
  { año: 2023, mes: 3, Multinivel: 1528725, VentaDirect: 645, YachayWasi: 149261, Franquicias: 64276, Digital: 19059, CallCenter: 556860, Personal: 3454, Retail: 0, Tiendas: 17110, Total: 2338940 },
  { año: 2023, mes: 4, Multinivel: 1407532, VentaDirect: 802, YachayWasi: 123559, Franquicias: 49260, Digital: 18039, CallCenter: 514133, Personal: 3854, Retail: 0, Tiendas: 18430, Total: 2206609 },
  { año: 2023, mes: 5, Multinivel: 1348888, VentaDirect: 11308, YachayWasi: 106750, Franquicias: 62663, Digital: 16368, CallCenter: 580069, Personal: 2428, Retail: 0, Tiendas: 14578, Total: 2143052 },
  { año: 2023, mes: 6, Multinivel: 1230220, VentaDirect: 8998, YachayWasi: 170491, Franquicias: 59749, Digital: 9743, CallCenter: 498582, Personal: 3234, Retail: 0, Tiendas: 17951, Total: 1998968 },
  { año: 2023, mes: 7, Multinivel: 1293809, VentaDirect: 6380, YachayWasi: 177292, Franquicias: 52819, Digital: 9936, CallCenter: 465036, Personal: 1662, Retail: 0, Tiendas: 15564, Total: 2037498 },
  { año: 2023, mes: 8, Multinivel: 1265324, VentaDirect: 214, YachayWasi: 249240, Franquicias: 59014, Digital: 11646, CallCenter: 539943, Personal: 5727, Retail: 0, Tiendas: 14185, Total: 2149683 },
  { año: 2023, mes: 9, Multinivel: 1165905, VentaDirect: 80, YachayWasi: 276047, Franquicias: 71213, Digital: 20162, CallCenter: 475977, Personal: 3790, Retail: 0, Tiendas: 11261, Total: 2161435 },
  { año: 2023, mes: 10, Multinivel: 1173935, VentaDirect: 235, YachayWasi: 246263, Franquicias: 67926, Digital: 20737, CallCenter: 452360, Personal: 1846, Retail: 0, Tiendas: 11261, Total: 1916872 },
  { año: 2023, mes: 11, Multinivel: 1320731, VentaDirect: 1534, YachayWasi: 203471, Franquicias: 57348, Digital: 19435, CallCenter: 439834, Personal: 3691, Retail: 0, Tiendas: 11367, Total: 2026138 },
  { año: 2023, mes: 12, Multinivel: 1097172, VentaDirect: 1915, YachayWasi: 195398, Franquicias: 60453, Digital: 21296, CallCenter: 426401, Personal: 4004, Retail: 0, Tiendas: 5315, Total: 1929675 },
  { año: 2024, mes: 1, Multinivel: 1207994, VentaDirect: 2699, YachayWasi: 208435, Franquicias: 15821, Digital: 58368, CallCenter: 296769, Personal: 3669, Retail: 0, Tiendas: 0, Total: 1692376 },
  { año: 2024, mes: 2, Multinivel: 913807, VentaDirect: 2234, YachayWasi: 203464, Franquicias: 0, Digital: 73830, CallCenter: 275779, Personal: 4352, Retail: 0, Tiendas: 9261, Total: 1482737 },
  { año: 2024, mes: 3, Multinivel: 782543, VentaDirect: 0, YachayWasi: 182682, Franquicias: 57759, Digital: 0, CallCenter: 283711, Personal: 3852, Retail: 0, Tiendas: 13834, Total: 1409404 },
  { año: 2024, mes: 4, Multinivel: 901091, VentaDirect: 0, YachayWasi: 209475, Franquicias: 55459, Digital: 0, CallCenter: 644233, Personal: 0, Retail: 0, Tiendas: 0, Total: 1759258 },
  { año: 2024, mes: 5, Multinivel: 746291, VentaDirect: 0, YachayWasi: 163701, Franquicias: 63248, Digital: 0, CallCenter: 336089, Personal: 3560, Retail: 0, Tiendas: 10309, Total: 1027201 },
  { año: 2024, mes: 6, Multinivel: 1175234, VentaDirect: 0, YachayWasi: 133137, Franquicias: 0, Digital: 87997, CallCenter: 296604, Personal: 1901, Retail: 0, Tiendas: 9801, Total: 1617674 },
  { año: 2024, mes: 7, Multinivel: 1032853, VentaDirect: 0, YachayWasi: 105988, Franquicias: 78987, Digital: 0, CallCenter: 255347, Personal: 0, Retail: 0, Tiendas: 9811, Total: 1485986 },
  { año: 2024, mes: 8, Multinivel: 1081437, VentaDirect: 0, YachayWasi: 83392, Franquicias: 66741, Digital: 107737, CallCenter: 308072, Personal: 2773, Retail: 0, Tiendas: 8407, Total: 1531597 }
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("año", {
    id: "año",
    header: () => "Año",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("mes", {
    id: "mes",
    header: () => "Mes",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Multinivel", {
    id: "Multinivel",
    header: () => "Multinivel",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("VentaDirect", {
    id: "VentaDirect",
    header: () => "Venta Directa",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("YachayWasi", {
    id: "YachayWasi",
    header: () => "Yachay Wasi",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Franquicias", {
    id: "Franquicias",
    header: () => "Franquicias",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Digital", {
    id: "Digital",
    header: () => "Digital",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("CallCenter", {
    id: "CallCenter",
    header: () => "Call Center",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Personal", {
    id: "Personal",
    header: () => "Personal",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Retail", {
    id: "Retail",
    header: () => "Retail",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Tiendas", {
    id: "Tiendas",
    header: () => "Tiendas",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Total", {
    id: "Total",
    header: () => "Total",
    cell: (info) => info.getValue(),
  }),
];

const DataTable = () => {
  const [data] = useState(() => [...defaultData]);
  const [mesRange, setMesRange] = useState([1, 12]); // Usando "mes" en lugar de "ageRange"
  const [totalRange, setTotalRange] = useState([1027201, 3387820]);
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

  // Obtén el rango dinámico de los totales
  const totalValues = defaultData.map((row) => row.Total);
  const minTotal = Math.min(...totalValues);
  const maxTotal = Math.max(...totalValues);

  // Obtén el rango dinámico de los meses
  const mesValues = data.map((row) => row.mes);
  const minMes = Math.min(...mesValues);
  const maxMes = Math.max(...mesValues);

  // Estado para controlar la visibilidad de las columnas
  const [columnVisibility, setColumnVisibility] = useState(
    columns.reduce((acc, column) => {
      acc[column.id] = true; // Todas las columnas son visibles por defecto
      return acc;
    }, {})
  );

  //const [isSearchActive, setIsSearchActive] = useState(false);

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

  // Obtener opciones únicas de años para el multiSelectOptions
  const uniqueYears = Array.from(new Set(data.map(row => row.año)))
    .map(year => ({ value: year, label: year.toString() }));

  // Filtrado de datos basado en el rango de meses, rango de totales, búsqueda global y opciones multi-select
  const filteredData = data.filter((row) => {
    const mesFilter = row.mes >= mesRange[0] && row.mes <= mesRange[1]; // Filtrado por meses
    const totalFilter = row.Total >= totalRange[0] && row.Total <= totalRange[1]; // Filtrado por total
    const globalSearchFilter = Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(globalFilter.toLowerCase())
    ); // Filtro de búsqueda global
    const multiSelectFilter =
      multiSelectOptions.length === 0 || multiSelectOptions.some((option) => row.año === option.value); // Filtro multi-select

    return mesFilter && totalFilter && globalSearchFilter && multiSelectFilter; // Retornar solo los datos que coinciden
  });

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
    //setIsSearchActive(true); // Activar búsqueda
    if (index !== -1 && rowRefs.current[index]) {
      rowRefs.current[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="p-2">
      <section className="my-4">
        <div className="flex justify-evenly">
          <div className="flex flex-col items-center">
          {/* Sección: Resaltar fila */}
          <div className="flex flex-col items-start mb-6">
            <label className="mb-2 text-[#1ab69d]">Resaltar fila:</label>
            <div className="flex gap-4 items-center justify-center">
              <input
                type="text"
                value={highlightSearchTerm}
                onChange={(e) => setHighlightSearchTerm(e.target.value)}
                placeholder="Buscar y resaltar fila..."
                className="border border-[#1ab69d] rounded p-2 w-64 focus:outline-none focus:border-[#1ab69d] transition text-[#555]"
              />
              <button
                onClick={handleHighlightSearch}
                className="bg-[#1ab69d] text-white rounded px-4 py-2 hover:bg-[#159A7C] transition"
              >
                Buscar y resaltar
              </button>
            </div>
          </div>

          {/* Sección: Filtrar global */}
          <div className="flex flex-col items-start mb-6">
            <label className="mb-2 text-[#1ab69d]">Filtrar:</label>
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Filtrar..."
              className="border border-[#1ab69d] rounded p-2 w-64 focus:outline-none focus:border-[#1ab69d] transition text-[#555]"
            />
          </div>

          {/* Sección: Selección de años */}
          <div className="flex flex-col items-start mb-6">
            <label className="mb-2 text-[#1ab69d]">Selecciona años:</label>
            <div className="mb-2 w-auto flex justify-center">
              <Select
                isMulti
                options={uniqueYears}
                value={multiSelectOptions}
                onChange={setMultiSelectOptions}
                placeholder="Selecciona años..."
                styles={{
                  control: (provided) => ({
                    ...provided,
                    borderColor: '#1ab69d',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#1ab69d', // Cambiar color en hover
                    },
                    borderRadius: '5px', // Bordes redondeados
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: '#1ab69d', // Color de fondo de los valores seleccionados
                    borderRadius: '5px', // Bordes redondeados
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: '#fff', // Color del texto en los valores seleccionados
                  }),
                  multiValueRemove: (provided) => ({
                    ...provided,
                    color: '#fff', // Color de la "X" para eliminar
                    ':hover': {
                      backgroundColor: '#ff0000', // Color al pasar el mouse
                      color: '#fff', // Color de la "X" al pasar el mouse
                    },
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#999', // Color del texto del placeholder
                  }),
                  menu: (provided) => ({
                    ...provided,
                    borderRadius: '5px',
                    zIndex: 9999, // Asegura que el menú se muestre por encima
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? '#1ab69d' : '#fff', // Color de fondo de la opción seleccionada
                    color: state.isFocused ? '#fff' : '#000', // Color del texto de la opción
                    '&:active': {
                      backgroundColor: '#1ab69d', // Color al seleccionar la opción
                      color: '#fff', // Color del texto al seleccionar
                    },
                  }),
                }}
              />
            </div>
          </div>
          </div>
          
          {/* Sección: Seleccionar columnas a mostrar */}
          <div className="mb-2 w-fit flex flex-col items-start">
            <h4 className="mb-2 text-[#1ab69d]">Seleccionar columnas a mostrar:</h4>
            <div className="h-[210px] w-fit overflow-y-auto border border-gray-300 rounded p-4 flex flex-col gap-4">
              {columns.map((column) => (
                <label key={column.id} className="flex items-center">
                  <Switch
                    onChange={() => handleCheckboxChange(column.id)}
                    checked={columnVisibility[column.id]}
                    onColor="#1ab69d"
                    offColor="#ccc"
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                  <span className="ml-2">{column.header()}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        <div className="flex justify-around items-center">
          {/* Sección: Rango de meses */}
          <div className="mb-12 w-[400px]">
            <label className="mb-2 text-[#1ab69d]">
              Mes (rango: 1 - 12)
            </label>
            <div style={{ position: 'relative', height: '6px', background: '#ccc', borderRadius: '3px', margin: '10px 0' }}>
              <div
                style={{
                  position: 'absolute',
                  left: `${((mesRange[0] - minMes) / (maxMes - minMes)) * 100}%`,
                  right: `${100 - ((mesRange[1] - minMes) / (maxMes - minMes)) * 100}%`,
                  height: '6px',
                  background: '#1ab69d', // Color de la barra
                  borderRadius: '3px',
                  transition: 'all 0.3s ease',
                }}
              />
              <Range
                values={mesRange}
                step={1}
                min={minMes} // Establecer mínimo dinámico
                max={maxMes} // Establecer máximo dinámico
                onChange={setMesRange}
                renderTrack={({ props, children }) => {
                  const { key, ...trackProps } = props; // Separar key
                  return (
                    <div key={key} {...trackProps} style={{ height: '6px', backgroundColor: 'transparent' }}>
                      {children}
                    </div>
                  );
                }}
                renderThumb={({ props, index }) => {
                  const { key, ...thumbProps } = props; // Separar key
                  return (
                    <div
                      key={key}
                      {...thumbProps}
                      style={{
                        height: '20px',
                        width: '20px',
                        backgroundColor: '#1ab69d', // Color verde
                        borderRadius: '50%', // Hacerlo circular
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                        position: 'absolute',
                        top: '0',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <div style={{ position: 'absolute', top: '30px', left: '0', color: '#fff' }}>
                        {mesRange[index]}
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </div>

          {/* Range Slider para Total */}
          <div className="mb-12 w-[400px]">
            <label className="mb-2 text-[#1ab69d]">Total: 1027201 - 3387820</label>
            <div style={{ position: 'relative', height: '6px', background: '#ccc', borderRadius: '3px', margin: '10px 0' }}>
              <div
                style={{
                  position: 'absolute',
                  left: `${((totalRange[0] - minTotal) / (maxTotal - minTotal)) * 100}%`,
                  right: `${100 - ((totalRange[1] - minTotal) / (maxTotal - minTotal)) * 100}%`,
                  height: '6px',
                  background: '#1ab69d',
                  borderRadius: '3px',
                  transition: 'all 0.3s ease'
                }}
              />
              <Range
                step={1000}
                min={minTotal}
                max={maxTotal}
                values={totalRange}
                onChange={(values) => setTotalRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      height: '6px',
                      width: '100%',
                      position: 'absolute',
                      top: '0',
                      zIndex: '1',
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => (
                  <div
                    {...props} 
                    style={{
                      height: '20px',
                      width: '20px',
                      backgroundColor: '#1ab69d',
                      borderRadius: '50%',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                      position: 'absolute',
                      top: '0',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <div style={{ position: 'absolute', top: '30px', left: '-100%', color: '#fff' }}>
                      {totalRange[index]}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </section>

      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  draggable
                  onDragStart={() => handleDragStart(header)}
                  onDragOver={(e) => handleDragOver(e, header)}
                  onDrop={handleDrop}
                  className="cursor-move py-2 px-4 text-left text-sm font-medium text-gray-700 bg-gray-200 border-b border-gray-300"
                  style={{
                    backgroundColor:
                      header.id === movingColumnId
                        ? "#e0e0e0"
                        : header.id === targetColumnId
                          ? "#f0f0f0"
                          : "transparent",
                  }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {filteredData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${rowIndex === highlightedRowIndex ? "bg-[#1ab69d]" : ""}`}
              onClick={() => {
                if (rowIndex === highlightedRowIndex) {
                  setHighlightedRowIndex(null);
                  setHighlightSearchTerm(''); // Limpiar el input cuando se deselecciona la fila
                } else {
                  setHighlightedRowIndex(rowIndex);
                }
              }}
            >
              {Object.keys(row)
                .filter((key) => columnVisibility[key])
                .map((key, cellIndex) => (
                  <td key={cellIndex} className="py-2 px-4 text-sm text-gray-700 border-b border-gray-300">
                    {row[key]}
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
