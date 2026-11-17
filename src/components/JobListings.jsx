import JobListing from './JobListing'
import Spinner from './Spinner'
import { useState, useEffect } from 'react'

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const fetchJobs = async () => {
      setCargando(true)
      setError('')

      try {
        const apiUrl = `/api/jobs?_page=1&_per_page=${isHome ? 3 : 6}`
        const resultado = await fetch(apiUrl, { signal: controller.signal })

        if (!resultado.ok) {
          throw new Error('No se pudieron cargar los empleos. Comprueba que JSON Server esté iniciado.')
        }

        const data = await resultado.json()
        setJobs(data.data)
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false)
        }
      }
    }

    fetchJobs()

    return () => controller.abort()
  }, [isHome])

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Jobs
        </h2>
        {cargando ? (
          <Spinner loading={cargando} />
        ) : error ? (
          <p role="alert" className="text-center text-red-700">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-center">No hay empleos disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default JobListings
