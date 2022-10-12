

import metaInfo from "./assets/metaInfo.json";
import MapComponent from "./components/map.components";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ResponsiveDrawer from "./Routes/root/root";
import TableSection from "./Routes/tableview/materialTable.route";
import RootRoute from "./Routes/root/root";
import Overview from "./Routes/overview/overview";
import GraphSite from "./Routes/graphs/graphs";
import features from "./assets/nivoMapFeature.json"
import MyResponsiveChoropleth from "./components/mapChart.component";

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
        index:true,
        element: <Overview />
      },{
        path:"EnrichedData",
        element: <GraphSite />
      }
    ]
  },
]);

function App() {
  return (<>
    {/* <MyResponsiveChoropleth data={metaDataNivoMap} features={features}/> */}
    <RouterProvider router={router} />
    </>
  );
}

export default App;
