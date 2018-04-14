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
      { id: 3, title: 'Stirling', name: 'Stirling', address: 'Edinburgh', lat: 56.116610, lng: -3.951215 },
    ],
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log(props);
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  findLatLang(marker, geocoder, newMarkers) {
    geocoder.geocode({ 'address': marker.address }, function (results, status) {
      if (status === 'OK') {
        var element = {};
        element.lat = results[0].geometry.location.lat()
        element.lng = results[0].geometry.location.lng()
        newMarkers.push(element)
        return (newMarkers)
      } else {
        alert('Couldnt\'t find the location ' + marker.address)
        return;
      }
    })

  }
  componentDidMount() {
    const bounds = new window.google.maps.LatLngBounds()
    const geocoder = new window.google.maps.Geocoder()

    const newMarkers = []

    this.state.markers.map((marker) => {
      this.findLatLang(marker, geocoder, newMarkers)
      bounds.extend(new window.google.maps.LatLng(
       marker.lat,marker.lng
    ));
  }
    )
    console.log(newMarkers);
    
    newMarkers.map((nmarker) =>
      console.log()
    )

    this.refs.mapComponent.map.fitBounds(bounds)
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
    //console.log(this.props)
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
