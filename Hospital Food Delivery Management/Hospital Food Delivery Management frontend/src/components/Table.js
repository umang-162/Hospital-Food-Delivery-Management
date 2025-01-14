import React from "react";

const Table = ({ headers, data, actions }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            {headers.map((header, index) => (
              <th key={index} className="p-4 border-b">
                {header}
              </th>
            ))}
            {actions && <th className="p-4 border-b">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="p-4 border-b">
                  {row[header.toLowerCase()]}
                </td>
              ))}
              {actions && (
                <td className="p-4 border-b">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(row)}
                      className={`px-3 py-1 mx-1 text-sm rounded ${
                        action.type === "edit"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
