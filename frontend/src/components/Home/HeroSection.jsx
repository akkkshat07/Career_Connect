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
          <h1
            style={{
              fontFamily:
                "font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;",
            }}
          >
            Welcome to
            <br />{" "}
            <span style={{ color: "blue", fontWeight: 900 }}>
              {" "}
              Career Connect
            </span>
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
          <img style={{ borderRadius: "70px" }} src="/heroS.jpg" alt="hero" />
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
        <div className="mainbg">
          <div
            className="slider"
            style={{
              "--width": "200px",
              "--height": "200px",
              "--quantity": "9",
            }}
          >
            <div className="list">
              <div className="item" style={{ "--position": 1 }}>
                <img src="slider3_1.png" alt="Slide 1" />
              </div>
              <div className="item" style={{ "--position": 2 }}>
                <img src="slider3_2.png" alt="Slide 2" />
              </div>
              <div className="item" style={{ "--position": 3 }}>
                <img src="slider3_3.png" alt="Slide 3" />
              </div>
              <div className="item" style={{ "--position": 4 }}>
                <img src="slider3_4.png" alt="Slide 4" />
              </div>
              <div className="item" style={{ "--position": 5 }}>
                <img src="slider3_5.jpeg" alt="Slide 5" />
              </div>
              <div className="item" style={{ "--position": 6 }}>
                <img src="slider3_6.png" alt="Slide 6" />
              </div>
              <div className="item" style={{ "--position": 7 }}>
                <img src="slider3_1.png" alt="Slide 7" />
              </div>
              <div className="item" style={{ "--position": 8 }}>
                <img src="slider3_2.png" alt="Slide 8" />
              </div>
              <div className="item" style={{ "--position": 9 }}>
                <img src="slider3_3.png" alt="Slide 9" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
