import axios from "axios";

console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_BACKEND_URL);

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api",
  withCredentials: true, // Send cookies along with request
});

const errHandler = (err) => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  isLoggedIn() {
    return service
      .get("/current-user")
      .then((res) => res.data)
      .catch(errHandler);
  },

  // This method signs up  the user
  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then((res) => res.data)
      .catch(errHandler);
  },

  login(userInfo) {
    return service
      .post("/signin", userInfo)
      .then((res) => res.data)
      .catch(errHandler);
  },

  getStreetArts() {
    return service
      .get("/street-arts")
      .then((res) => res.data)
      .catch(errHandler);
  },

  getStreetArt(streetArtId) {
    return service
      .get("/street-arts/" + streetArtId)
      .then((res) => res.data)
      .catch(errHandler);
  },

  addStreetArt(uploadData) {
    return service
      .post("/street-arts", uploadData)
      .then((res) => res.data)
      .catch(errHandler);
  },

  logout() {
    return service.delete("/logout");
  },

  // This is an example on how to use this method in a different file
  // api.getCountries().then(countries => { /* ... */ })
  getCountries() {
    return service
      .get("/countries")
      .then((res) => res.data)
      .catch(errHandler);
  },

  addCountry(body) {
    return service
      .post("/countries", body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  getSecret() {
    return service
      .get("/secret")
      .then((res) => res.data)
      .catch(errHandler);
  },

  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file);
    return service
      .post("/endpoint/to/add/a/picture", formData)
      .then((res) => res.data)
      .catch(errHandler);
  },
};
