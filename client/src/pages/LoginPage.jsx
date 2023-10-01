import FormLogin from '../components/FormLogin'
import { useEffect } from 'react'
import { useAppContext } from '../context/Provider'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  const { sesion } = useAppContext()

  useEffect(() => {
    if (sesion) {
      navigate("/dashboard")
    }
  }, [])


  return (
    <div className="flex items-center min-h-screen p-6">
      <div
        className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl"
      >
        <div className="flex flex-col overflow-y-auto">
          <div className="flex items-center justify-center p-6">
            <div className="w-full">
              <h1
                className="mb-4 text-xl text-center font-semibold uppercase text-dark"
              >
                Inicio de sesión
              </h1>

              <hr />

              <div className="mt-4 mb-8">
                <center>
                  <img src="./src/assets/img/Logo_UdeMedellin.png" width="300" />
                </center>
              </div>

              <FormLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage