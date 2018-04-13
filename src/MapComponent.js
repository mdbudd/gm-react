import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapComponent extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => (
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  )

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  componentDidUpdate() {
    const bounds = new window.google.maps.LatLngBounds()
    this.state.results.map((result) => {
      bounds.extend(new window.google.maps.LatLng(
        result.latitude,
        result.longitude
      ));
    });

    this.refs.resultMap.fitBounds(bounds)
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
    console.log(this.props)
    return (
      <div style={style}>
        <Map google={this.props.google}
          onClick={this.onMapClicked}
          ref="resultMap">
          <Marker onClick={this.onMarkerClick}
            name={'My location'}
            position={{ lat: 50.715536, lng: -1.8734264 }} />
          <Marker onClick={this.onMarkerClick}
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{ lat: 37.778519, lng: -122.405640 }} />
          <Marker onClick={this.onMarkerClick}
            name={'Dolores park'}
            position={{ lat: 37.759703, lng: -122.428093 }} />
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
