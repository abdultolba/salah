import React, { Component, Fragment } from "react";
import Geocode from "react-geocode";

import Container from "./Container";
import DateHeader from "./DateHeader";
import PrayerTimesList from "./PrayerTimesList";
import LocateManually from "./LocateManually";
import Footer from "./Footer";

import prayertimes from "../api/prayertimes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: null,
        longitude: null,
        elevation: null
      },
      address: "",
      prayerTimes: [],
      loading: true,
      manualForm: false
    };
  }

  /**
   * Purpose: Send a GET request using axios to fetch the prayer times
   *          based on the current location. To change the calculation,
   *          change the 'school' parameter (refer to API docs).
   * @param lat Latitude
   * @param long Longitude
   * @param elevation The elevation retrieved from our geolocation
   */
  fetchData = async (lat, long, elevation) => {
    const response = await prayertimes.get("/times/today.json", {
      params: {
        latitude: lat,
        longitude: long,
        elevation: elevation,
        school: 2
      }
    });
    this.setState({
      location: {
        latitude: lat,
        longitude: long,
        elevation: elevation
      },
      prayerTimes: Object.entries(response.data.results.datetime[0].times),
      loading: false
    });
  };

  /**
   * Purpose: Display a text input field to alloww the user to search
   *          manually for their location.
   * @param event The input event (onClick)
   */
  handleButtonClick = event => {
    event.preventDefault();
    this.setState({ manualForm: true });
  };

  /**
   * Purpose: Set the location in our state based on the location
   *          selected manually by the user.
   * @param lat Latitude
   * @param long Longitude
   */
  handleMapsSearch = (lat, long) => {
    this.setState({
      location: {
        latitude: lat,
        longitude: long,
        elevation: this.state.elevation
      }
    });
  };

  /**
   * Purpose: Reverse Geocode a users address using their geolocation
   *          - Refer to Google Maps API for more information
   */
  setAddress = () => {
    Geocode.setApiKey("AIzaSyC8t1G9mouMmq1JxJfYZTaGei8j_C-kDK4");
    Geocode.fromLatLng(
      `${this.state.location.latitude}`,
      `${this.state.location.longitude}`
    ).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({ address });
      },
      error => console.error(error)
    );
  };

  /**
   * Purpose: Hide the input field once a location is selected
   */
  unMountInputField = () => {
    this.setState({ manualForm: false });
  };

  /**
   * Purpose: Attempt to retrieve the users geolocationa and send
   *          the GET requests once the component has mounted.
   */
  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          await this.fetchData(
            position.coords.latitude,
            position.coords.longitude,
            position.coords.altitude
          );
          this.setAddress();
        },
        err => {
          alert("Could not get your location. Please provide it manually.");
          this.setState({ loading: false });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 10000
        }
      );
    } else {
      alert("Please ensure your browser's location services are enabled.");
      this.setState({ loading: false });
    }
  };

  /**
   * Purpose: If the location changes, re-fetch the data and rerender
   * @param prevProps The previous component props
   * @param prevState THe previous state used to check if changes were made
   */
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.location.latitude !== prevState.location.latitude) {
      await this.fetchData(
        this.state.location.latitude,
        this.state.location.longitude,
        this.state.location.elevation
      );
      this.setAddress();
    }
  };

  render() {
    return (
      <Fragment>
        <Container>
          <DateHeader location={this.state.address} />
          <PrayerTimesList
            loading={this.state.loading}
            prayerTimes={this.state.prayerTimes}
          />
          <LocateManually
            loading={this.state.loading}
            handleClick={this.handleButtonClick}
            displayForm={this.state.manualForm}
            unMountInputField={this.unMountInputField}
            handleMapsSearch={this.handleMapsSearch}
          />
        </Container>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
