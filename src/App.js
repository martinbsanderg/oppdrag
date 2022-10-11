import './App.css';

import metaInfo from "./assets/metaInfo.json"
import MyResponsiveBar from './components/responsiveBar.component';
import MyResponsiveChoropleth from './components/mapChart.component';
import MyResponsivePie from './components/pieChart.component';
import features from "./assets/nivoMapFeature.json"

const metDataNivo = metaInfo.ccInfo.cardBrands.map(({name, count})=>{
  return({id: name, label: name, value: count })
})

const metaDataNivoMap = metaInfo.ccInfo.cardNationsAlpha_3.map(({name, count})=>({id:name, value:count}))

const mdBar = metaInfo.ageInfo.ageGroups.map(({name, count})=>({age:name, value:count}))


function App() {
  return (
    <div className="App">
      <MyResponsiveBar data={mdBar}/>
  <MyResponsiveChoropleth data={metaDataNivoMap} features={features.features  }/>
  <MyResponsivePie nivoData={metDataNivo} />
  
    </div>
  );
}

export default App;
