import React, { Component, Fragment } from "react";
import Container from "./Container";
import DateHeader from "./DateHeader";
import PrayerTimesList from "./PrayerTimesList";
import LocateManually from "./LocateManually";
import Footer from "./Footer";

import prayer from "../api/prayer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      prayerTimes: [],
      errorMessage: "",
      loading: true,
      manualForm: false
    };
  }

  componentDidMount = () => {
    const unixTimestamp = +new Date();

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        async position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          const response = await prayer.get(`/timings/${unixTimestamp}`, {
            params: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              method: 2,
              methodSettings: [15, null, 15]
            }
          });
          this.setState({
            prayerTimes: Object.entries(response.data.data.timings),
            loading: false
          });
        },
        err => this.setState({ errorMessage: err.message, loading: false }),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 10000
        }
      );
    } else console.log("Navigator not supported.");
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const unixTimestamp = +new Date();
    if (this.state.latitude !== prevState.latitude) {
      const response = await prayer.get(`/timings/${unixTimestamp}`, {
        params: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          method: 2,
          methodSettings: [15, null, 15]
        }
      });
      this.setState({
        prayerTimes: Object.entries(response.data.data.timings),
        loading: false
      });
    }
  };

  handleButtonClick = event => {
    event.preventDefault();
    this.setState({ manualForm: true });
  };

  handleMapsSearch = (lat, long) => {
    this.setState({ latitude: lat, longitude: long });
  };

  render() {
    return (
      <Fragment>
        <Container>
          <DateHeader />
          <PrayerTimesList
            loading={this.state.loading}
            prayerTimes={this.state.prayerTimes}
          />
          <LocateManually
            loading={this.state.loading}
            handleClick={this.handleButtonClick}
            displayForm={this.state.manualForm}
            handleMapsSearch={this.handleMapsSearch}
          />
        </Container>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
