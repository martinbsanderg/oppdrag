import "./App.css";

import metaInfo from "./assets/metaInfo.json";
import MyResponsiveBar from "./components/responsiveBar.component";
import MyResponsiveChoropleth from "./components/mapChart.component";
import MyResponsivePie from "./components/pieChart.component";
import features from "./assets/nivoMapFeature.json";
import DataGridDemo from "./components/table.component";
import assetArray from "./assets/assetArray.json"
import MapComponent from "./components/map.components";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ResponsiveDrawer from "./Routes/root/root";
import TableSection from "./Routes/root/materialTable.route";
import RootRoute from "./Routes/root/root";


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



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute/>,
    children: [
      {
        path:"table",
        element:<TableSection/>
      },
      {
        path:"overview",
        element: <MapComponent />
      }
    ]
  },
]);

function App() {
  return (
    <>

    <RouterProvider router={router} />
    </>
  );
}

export default App;
