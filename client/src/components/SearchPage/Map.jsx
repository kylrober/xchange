import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import DeckGL, {GeoJsonLayer} from 'deck.gl';
import { Map } from 'react-map-gl'
import * as API from '../../API.js'
import DATA from './address.json'
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import ItemModal from './ItemModal.jsx';

const ACCESS_TOKEN = 'pk.eyJ1IjoiYm9zaGFvMTMiLCJhIjoiY2xkMTgya2JhMXZkYTNudDdrYTQ1M25kdSJ9.DsCvNLZe6sZ1-zId4C-eIA'
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const GOOGLE_MAPS_KEY = 'AIzaSyAioaBzcUMBv_L3lsd9CoFbz4Gw-Xv-IhY'

const INITIAL_VIEW_STATE = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 2,
  bearing: -10,
  pitch: 20
};

const Title = styled('div')({
  position: 'absolute',
  top: '80px',
  left: '155px'
})

function Map1({changeView, props, user}) {
  const [allUsers, setAllUsers] = useState([]);
  const [mapData, setMapData] = useState(DATA);
  const [showDetails, setShowDetails] = useState(false);
  const [item, setItem] = useState({});

  React.useEffect(() => { //gets and sets allUsers on mount
    axios.get('/map')
      .then(res => {
        setMapData(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [])

  const onClick = (info) => { // Go to Item Details, etc
    if(info.object) {
      console.log(info.object.properties.name);
      console.log(info.object.properties.description);
      console.log(info.object.properties.thumbnail_url);
      console.log(info.object.properties.item_condition);
      console.log(info.object.id);
      console.log(info.object.properties.user_id);

      let itemObj = {
        name: info.object.properties.name,
        description: info.object.properties.description,
        condition: info.object.properties.item_condition,
        image: info.object.properties.thumbnail_url,
        itemID: info.object.id,
        userID: info.object.properties.user_id
      };

      setItem(itemObj);
      setShowDetails(true);
    }
  }

  const layers = [
    new GeoJsonLayer({
      id: 'people',
      data: mapData, //.json
      filled: true,
      pointRadiusMinPixels: 5,
      pointRadiusScale: 1,
      getPointRadius: f => 5,
      getFillColor: [86, 144, 58, 250],
      pickable: true,
      autoHighlight: true,
      onClick
    })
  ]
  return (
    <>
     <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}>
        <Title>find an item</Title>
        <Map mapStyle={MAP_STYLE} mapboxAccessToken={ACCESS_TOKEN}/>
        {item ? <ItemModal showDetails={showDetails} setShowDetails={setShowDetails} onCloseItem={() => setShowDetails(false)} item={item} changeView={changeView} user={user}/> : null}
     </DeckGL>
    </>
  );
}

export default Map1;