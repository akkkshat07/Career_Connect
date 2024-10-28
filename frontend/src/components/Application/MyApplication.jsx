import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./Resume";
import PropTypes from "prop-types";
import "./Appli.css"; // Ensure this is your CSS file

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const endpoint =
          user && user.role === "Employer"
            ? "http://localhost:5000/api/v1/application/employer/getall"
            : "http://localhost:5000/api/v1/application/jobseeker/getall";

        const res = await axios.get(endpoint, {
          withCredentials: true,
        });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(
          error.response?.data.message || "Error fetching applications."
        );
      }
    };

    if (isAuthorized) {
      fetchApplications();
    } else {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/application/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(
        error.response?.data.message || "Error deleting application."
      );
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my-applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="applications-container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="applications-container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job-seeker-card">
      <div className="details">
        <p>
          <strong>Name:</strong> {element.name}
        </p>
        <p>
          <strong>Email:</strong> {element.email}
        </p>
        <p>
          <strong>Phone:</strong> {element.phone}
        </p>
        <p>
          <strong>Address:</strong> {element.address}
        </p>
        <p>
          <strong>Cover Letter:</strong> {element.coverLetter}
        </p>
      </div>
      <div className="resume-section">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          className="resume-image"
        />
      </div>
      <div className="button-area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};
const EmployerCard = ({ element, openModal }) => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(element.resume.url);

  return (
    <div className="employer-card">
      <div className="details">
        <p>
          <strong>Name:</strong> {element.name}
        </p>
        <p>
          <strong>Email:</strong> {element.email}
        </p>
        <p>
          <strong>Phone:</strong> {element.phone}
        </p>
        <p>
          <strong>Address:</strong> {element.address}
        </p>
        <p>
          <strong>Cover Letter:</strong> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div>
        <button>
          <a href="http://localhost:8018">Analyse Resume</a>
        </button>
      </div>
    </div>
  );
};
