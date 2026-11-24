import Hero from "../components/Hero"
import HomeCards from "../components/HomeCards"
import JobListings from "../components/JobListings"
import ViewAllJobs from "../components/ViewAlljobs"

const HomePage = () => {
  return (
    <>
      <Hero
        titulo="Become a React Dev"
        subtitulo="Find the React job that fits your skills"
      />
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  )
}

export default HomePage
