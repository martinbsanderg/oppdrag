import MyDataGrid from "../../components/table.component";
import assetArray from "../../assets/assetArray.json";
import Autocompleter from "../../components/searchbar.component";
import { useMemo, useState } from "react";

export default function TableSection() {
  const [serachOutput, setSearchPut] = useState("");

  const searchArray = useMemo(() =>{
    return(
      assetArray.map((asset) => {
      return `${asset.nameFirst} ${asset.nameLast} ${asset.ccnumber} (id: ${asset.id})`;
    }))
  });

  const handleSearcOutput = (v) => {
    console.log(v);
  };

  const columns = [
    {
      field: "nameFirst",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "nameLast",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "street",
      headerName: "Street",
      width: 150,
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      editable: true,
    },
    {
      field: "latitude",
      headerName: "Lat",
      width: 150,
      type: "number",
      editable: true,
    },
    {
      field: "longitude",
      headerName: "Lon",
      width: 150,
      type: "number",
      editable: true,
    },
    {
      field: "ccnumber",
      headerName: "CC-number",
      width: 150,
      type: "number",
      editable: true,
    },
  ];


  return (
    <>
      <Autocompleter dataArray={searchArray} sendOutput={handleSearcOutput} />
      <MyDataGrid rows={assetArray} columns={columns} />
    </>
  );
}
