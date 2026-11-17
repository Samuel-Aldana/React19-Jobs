import { ClipLoader } from 'react-spinners'

const override = {
  display: 'block',
  margin: '100px auto',
}

const Spinner = ({ loading }) => {
  return (
    <div role="status" aria-label="Cargando empleos">
      <ClipLoader
        color="#4338ca"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-hidden="true"
      />
      <span className="sr-only">Cargando empleos...</span>
    </div>
  )
}

export default Spinner
