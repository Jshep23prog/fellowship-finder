import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

const geoJson = {
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Lincoln Park",
        "description": "A northside park that is home to the Lincoln Park Zoo"
      },
      "geometry": {
        "coordinates": [-87.637596, 41.940403],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Burnham Park",
        "description": "A lakefront park on Chicago's south side"
      },
      "geometry": {
        "coordinates": [-87.603735, 41.829985],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Millennium Park",
        "description": "A downtown park known for its art installations and unique architecture"
      },
      "geometry": {
        "coordinates": [-87.622554, 41.882534],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Grant Park",
        "description": "A downtown park that is the site of many of Chicago's favorite festivals and events"
      },
      "geometry": {
        "coordinates": [-87.619185, 41.876367],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Humboldt Park",
        "description": "A large park on Chicago's northwest side"
      },
      "geometry": {
        "coordinates": [-87.70199, 41.905423],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Douglas Park",
        "description": "A large park near in Chicago's North Lawndale neighborhood"
      },
      "geometry": {
        "coordinates": [-87.699329, 41.860092],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Calumet Park",
        "description": "A park on the Illinois-Indiana border featuring a historic fieldhouse"
      },
      "geometry": {
        "coordinates": [-87.530221, 41.715515],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Jackson Park",
        "description": "A lakeside park that was the site of the 1893 World's Fair"
      },
      "geometry": {
        "coordinates": [-87.580389, 41.783185],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Columbus Park",
        "description": "A large park in Chicago's Austin neighborhood"
      },
      "geometry": {
        "coordinates": [-87.769775, 41.873683],
        "type": "Point"
      }
    }
  ],
  "type": "FeatureCollection"
}


mapboxgl.accessToken = 'pk.eyJ1IjoiZXZtYXBlcnJ5IiwiYSI6ImNsb3hkaDFmZTBjeHgycXBpNTkzdWdzOXkifQ.BawBATEi0mOBIdI6TknOIw';

const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.description);
  };

  return (
    <button onClick={_onClick} className="marker" style={{
      backgroundColor: '#4CAF50',
      border: '1px solid blue',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      borderRadius: '50%',
    }}
    >
      {children}
    </button>
  );
};

const Map = () => {

  const markerClicked = (title) => {
    window.alert(title);
  };

  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.65, 41.84],
      zoom: 10,
    });

    // Render custom marker components
    geoJson.features.forEach((feature) => {
      // Create a React ref
      const ref = React.createRef();
      // Create a new DOM node and save it to the React ref
      ref.current = document.createElement('div');
      // Render a Marker Component on our new DOM node
      createRoot(ref.current).render(
        <Marker onClick={markerClicked} feature={feature}/>
      );

      // Create a Mapbox Marker at our new DOM node
      new mapboxgl.Marker(ref.current)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');


    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true,
      showUserLocation: true,
    }));

    // Clean up on unmount
    return () => map.remove();
  }, []);


  return (
    <div>
      <div className="map-container" ref={mapContainerRef} style={{ position: 'absolute', top: '400px', bottom: '0', left: '0', right: '0' }} />
    </div>
  );
};

export default Map;

