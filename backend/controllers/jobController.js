import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

// Get all active jobs
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});


// Post a job (only for Employers)
export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  // Check if user is allowed to post jobs
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to post a job.", 400));
  }

  const { title, description, city, fixedSalary } = req.body;

  // Validate required fields
  if (!title || !description || !city || !fixedSalary) {
    return next(
      new ErrorHandler("Please provide all required job details.", 400)
    );
  }

  const postedBy = req.user._id;

  // Create the job object
  const job = await Job.create({
    title,
    description,
    city,
    fixedSalary,
    postedBy,
  });

  res.status(201).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

// Delete a job (only for Employers)
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to delete a job.", 400)
    );
  }

  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});


export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  res.status(200).json({
    success: true,
    job,
  });
});
