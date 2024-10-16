import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./Home.css";
import "./Global.css";
import UserPhoto from "../Userphoto.png";
import MySideNav from "../Components/NavBar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(UserPhoto);
  const [appointments, setAppointments] = useState([]);

  // Fetch session user when the component mounts
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfilePhoto(parsedUser.profilePhoto || UserPhoto);
    }
  }, []);

  // Fetch appointments when the component mounts
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ADDRESS}/appointments`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          console.error("Appointments data is not an array", response.data);
          setAppointments([]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the appointments!", error);
        setAppointments([]);
      });
  }, []);

  // Helper function to handle different types of plant data
  const renderPlantInfo = (plants) => {
    if (Array.isArray(plants)) {
      // If plants is an array, join them into a string
      return plants.join(", ");
    } else if (typeof plants === "string") {
      // If plants is a string, return it directly
      return plants;
    } else if (typeof plants === "object") {
      // If plants is an object, convert it to a JSON string (for debugging or simple rendering)
      return JSON.stringify(plants);
    } else {
      return "Unknown plant data";
    }
  };

  return (
    <div className="profile-container">
      <MySideNav />
      <div className="webpage-frame">
        <header>
          <h1>Profile</h1>
          <br />
          <img
            src={profilePhoto}
            alt="User"
            className="user-photo"
            style={{ width: "12%" }}
          />
          <br />
          <h2>{user ? user.name : "Loading..."}</h2>
          <p style={{ marginTop: "-15px" }}>{user ? user.email : ""}</p>
        </header>

        <div
          className="card"
          style={{
            width: "356px",
            height: "215px",
            backgroundColor: "#DFFEDE",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5%",
            margin: "3% auto",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h6 style={{ fontWeight: "bold" }}>Personal Information</h6>
            <p style={{ textAlign: "center", fontSize: "12px" }}>
              Name: <br />
              {user ? user.name : "Loading..."} <br />
              <br />
              Username: <br />
              {user ? user.username : "Loading..."} <br />
              <br />
              Email: <br />
              {user ? user.email : "Loading..."}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button className="update-button">
            <Link
              to="/settings"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Update Information
            </Link>
          </button>
        </div>

        <br />
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          Current Appointments
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <button key={appointment._id} className="appointment-button">
                <Link
                  to="/appointments"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {renderPlantInfo(appointment.plants)} -{" "}
                  {new Date(appointment.date).toLocaleDateString()}
                </Link>
              </button>
            ))
          ) : (
            <p>No current appointments.</p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <p
            style={{
              textAlign: "center",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <Link to="/appointments" style={{ color: "inherit" }}>
              See More
            </Link>
          </p>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Home;
