import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import JobListing from '../components/JobListing'
import Spinner from '../components/Spinner'
import NotFoundPage from './NotFoundPage'

const JobPage = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const fetchJob = async () => {
      setCargando(true)
      setError('')
      setNotFound(false)

      try {
        const resultado = await fetch(`/api/jobs/${encodeURIComponent(id)}`, {
          signal: controller.signal,
        })

        if (resultado.status === 404) {
          setNotFound(true)
          return
        }

        if (!resultado.ok) {
          throw new Error('No se pudo cargar el empleo. Comprueba que JSON Server esté iniciado.')
        }

        const data = await resultado.json()
        setJob(data)
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

    fetchJob()

    return () => controller.abort()
  }, [id])

  if (cargando) return <Spinner loading={cargando} />
  if (notFound) return <NotFoundPage />

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/jobs" className="inline-block text-indigo-600 hover:text-indigo-800 mb-6">
          Back to Jobs
        </Link>
        {error ? (
          <p role="alert" className="text-red-700">{error}</p>
        ) : job ? (
          <JobListing key={job.id} job={job} isDetail />
        ) : null}
      </div>
    </section>
  )
}

export default JobPage
