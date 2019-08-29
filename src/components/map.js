import React from 'react'
import { CircleMarker, Map, GeoJSON, TileLayer, Popup } from 'react-leaflet'
// import worldGeoJSON from './world'   

class Map2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city : [
        { name: "i dont know", location: { lat: 51.505, lng: -0.09}, radius: 10},
        { name: "i know", location: { lat: 51.505, lng: -10.09}, radius: 20},
        { name: "you dont know", location: { lat: 67.505, lng: -12.09}, radius: 30}
      ],
      center: [0.20, 0],
      zoom: 1,
    }
    this.colorMap = this.colorMap.bind(this);
  }  
  
  colorMap(e) {
    console.log(e)
  } 

  render() {
    return (
      <div className="map">
        <Map 
          center={this.state.center} 
          zoom={this.state.zoom}
          ref={this.mapRef}
        >
          {/* <GeoJSON
            data={worldGeoJSON}
            style={this.colorMap}
            maxZoom={4}
          /> */}
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          { this.state.city.map( (city, i) => {
            return  <CircleMarker key={i} center={[city.location.lat, city.location.lng]} color="red" radius={city.radius}>
                      <Popup>{city.name}</Popup>
                    </CircleMarker>
            }
          )}
          
        </Map>
      </div>
    );
  }
}

export default Map2
