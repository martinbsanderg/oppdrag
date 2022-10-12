import Typography from "@mui/material/Typography";
import MyResponsiveChoropleth from "../../components/mapChart.component";
import metaInfo from "../../assets/metaInfo.json";
import features from "../../assets/nivoMapFeature.json";
import { Box } from "@mui/material";
import MyResponsivePie from "../../components/pieChart.component";
import MyResponsiveBar from "../../components/responsiveBar.component";

export default function GraphSite() {
  const metDataNivo = metaInfo.ccInfo.cardBrands.map(({ name, count }) => {
    return { id: name, label: name, value: count };
  });

  const metaDataNivoMap = metaInfo.ccInfo.cardNationsAlpha_3.map(
    ({ name, count }) => ({ id: name, value: count })
  );

  const mdBar = metaInfo.ageInfo.ageGroups.map(({ name, count }) => ({
    age: name,
    value: count,
  }));

  return (
    <>
      <Typography sx={{ marginBottom: 2 }} variant="h3">
        Table Information
      </Typography>
      <Typography sx={{ marginBottom: 3 }}>
        {" "}
        Some of the meta data visualised. The idea was to connect to a powerfull
        visualisation tool, and then spend time on creating valuable
        configuartions. This is more demonstration of how data can be displayed
        rather then the intended graph site.{" "}
      </Typography>

      <Box sx={{ height: "100%", width: "100%" }}>
        <Typography sx={{ marginTop: 3 }} variant="h5">
          {" "}
          Car Issuer Distribution
        </Typography>
        <Box sx={{ height: "60%", width: "70%" }}>
          <MyResponsivePie nivoData={metDataNivo} />
        </Box>

        <Typography sx={{ marginTop: 3 }} variant="h5">
          {" "}
          Car Issuer Nations
        </Typography>
        <Box sx={{ height: "60%", width: "70%" }}>
          <MyResponsiveChoropleth
            data={metaDataNivoMap}
            features={features.features}
          />
        </Box>

        <Typography sx={{ marginTop: 3 }} variant="h5">
          {" "}
          Age Group Distribution
        </Typography>
        <Box sx={{ height: "60%", width: "70%" }}>
          <MyResponsiveBar data={mdBar} />
        </Box>
      </Box>
    </>
  );
}
