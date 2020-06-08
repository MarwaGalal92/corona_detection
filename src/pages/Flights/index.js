import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../../utils/API";

const Wrapper = styled.div`
  margin-left: 10vw;
`;
const Infected = styled.p`
  color: red;
`;
const Healthy = styled.p`
  color: green;
`;

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [healthyPeople, setHealthyPeople] = useState([]);

  //get flights data from api.
  async function fetchFlights() {
    await axios().then((response) => {
      const data = response.data;
      setFlights(data);
    });
    return flights;
  }

  const infected = (passenger) => passenger.corona_status === true;

  //give healthyPassengers mask
  function addMask(passengers) {
    //set health passengers data
    !infected && setHealthyPeople(passengers);
    passengers.map((passenger) => (passenger.mask = true));
    console.log("mask:", passengers);
  }
  //check infected people on flights.
  function checkInfectedPeople(passengers) {
    passengers && addMask(passengers);
    return passengers?.some(infected)
      ? passengers?.map((passenger) => <Infected>{passenger.name}</Infected>)
      : passengers?.map((passenger) => <Healthy>{passenger.name}</Healthy>);
  }

  useEffect(() => {
    fetchFlights();
  }, []);

  return flights.map((flight) => (
    <Wrapper key={flight.flight_number}>
      <h3>{flight?.passengers && `Flight_${flight.flight_number}`}</h3>
      {checkInfectedPeople(flight.passengers)}
    </Wrapper>
  ));
}
