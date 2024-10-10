import React from "react";
import "./Home.css";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    { id: 1, title: "41", subTitle: "Live Job", icon: <FaSuitcase /> },
    { id: 2, title: "20", subTitle: "Companies", icon: <FaBuilding /> },
    { id: 3, title: "200", subTitle: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "61", subTitle: "Employers", icon: <FaUserPlus /> },
  ];

  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>
            Welcome to
            <br /> <span style={{ color: "blue" }}> Career Connect</span>
          </h1>
          {/* <h4>Connecting students with career opportunities</h4> */}
          <p>
            <span style={{ color: "blue" }}>
              Connecting students with career opportunities
            </span>
            . Discover job opportunities that match your skills and passions.
            Connect with employers seeking talent like yours for rewarding
            careers.
          </p>
        </div>
        <div className="image">
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>
      <div className="container2">
        <h4>Why Choose Us?</h4>
        <p>
          Welcome to Career-Connect, a platform designed to simplify the
          placement process for both students and placement cells...
        </p>

        <div className="details">
          {details.map((element) => (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="content">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
