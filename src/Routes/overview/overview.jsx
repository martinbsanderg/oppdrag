import Typography from "@mui/material/Typography";
import MapComponent from "../../components/map.components";

export default function Overview() {
  return (
    <>
      <Typography sx={{ marginBottom: 2 }} variant="h3">
        Table Information
      </Typography>
      <Typography sx={{ marginBottom: 3 }}>
        {" "}
        On this page we can se all the assets spread on world map according to
        their coordinates. In the sidebar you can choose search for a given
        asset. If you click on the asset a marker will appear on it's given
        location. Although the interraction with the map is limited per now, this integration allows to analyse the data material witn the full power of Mapox{" "}
      </Typography>
      <MapComponent></MapComponent>
    </>
  );
}
