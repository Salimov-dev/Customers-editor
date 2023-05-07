import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({
  onSort,
  selectedSort,
  columns,
  data,
  children,
}) => {
  return (
    <table className="table table-hover table-striped">
      {children || (
        <>
          <TableHeader
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
          />
          <TableBody
            columns={columns}
            data={data}
          />
        </>
      )}
    </table>
  );
};

export default Table;
