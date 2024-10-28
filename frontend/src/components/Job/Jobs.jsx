import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs-page">
      <div className="jobs-container">
        <h1 className="jobs-title">ALL AVAILABLE JOBS</h1>
        <div className="jobs-banner ag-courses_box">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <div className="job-card ag-courses_item" key={element._id}>
                <Link
                  to={`/job/${element._id}`}
                  className="ag-courses-item_link"
                >
                  <div className="ag-courses-item_title">{element.title}</div>
                  <p className="ag-courses-item_date-box">
                    <span className="ag-courses-item_date">
                      {element.category}
                    </span>
                  </p>
                  <p className="ag-courses-item_date-box">
                    <span className="ag-courses-item_date">
                      {element.country}
                    </span>
                  </p>
                  <div className="ag-courses-item_bg"></div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
