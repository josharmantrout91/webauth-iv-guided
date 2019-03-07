import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  function(options) {
    // this function has access to the request options passed to axios

    // read the token from local storage & attach it to the req as the header
    options.headers.authorization = localStorage.getItem("jwt"); // <-- is this a banana name??

    // now components rendered by the HOC will attach the token automatically
    return options; //returns the modded options to axios
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Auth extends React.Component {
    render() {
      const token = localStorage.getItem("jwt");

      const notLoggedIn = <div>Please Log In to See List of Users</div>;
      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
