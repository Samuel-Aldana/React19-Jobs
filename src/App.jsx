import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router"
import HomePage from "./pages/HomePage"
import MainLayout from "./layouts/MainLayout"
import JobsPage from "./pages/JobsPage"
import JobPage from "./pages/JobPage"
import NotFoundPage from "./pages/NotFoundPage"
import AddJobPage from "./pages/AddJobPage"
import EditJobPage from "./pages/EditJobPage"
import { jobLoader } from "./jobLoader"

const saveJob = async (path, options) => {
  const response = await fetch(path, options)
  if (!response.ok) throw new Error(`Error ${response.status}`)
}

const App = () => {
  // Add Job
  const addJob = async (newJob) => {
    await saveJob("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    })
  }

  // Delete Job
  const deleteJob = async (id) => {
    await saveJob(`/api/jobs/${encodeURIComponent(id)}`, { method: "DELETE" })
  }

  // Update Job
  const updateJob = async (job) => {
    await saveJob(`/api/jobs/${encodeURIComponent(job.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    })
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
          errorElement={<NotFoundPage />}
        />
        <Route
          path="edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
          errorElement={<NotFoundPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
