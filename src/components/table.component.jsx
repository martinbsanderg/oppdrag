import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid,GridToolbar} from "@mui/x-data-grid";


export default function MyDataGrid({ rows}) {
  const [pageSize, setPageSize] = React.useState(10);

  const columns = [
    {
      field: "nameFirst",
      headerName: "First name",
      width: 110,
      editable: false,
    },
    {
      field: "nameLast",
      headerName: "Last name",
      width: 110,
      editable: false,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 100,
      editable: false,
    },
    {
      field: "street",
      headerName: "Street",
      width: 150,
      editable: false,
    },
    {
      field: "city",
      headerName: "City",
      width: 120,
      editable: false,
    },
    {
      field: "latitude",
      headerName: "Lat",
      width: 100,
      type: "number",
      editable: false,
      hidden: true,
    },
    {
      field: "longitude",
      headerName: "Lon",
      width: 100,
      type: "number",
      editable: false,
      hidden: true,
    },
    {
      field: "ccnumber",
      headerName: "CC-number",
      width: 155,
      type: "number",
      editable: false,
    },
    {
      field: "brand",
      headerName: "CC Brand",
      width: 100,
      editable: false,
    },
    {
      field: "type",
      headerName: "CC Type",
      width: 100,
      
      editable: false,
      hidden: true,
    },
    {
      field: "category",
      headerName: "CC Category",
      width: 100,

      hidden: true,
      editable: false,
    },
    {
      field: "issuer",
      headerName: "CC Issuer",
      width: 180,

      editable: false,
    },
    {
      field: "country",
      headerName: "CC Origin",
      width: 130,

      editable: false,
    },
  ];

  return (
    <Box sx={{ width: "100%", }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        pagination
        autoHeight
        components={{ Toolbar: GridToolbar }}
        
      />
      
    </Box>
  );
}
