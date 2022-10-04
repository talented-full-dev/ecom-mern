import React from "react";
import Typewriter from "typewriter-effect";

const Jumbrotron = ({ text }) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default Jumbrotron;
