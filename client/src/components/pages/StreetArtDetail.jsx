import React from "react";
import api from "../../api";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import "mapbox-gl/src/css/mapbox-gl.css";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class StreetArtDetail extends React.Component {
  state = {
    streetArt: null,
  };

  mapDomRef = React.createRef(null);
  map = React.createRef(null).current; // A variable that is always the same, even after a new render
  marker = React.createRef(null).current; // A variable that is always the same, even after a new render

  componentDidMount() {
    let streetArtId = this.props.match.params.id;

    api.getStreetArt(streetArtId).then((streetArtFromApi) => {
      this.setState({ streetArt: streetArtFromApi });
      let [lng, lat] = streetArtFromApi.location.coordinates;
      this.initMap(lng, lat);
    });
  }

  initMap(lng, lat) {
    // Embed the map where "mapDomRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapDomRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 10,
    });

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl());

    // Create a marker on the map with the coordinates ([lng, lat])
    this.marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .addTo(this.map);
  }

  handleImgClick(e) {
    e.target.requestFullscreen(); // e.target => DOM element
  }

  render() {
    if (!this.state.streetArt) return <div>Loading...</div>;
    return (
      <div>
        <h1>Street Art Detail</h1>
        <img
          src={this.state.streetArt.pictureUrl}
          alt=""
          onClick={this.handleImgClick}
        />
        <hr />
        Longitude: {this.state.streetArt.location.coordinates[0]} <br />
        Latitude: {this.state.streetArt.location.coordinates[1]} <br />
        <div ref={this.mapDomRef} style={{ height: 400 }}></div>
      </div>
    );
  }
}

export default StreetArtDetail;
