import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export default function Autocompleter({ dataArray, sendOutput, name }) {
  // Hook included to prevent serach on strings shorter than three digits
  const [aboveThree, setAboveThree] = React.useState(false);

  const emptyArray = [];
  const handleChange = (e, v) => {
    sendOutput(v);
  };

  console.log("Rerender");
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={aboveThree ? dataArray : emptyArray}
        renderInput={(params) => {
          setAboveThree(params.inputProps.value.length > 2);
          return <TextField {...params} label={name} />;
        }}
        onChange={handleChange}
      />
    </Stack>
  );
}
