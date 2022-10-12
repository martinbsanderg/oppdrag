import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import assetArray from "../assets/assetArray.json";
import { FixedSizeList } from "react-window";

import { Box } from "@mui/material";

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={index} />
      </ListItemButton>
    </ListItem>
  );
}

export default function MapSidebar({ setMarker, boxHeight }) {
  const [aboveThree, setAboveThree] = useState(false);
  const [value, setValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  const searchArray = assetArray.map((asset) => {
    return [
      `${asset.nameFirst} ${asset.nameLast} ${asset.ccnumber}`,
      { id: asset.id },
    ];
  });

  const handleChange = (e) => {
    setValue(e.target.value);

    setFilteredArray(() =>
      searchArray.filter((asset) =>
        asset[0].toLowerCase().includes(value.toLocaleLowerCase())
      )
    );
    if (e.target.value === "") {
      setFilteredArray([]);
    }
  };

  const handleClick =(event,id)=>{
    setMarker(event, id)
  }

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding >
        <ListItemButton onClick={(e)=> handleClick(e,filteredArray[index][1].id)} id={filteredArray.length !== 0 && filteredArray[index][1].id}>
        
          <ListItemText title={filteredArray.length !== 0 && filteredArray[index][1].id}
            primary={filteredArray.length !== 0 && filteredArray[index][0]}
          />
         
        </ListItemButton>
      </ListItem>
    );
  }

  //   bit of a hack to get correct height

  return (
    <Box sx={{ height: "85%" }}>
      <Typography variant="h6" component="h2">
        Find asset
      </Typography>
      <TextField
        sx={{ width: "100%", marginTop: "16px", marginBottom: "8px" }}
        placeholder="Serach for asset"
        onChange={handleChange}
      />

      <FixedSizeList
        height={boxHeight ? boxHeight - 125 : 100}
        width={"100%"}
        itemSize={60}
        itemCount={filteredArray.length !== 0 ? 100 : 0}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
