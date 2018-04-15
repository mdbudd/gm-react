import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


class MapComponent extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markers: [
      { id: 1, title: 'Bournemouth', name: 'Bournemouth', address: 'Bournemouth', lat: 50.715536, lng: -1.8734264 },
      { id: 2, title: 'Edinburgh', name: 'Edinburgh', address: 'Edinburgh', lat: 55.949344, lng: -3.209638 },
      { id: 3, title: 'Stirling', name: 'Stirling', address: 'Stirling', lat: 56.116610, lng: -3.951215 },
    ],
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  findLatLng = ({ address }) => {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          })
        } else {
          alert('Couldnt\'t find the location ' + address)
          reject()
        }
      })
    })
  }

  componentDidMount() {
    this.bounds = new window.google.maps.LatLngBounds()
    this.geocoder = new window.google.maps.Geocoder()
    Promise
      .all(this.state.markers.map(this.findLatLng))
      .then(geocodes => {
        geocodes
          .filter(Boolean)
          .forEach((coords) => {
            this.bounds.extend(new window.google.maps.LatLng(coords));
          });
        this.refs.mapComponent.map.fitBounds(this.bounds)
      })
  }

  render() {

    const style = {
      width: '80%',
      position: 'relative',
      margin: '0 auto',
      height: '100vh'
    }

    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    console.log(this.state)

    return (
      <div style={style}>
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          ref="mapComponent">
          {
            this.state.markers.map((marker) =>
              <Marker
                key={marker.id}
                onClick={this.onMarkerClick}
                name={marker.name}
                title={marker.title}
                position={{ lat: marker.lat, lng: marker.lng }}
              />
            )
          }
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapComponent)
