import MyDataGrid from "../../components/table.component";
import assetArray from "../../assets/assetsForTable.json";
import Autocompleter from "../../components/searchbar.component";
import { useMemo, useState } from "react";
import { Box } from "@mui/system";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function TableSection() {
  const [serachOutput, setSearchPut] = useState("");
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  

  const fN = assetArray.map((asset) => {
    return `${asset.nameFirst}`;
  });

  const lN = assetArray.map((asset) => {
    return `${asset.nameLast}`;
  });
  const lNUnique = lN.filter(onlyUnique)
  const fNUnique = fN.filter(onlyUnique)

  const handleSearcOutput = (v) => {
    console.log(v);
  };

  return (
    <>
    <Typography sx={{marginBottom: 2}}variant="h3">Table Information</Typography>
    <Typography  sx={{marginBottom: 3}} > Information from 45784.csv displayed in a MUI table. Further, this data has been enriched with an open source register of credit card BIN numbers and corresponding financial information. The filter section was not finished before the deadline, but filters of table is working correctly. Feel free to hide columns you find irrelevant </Typography>
      <Typography variant="h5">Filter parameters</Typography>
      <Box
        sx={{
          marginBottom: 2,
          marginTop: 2,
          flexDirection: "column",
          display: "inline-flex",
        }}
      >
        <Typography sx={{marginBottom: 1}}>Name filters</Typography>
        
        <Box
          sx={{
            marginBottom: 1,
            display: "inline-flex",
            flexDirection: "row",
            flexWrap: "nowrap",
          }}
        >
          <Autocompleter
            dataArray={fNUnique}
            sendOutput={handleSearcOutput}
            name={"First Name"}
          />
          <Autocompleter
            dataArray={lNUnique}
            sendOutput={handleSearcOutput}
            name={"Last Name"}
          />
        </Box>
        <Typography sx={{ marginTop: 1, marginBottom: 1 }}>
          Age range
        </Typography>
        <Box
          sx={{
            marginBottom: 1,
            width: "60%",
            flexDirection: 'row',
            display:"inline-flex",
            flexWrap: "nowrap",

          }}
        >
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
          <Typography sx={{width:"20%", marginLeft: 2}}>
            {value[0]}-{value[1]}
          </Typography>

        </Box>
        <Button variant="contained">Use filter (not implemented yet)</Button>
      </Box>
      <Typography sx={{marginTop:3, marginBottom:2}}variant="h5">Tabel of data</Typography>
      <MyDataGrid rows={assetArray} />
    </>
  );
}
