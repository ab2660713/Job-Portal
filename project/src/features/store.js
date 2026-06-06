import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import admin from "./admin/adminSlice"
import jobReducer from "../features/jobs/jobSlice";
import resumeReducer from "../features/resume/resumeSlice";
import savedJobsReducer from "../features/savedJobs/savedJobsSlice";
import profileReducer from "../features/profile/profileSlice";
import appliedReducer from "../features/applications/applicationSlice"
const store=configureStore(
    {
        reducer:{auth,admin,jobs:jobReducer,resume:resumeReducer,savedJobs:savedJobsReducer, profile: profileReducer,applications:appliedReducer}
    }
)
export default store