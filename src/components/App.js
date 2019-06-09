import React, { Component } from "react";
import Container from "./Container";
import DateHeader from "./DateHeader";

import prayer from "../api/prayer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTimes: [],
      errorMessage: ""
    };
  }

  async componentDidMount() {
    const unixTimestamp = +new Date();

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        async position => {
          const response = await prayer.get(`/timings/${unixTimestamp}`, {
            params: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              method: 2,
              methodSettings: [15, null, 15]
            }
          });
          console.log(response);
        },
        err => this.setState({ errorMessage: err.message })
      );
    } else console.log("navigator not supported");
  }

  render() {
    return (
      <Container>
        <DateHeader />
      </Container>
    );
  }
}

export default App;
