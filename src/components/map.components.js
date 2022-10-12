import { Box } from "@mui/material";
import mapboxgl from "mapbox-gl";
import React, { useState, useEffect, useRef } from "react";
import geoJsonObjectsArray from "../assets/geoJsonObjects.json";
import "./map.css";
import MapSidebar from "../components/mapSidebar.component";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFydGlic2EiLCJhIjoiY2w4eDZ5Ymw4MDQxcjNubXhqcTF1YTRtNCJ9.e1X2ZPW-v5GplE6pqI3gLQ";

//

function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-77.03238901390978);
  const [lat, setLat] = useState(38.913188059745586);
  const [zoom, setZoom] = useState(2);
  const [ageRange, setAgeRange] = useState(null);
  const popupArray = useRef([]);
  const markerArray = useRef([]);
  const [sidebarHeight, setSidebarHeight] = useState(null);
  const myRef = useRef(null);
  const [marker, setMarker] = useState("");


  useEffect(() => {
    if (myRef.current.clientHeight) {
      setSidebarHeight(myRef.current.clientHeight);
    }
  }, []);

  const handleHover = (popup, id) => {
    popupArray.current.push({ id: id, popup: popup, sticky: false });
    popup.addTo(map.current);
  };

  const handleHoverOff = () => {
    const popupToRemove = popupArray.current[popupArray.current.length - 1];

    if (!popupToRemove["sticky"]) {
      console.log("Handleeoff");
      popupToRemove["popup"].remove();

      popupArray.current.pop();
    }
    console.log(popupArray.current);
  };

  const removeAllPopups = () => {
    console.log(popupArray.current);

    for (let object of popupArray.current) {
      console.log(object);
    }

    popupArray.current.map((p) => {
      p["popup"].remove();
    });

    markerArray.current.map((p) => {
      console.log(p);
      p.remove();
    });
  };

  const handleKeyPress = (event) => {
    event.key === "r" && removeAllPopups();
  };

  const handleMarkerInput = (input, personID) => {
    const markerGeoJsonObject = geoJsonObjectsArray.find(
      (object) => object.properties.id === personID
    );

    const { id, nameFirst, nameLast, age, ccnumber } =
      markerGeoJsonObject.properties;

    const marker = new mapboxgl.Marker()
      .setLngLat(markerGeoJsonObject.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25,  closeOnClick: false}) // add popups
          .setHTML(`<h3>${nameFirst + " " + nameLast}</h3>
          <p> <Strong>Age: </Strong> ${age}</p>
          <p> <Strong>ccnumber: </Strong> ${ccnumber}</p>`)
      )
      .addTo(map.current);

    markerArray.current.push(marker);
  };

  useEffect(() => {
    console.log("Use effect 1");
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      projection: "globe",
    });

    map.current.on("load", () => {
      // Add an image to use as a custom marker
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    map.current.on("load", () => {
      // Adding geoJSON file with points
      map.current.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",

          features: [...geoJsonObjectsArray],
        },
      });

      // Heatmap
      map.current.addLayer(
        {
          id: "Observation-heatmap",
          type: "heatmap",
          source: "points",
          maxzoom: 8,
          paint: {
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3,
            ],

            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(33,102,172,0)",
              0.2,
              "rgb(103,169,207)",
              0.4,
              "rgb(209,229,240)",
              0.6,
              "rgb(253,219,199)",
              0.8,
              "rgb(239,138,98)",
              1,
              "rgb(178,24,43)",
            ],

            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20,
            ],

            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": {
              default: 1,
              stops: [
                [1, 0.4],
                [6, 1],
              ],
            },
          },
        },
        "waterway-label"
      );

      // Adding dots
      map.current.addLayer({
        id: "points",
        type: "circle",
        source: "points",
        minzoom: 7.9,
        paint: {
          "circle-radius": {
            base: 5,
            stops: [
              [7, 5],
              [12, 11],
            ],
          },
          "circle-stroke-color": "white",
          "circle-stroke-width": 3,
          "circle-color": "red",
        },
      });

      map.current.on("mouseover", "points", (event) => {
        map.current.getCanvas().style.cursor = "pointer";

        const newPopup = new mapboxgl.Popup({
          closeOnClick: false,
        })
          .setLngLat(event.features[0].geometry.coordinates)
          .setHTML(
            `<strong>First Name:</strong> ${event.features[0].properties.nameFirst} <br/>
            <strong>Last Name:</strong> ${event.features[0].properties.nameLast}<br/>
            <strong>CC Number:</strong> ${event.features[0].properties.ccnumber}`
          );
        handleHover(newPopup, event.features[0].properties.id);
      });
      map.current.on("click", "points", (event) => {
        popupArray.current[popupArray.current.length - 1]["sticky"] = true;
      });

      map.current.on("mouseout", "points", () => {
        map.current.getCanvas().style.cursor = "";
        handleHoverOff();
      });
      map.current.setFog({});
    });
  }, []);

  // useEffect(()=>{
  //   new mapboxgl.Marker().setLngLat([]).addTo(map.current)
  // }, [])

  return (
    <Box
      sx={{
        width: "100%",
        height: "85%",
        display: "inline-flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        border: 1,
        marginBottom: 6,
      }}
    >
      <Box
        id="sidebar"
        sx={{ width: "25%", height: "100%", p: 1.5 }}
        ref={myRef}
      >
        <MapSidebar setMarker={handleMarkerInput} boxHeight={sidebarHeight} />
      </Box>
      <Box sx={{ width: "75%", height: "100%" }}>
        <div
          onKeyPress={handleKeyPress}
          ref={mapContainer}
          className="map-container"
        >
          <div className="nav-values">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default MapComponent;
