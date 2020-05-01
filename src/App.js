import React, { Component } from "react";
import axios from "axios";

// Semantic UI imports
import { Image, Header } from "semantic-ui-react";

// Custom components imports
import UserMap from "./UserMap";
import InfoCard from "./InfoCard";

// Assets imports
import IpLogo from "./ip-logo.png";

// Styles imports
import "./styles.css";
import "semantic-ui-css/semantic.min.css";

class App extends Component {
  state = {};

  // You can do the two fetch one after the other by chaining them this way:
  // componentDidMount() {
  //   axios
  //     .get(
  //       "https://geo.ipify.org/api/v1?apiKey=at_q0PPYNVebXnhMzJOUModD2NEMlCWC"
  //     )
  //     .then(res => {
  //       this.setState({
  //         ip: res.data.ip,
  //         lat: res.data.location.lat,
  //         lng: res.data.location.lng,
  //         region: res.data.location.region,
  //         city: res.data.location.city,
  //         timezone: res.data.location.timezone
  //       });
  //       axios
  //         .get(
  //           `https://restcountries.eu/rest/v2/alpha/${
  //             res.data.location.country
  //           }`
  //         )
  //         .then(res => {
  //           this.setState({
  //             isLoaded: true,
  //             country: res.data.name,
  //             countryData: res.data
  //           });
  //         });
  //     })
  //     .catch(err => console.log(err.message));
  // }

  // Or you could also use async/await for an easier way to manage the fetch flow:
  async componentDidMount() {
    const ipData = await axios
      .get(
        "https://geo.ipify.org/api/v1?apiKey=at_q0PPYNVebXnhMzJOUModD2NEMlCWC"
      )
      .then(res => res.data);

    const countryData = await axios
      .get(`https://restcountries.eu/rest/v2/alpha/${ipData.location.country}`)
      .then(res => res.data);

    this.setState({
      ip: ipData.ip,
      lat: ipData.location.lat,
      lng: ipData.location.lng,
      region: ipData.location.region,
      city: ipData.location.city,
      timezone: ipData.location.timezone,
      country: countryData.name,
      countryData,
      isLoaded: true
    });
  }

  render() {
    return (
      <div className="App">
        <div className="ipCard">
          <Header
            as="h2"
            style={{
              paddingTop: "1em",
              paddingRight: window.innerWidth > 450 ? "1em" : "0em",
              fontFamily: "Patua One, cursive",
              fontSize: "2.9em",
              textShadow:
                "-1px 1px 2px #fff, 1px 1px 2px #fff, 1px -1px 0 #fff, -1px -1px 0 #fff"
            }}
          >
            <Image
              src={IpLogo}
              style={window.innerWidth < 450 ? { display: "none" } : {}}
            />{" "}
            What's My IP?
          </Header>
          {this.state.isLoaded && <InfoCard data={this.state} />}
        </div>
        <div className="leaflet-container">
          {this.state.isLoaded && (
            <UserMap position={[this.state.lat, this.state.lng]} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
