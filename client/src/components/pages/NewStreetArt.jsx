import React from "react";
import api from "../../api";

class NewStreetArt extends React.Component {
  state = {
    lat: "",
    lng: "",
    pciture: null,
  };

  getCurrentCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("The current coords are", position.coords);

        this.setState({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFileChange = (e) => {
    console.log("The file added by the use is: ", e.target.files[0]);
    this.setState({
      picture: e.target.files[0],
    });
  };

  addStreetArtAndRedirectToDetailPage = (e) => {
    // To send information with "form-data" (like in Postman)
    const uploadData = new FormData();
    uploadData.append("lng", this.state.lng);
    uploadData.append("lat", this.state.lat);
    uploadData.append("picture", this.state.picture);

    api
      .addStreetArt(uploadData)
      .then((createdStreetArt) => {
        // Redirect the user to another page
        this.props.history.push("/list"); // TODO: change the URL
      })
      .catch((err) => {
        console.log("Error while adding the street art: ", err);
      });
  };

  render() {
    return (
      <div className="container NewStreetArt">
        <h1>New Street Art</h1>

        <button
          className="btn btn-block btn-outline-danger my-4"
          onClick={this.getCurrentCoordinates}
        >
          Get Current Coordinates
        </button>

        <div className="row my-4">
          <div className="col-sm-3">
            <label>Coordinates</label>
          </div>
          <div className="col">
            <input
              className="form-control"
              type="number"
              value={this.state.lng}
              onChange={this.handleChange}
              name="lng"
              placeholder="Longitude"
            />
          </div>
          <div className="col">
            <input
              className="form-control"
              type="number"
              value={this.state.lat}
              onChange={this.handleChange}
              name="lat"
              placeholder="Latitude"
            />
          </div>
        </div>

        <div className="row my-4">
          <div className="col-sm-3">
            <label>Picture</label>
          </div>
          <div className="col">
            <input
              className="form-control"
              type="file"
              name="picture"
              onChange={this.handleFileChange}
            />
          </div>
        </div>

        <button
          className="btn btn-block btn-danger my-4"
          onClick={this.addStreetArtAndRedirectToDetailPage}
        >
          Add Street Art
        </button>
      </div>
    );
  }
}

export default NewStreetArt;
