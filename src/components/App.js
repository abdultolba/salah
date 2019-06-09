import React, { Component, Fragment } from "react";
import Container from "./Container";
import DateHeader from "./DateHeader";
import PrayerTimesList from "./PrayerTimesList";
import Footer from "./Footer";

import prayer from "../api/prayer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTimes: [],
      errorMessage: "",
      loading: true
    };
  }

  async componentDidMount() {
    const unixTimestamp = +new Date();

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        async position => {
            console.log(position);
          const response = await prayer.get(`/timings/${unixTimestamp}`, {
            params: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              method: 2,
              methodSettings: [15, null, 15]
            }
          });
          console.log(response);
          this.setState({
            prayerTimes: Object.entries(response.data.data.timings),
            loading: false
          });
        },
        err => this.setState({ errorMessage: err.message, loading: false }), {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 10000
          }
      );
    } else console.log("Navigator not supported.");
  }

  render() {
    return (
      <Fragment>
        <Container>
          <DateHeader />
          <PrayerTimesList loading={this.state.loading} prayerTimes={this.state.prayerTimes} />
        </Container>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
