import React from "react";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      logo: "./companylogos/microsoft-logo.png",
    },
    {
      id: 2,
      title: "TCS",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      logo: "./companylogos/tcs-logo.jpeg",
    },
    {
      id: 3,
      title: "Infosys",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      logo: "./companylogos/infosys-logo.png",
    },
  ];

  const companies2 = [
    {
      id: 1,
      title: "Deloitte",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      logo: "./companylogos/deloitte-logo.png",
    },
    {
      id: 2,
      title: "Accenture",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      logo: "./companylogos/accenture-logo.png",
    },
    {
      id: 3,
      title: "L&T",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      logo: "./companylogos/lt-logo.png",
    },
  ];

  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => (
            <div className="card" key={element.id}>
              <div className="content">
                <img
                  src={element.logo}
                  alt={`${element.title} Logo`}
                  className="img"
                />
                <div className="text">
                  <p className="company-title">{element.title}</p>
                  <p className="company-info">{element.location}</p>
                  <p className="company-open-positions">
                    {element.openPositions} Open Positions
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="banner">
          {companies2.map((element) => (
            <div className="card" key={element.id}>
              <div className="content">
                <img
                  src={element.logo}
                  alt={`${element.title} Logo`}
                  className="img"
                />
                <div className="text">
                  <p className="company-title">{element.title}</p>
                  <p className="company-info">{element.location}</p>
                  <p className="company-open-positions">
                    {element.openPositions} Open Positions
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
