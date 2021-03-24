import React from "react";
import api from "../../api";
import { Link } from "react-router-dom";

class List extends React.Component {
  state = {
    streetArts: [],
  };

  componentDidMount() {
    api.getStreetArts().then((streetArtsFromApi) => {
      this.setState({ streetArts: streetArtsFromApi });
    });
  }

  getGoogleMapsDirection(streetArt) {
    let [lng, lat] = streetArt.location.coordinates;
    return `https://www.google.com/maps/dir//${lat},${lng}/@${lat},${lng},15z`;
  }

  render() {
    return (
      <div className="container">
        <h1>List of Street Arts</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Google Maps Direction</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.streetArts.map((streetArt) => (
              <tr key={streetArt._id}>
                <td>
                  <img
                    src={streetArt.pictureUrl}
                    alt=""
                    className="thumbnail"
                  />
                </td>
                <td className="align-middle">
                  <a
                    rel="noopener noreferrer"
                    href={this.getGoogleMapsDirection(streetArt)}
                    target="_blank"
                  >
                    {streetArt.location.coordinates[1]},
                    {streetArt.location.coordinates[0]}
                  </a>
                </td>
                <td className="align-middle">
                  <Link
                    className="btn btn-outline-danger"
                    to={"/street-art-detail/" + streetArt._id}
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
