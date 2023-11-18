import React from "react";
import { useState } from "react";

const MyMapContainer = () => {
  let [lat, setLat] = useState("");
  let [long, setLong] = useState("");
  //   console.log(lat, long);

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setLat(pos.coords.latitude);
      setLong(pos.coords.longitude);
    },
    (error) => {
      console.error("Error getting geolocation:", error);
    }
  );
  return (
    <div>
      <div>
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.135729777285!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d80f5d96493%3A0x5f79790a213bd724!2s!5e0!3m2!1sen!2sin!4v1699525736332!5m2!1sen!2sin`}
          width="100%"
          height="450"
          className="map__Contact"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default MyMapContainer;
