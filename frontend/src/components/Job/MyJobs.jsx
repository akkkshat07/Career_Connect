import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

 
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:5000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:5000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="employer_jobs_page">
      <div className="employer_jobs_container">
        <h1 className="employer_jobs_title">Your Posted Jobs</h1>

        {myJobs.length > 0 ? (
          <div className="employer_jobs_grid">
            {myJobs.map((element) => (
              <div key={element._id} className="employer_job_item">
                <div className="employer_job_content">
                  <div className="employer_job_fields">
                    <div className="employer_field_group">
                      <span className="employer_field_label">Title</span>
                      <input
                        type="text"
                        className="employer_field_input"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "title",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="employer_field_group">
                      <span className="employer_field_label">Country</span>
                      <input
                        type="text"
                        className="employer_field_input"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "country",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="employer_field_group">
                      <span className="employer_field_label">Category</span>
                      <select
                        className="employer_field_select"
                        value={element.category}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "category",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id}
                      >
                        <option value="Graphics & Design">
                          Graphics & Design
                        </option>
                        <option value="Mobile App Development">
                          Mobile App Development
                        </option>
                        <option value="Frontend Web Development">
                          Frontend Web Development
                        </option>
                        <option value="MERN Stack Development">
                          MERN Development
                        </option>
                        <option value="Account & Finance">
                          Account & Finance
                        </option>
                        <option value="Artificial Intelligence">
                          Artificial Intelligence
                        </option>
                      </select>
                    </div>

                    <div className="employer_field_group">
                      <span className="employer_field_label">Salary</span>
                      {element.fixedSalary ? (
                        <input
                          type="number"
                          className="employer_field_input"
                          disabled={editingMode !== element._id}
                          value={element.fixedSalary}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "fixedSalary",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <div className="employer_salary_range">
                          <input
                            type="number"
                            className="employer_field_input"
                            placeholder="From"
                            disabled={editingMode !== element._id}
                            value={element.salaryFrom}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "salaryFrom",
                                e.target.value
                              )
                            }
                          />
                          <input
                            type="number"
                            className="employer_field_input"
                            placeholder="To"
                            disabled={editingMode !== element._id}
                            value={element.salaryTo}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "salaryTo",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div className="employer_field_group">
                      <span className="employer_field_label">Description</span>
                      <textarea
                        className="employer_field_textarea"
                        disabled={editingMode !== element._id}
                        value={element.description}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="employer_field_group">
                      <span className="employer_field_label">Status</span>
                      <select
                        className="employer_field_select"
                        value={element.expired}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "expired",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id}
                      >
                        <option value={true}>Expired</option>
                        <option value={false}>Active</option>
                      </select>
                    </div>
                  </div>

                  <div className="employer_actions">
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="employer_btn employer_btn_save"
                        >
                          <span className="employer_btn_icon">✓</span>
                          Save
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="employer_btn employer_btn_cancel"
                        >
                          <span className="employer_btn_icon">×</span>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="employer_btn employer_btn_edit"
                      >
                        <span className="employer_btn_icon">✎</span>
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteJob(element._id)}
                      className="employer_btn employer_btn_delete"
                    >
                      <span className="employer_btn_icon">🗑</span>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="employer_empty_state">
            <div className="employer_empty_icon">📝</div>
            <h3 className="employer_empty_title">No jobs found</h3>
            <p className="employer_empty_text">
              You haven't posted any jobs yet or may have deleted them all.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
