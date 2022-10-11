import "./App.css";

import metaInfo from "./assets/metaInfo.json";
import MyResponsiveBar from "./components/responsiveBar.component";
import MyResponsiveChoropleth from "./components/mapChart.component";
import MyResponsivePie from "./components/pieChart.component";
import features from "./assets/nivoMapFeature.json";
import DataGridDemo from "./components/table.component";
import assetArray from "./assets/assetArray.json"

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

const rows = assetArray;


function App() {
  return (
    <div className="App">
    <DataGridDemo columns={columns} rows={rows}/>
      <MyResponsiveBar data={mdBar} />
      <MyResponsiveChoropleth
        data={metaDataNivoMap}
        features={features.features}
      />
      <MyResponsivePie nivoData={metDataNivo} />
    </div>
  );
}

export default App;
