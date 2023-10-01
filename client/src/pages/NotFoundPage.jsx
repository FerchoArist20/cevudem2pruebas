import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div style={{margin: 20}}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bolder"}}>Página no encontrada</h2>
      <Link to="/" style={{ fontSize: "1rem", fontStyle:'italic', color:'blue', textDecorationLine:'underline'}}>Volver al inicio</Link>
    </div>
  )
}

export default NotFoundPage