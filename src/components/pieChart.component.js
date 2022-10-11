import { ResponsivePie } from "@nivo/pie";

const MyResponsivePie = ({ nivoData /* see data tab */ }) => (
  <ResponsivePie
    data={nivoData}
    margin={{ top: 40, right: 150, bottom: 40 }}
    innerRadius={0.3}
    padAngle={2}
    sortByValue={true}
    cornerRadius={3}
    colors={{ scheme: "category10" }}
    activeOuterRadiusOffset={8}
    borderWidth={2.5}
    borderColor={{
      from: "color",
    }}
    arcLinkLabelsSkipAngle={7}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    legends={[
      {
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 70,
        translateY: 60,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsivePie;
