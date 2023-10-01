import { useAppContext } from '../context/Provider'
import { Form, Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faIdCard, faPhone, faLock, faKey } from '@fortawesome/free-solid-svg-icons'
import md5 from 'md5'

function AjustesPage() {
  const {
    notif, sesion, setSesion,
    buscarUsuario,
    verificarUsuarioDocumento, actualizarUsuarioDocumento,
    verificarUsuarioCorreo, actualizarUsuarioPersonales,
    verificarUsuarioClave, actualizarUsuarioSeguridad
  } = useAppContext()

  return (
    <div className="container px-6 mx-auto grid">
      <h2
        className="my-6 text-2xl font-semibold text-dark"
      >
        Ajustes
      </h2>

      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
          <h4 className="mb-4 text-lg font-semibold text-gray-600 ">
            Documento de identidad
          </h4>

          <Formik
            initialValues={{
              tipo_documento: sesion ? sesion.tipo_documento : "cc",
              documento: sesion ? sesion.documento : ""
            }}

            enableReinitialize={false}

            onSubmit={async (values) => {
              const usuario = {
                tipo_documento: values.tipo_documento,
                documento: values.documento,
              }

              const verifNumDocumento = await verificarUsuarioDocumento(usuario.documento)

              if (usuario.documento !== sesion.documento && verifNumDocumento) {
                notif("warning", "Ya existe un usuario con el número de documento ingresado.")
              }
              else {
                const respuesta = await actualizarUsuarioDocumento(sesion.documento, values)

                if (respuesta.error) {
                  notif("error", "Ha ocurrido un error en el sistema al actualizar el documento.")
                }
                else {
                  const nuevoUsuario = await buscarUsuario(usuario.documento)

                  if (nuevoUsuario.error) {
                    notif("error", "Ha ocurrido un error en el sistema al obtener los nuevos datos.")
                  }
                  else {
                    notif("success", "Documento de identidad actualizado correctamente.")
                    localStorage.setItem(
                      'loggedAppUser', JSON.stringify(nuevoUsuario)
                    )
                    setSesion(nuevoUsuario)
                  }
                }
              }
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <label className="block mb-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Tipo de documento
                  </span>
                  <select
                    className="block w-full mt-1 text-sm form-select focus:border-primary focus:outline-none focus:shadow-outline-primary"
                    name="tipo_documento"
                    required
                    onChange={handleChange}
                    value={values.tipo_documento}
                  >
                    <option value="cc">CC - Cédula de ciudadanía</option>
                    <option value="ce">CE - Cédula de extranjería</option>
                    <option value="pa">PA - Pasaporte</option>
                  </select>
                </label>
                <label className="block mb-4 text-sm">
                  <span className="text-gray-700">Número de documento</span>
                  <div className="relative text-gray-500 focus-within:text-primary">
                    <input
                      className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                      name="documento"
                      type="text"
                      required
                      onChange={handleChange}
                      value={values.documento}
                      placeholder="Número de documento"
                    />
                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                      <FontAwesomeIcon icon={faIdCard} />
                    </div>
                  </div>
                </label>
                <button
                  className="block font-bold px-10 py-1 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-primary hover:bg-primary focus:outline-none focus:shadow-outline-purple"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Guardar
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
          <h4 className="mb-4 text-lg font-semibold text-gray-600 ">
            Datos personales
          </h4>

          <Formik
            initialValues={{
              primer_nombre: sesion ? sesion.primer_nombre : "",
              segundo_nombre: sesion ? (sesion.segundo_nombre ? sesion.segundo_nombre : "") : "",
              primer_apellido: sesion ? sesion.primer_apellido : "",
              segundo_apellido: sesion ? (sesion.segundo_apellido ? sesion.segundo_apellido : "") : "",
              correo_electronico: sesion ? sesion.correo_electronico : "",
              telefono: sesion ? (sesion.telefono ? sesion.telefono : "") : ""
            }}

            enableReinitialize={false}

            onSubmit={async (values) => {
              const usuario = {
                primer_nombre: values.primer_nombre,
                segundo_nombre: values.segundo_nombre,
                primer_apellido: values.primer_apellido,
                segundo_apellido: values.segundo_apellido,
                correo_electronico: values.correo_electronico,
                telefono: values.telefono
              }

              const verifCorreo = await verificarUsuarioCorreo(usuario)

              if (usuario.correo_electronico !== sesion.correo_electronico && verifCorreo) {
                notif("warning", "Ya existe un usuario con el correo electrónico ingresado.")
              }
              else {
                const respuesta = await actualizarUsuarioPersonales(sesion.documento, usuario)

                if (respuesta.error) {
                  notif("error", "Ha ocurrido un error en el sistema al actualizar los datos personales.")
                }
                else {
                  const nuevoUsuario = await buscarUsuario(sesion.documento)

                  if (nuevoUsuario.error) {
                    notif("error", "Ha ocurrido un error en el sistema al obtener los nuevos datos.")
                  }
                  else {
                    notif("success", "Datos personales actualizados correctamente.")
                    localStorage.setItem(
                      'loggedAppUser', JSON.stringify(nuevoUsuario)
                    )
                    setSesion(nuevoUsuario)
                  }
                }
              }
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <label className="block mb-4 text-sm">
                  <span className="text-gray-700">Nombres</span>
                  <div className="grid gap-3 mb-4 md:grid-cols-2">
                    <div className="relative text-gray-500 focus-within:text-primary">
                      <input
                        className="block w-full mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                        name="primer_nombre"
                        type="text"
                        required
                        onChange={handleChange}
                        value={values.primer_nombre}
                        placeholder="Primer nombre"
                      />
                    </div>
                    <div className="relative text-gray-500 focus-within:text-primary">
                      <input
                        className="block w-full mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                        name="segundo_nombre"
                        type="text"
                        onChange={handleChange}
                        value={values.segundo_nombre}
                        placeholder="Segundo nombre"
                      />
                    </div>
                  </div>
                </label>
                <label className="block mb-4 text-sm">
                  <span className="text-gray-700">Apellidos</span>
                  <div className="grid gap-3 mb-4 md:grid-cols-2">
                    <div className="relative text-gray-500 focus-within:text-primary">
                      <input
                        className="block w-full mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                        name="primer_apellido"
                        type="text"
                        required
                        onChange={handleChange}
                        value={values.primer_apellido}
                        placeholder="Primer apellido"
                      />
                    </div>
                    <div className="relative text-gray-500 focus-within:text-primary">
                      <input
                        className="block w-full mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                        name="segundo_apellido"
                        type="text"
                        onChange={handleChange}
                        value={values.segundo_apellido}
                        placeholder="Segundo apellido"
                      />
                    </div>
                  </div>
                </label>
                <label className="block mb-4 text-sm">
                  <span className="text-gray-700">Correo electrónico</span>
                  <div className="relative text-gray-500 focus-within:text-primary">
                    <input
                      className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                      name="correo_electronico"
                      type="email"
                      required
                      onChange={handleChange}
                      value={values.correo_electronico}
                      placeholder="Correo electrónico"
                    />
                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                  </div>
                </label>
                <label className="block mb-4 text-sm">
                  <span className="text-gray-700">Teléfono</span>
                  <div className="relative text-gray-500 focus-within:text-primary">
                    <input
                      className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                      name="telefono"
                      type="tel"
                      onChange={handleChange}
                      value={values.telefono}
                      placeholder="Teléfono"
                    />
                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                  </div>
                </label>
                <button
                  className="block font-bold px-10 py-1 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-primary hover:bg-primary focus:outline-none focus:shadow-outline-purple"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Guardar
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
          <h4 className="mb-4 text-lg font-semibold text-gray-600 ">
            Contraseña
          </h4>

          <Formik
            initialValues={{
              clave: "",
              nclave1: "",
              nclave2: ""
            }}

            enableReinitialize={false}

            onSubmit={async (values) => {
              const usuario = {
                documento: sesion.documento,
                clave: md5(values.clave)
              }

              const verifClave = await verificarUsuarioClave(usuario)

              if (!verifClave) {
                notif("warning", "La contraseña actual ingresada es incorrecta.")
              }
              else if (values.nclave1 !== values.nclave2) {
                notif("warning", "Las contraseñas no coinciden.")
              }
              else {
                const nuevoUsuario = {
                  clave: md5(values.nclave1)
                }

                const respuesta = await actualizarUsuarioSeguridad(sesion.documento, nuevoUsuario)

                if (respuesta.error) {
                  notif("error", "Ha ocurrido un error en el sistema al actualizar la contraseña.")
                }
                else {
                  notif("success", "Contraseña actualizada correctamente.")
                  values.clave = ""
                  values.nclave1 = ""
                  values.nclave2 = ""
                }
              }
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <label className="block mb-4 text-sm">
                  <span className="text-gray-700">Contraseña actual</span>
                  <div className="relative text-gray-500 focus-within:text-primary">
                    <input
                      className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                      name="clave"
                      type="password"
                      required
                      onChange={handleChange}
                      value={values.clave}
                      placeholder="Contraseña actual"
                    />
                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                  </div>
                </label>
                <label className="block mb-4 text-sm">
                  <span className="text-gray-700">Nueva contraseña</span>
                  <div className="relative text-gray-500 focus-within:text-primary">
                    <input
                      className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                      name="nclave1"
                      type="password"
                      required
                      onChange={handleChange}
                      value={values.nclave1}
                      placeholder="Contraseña nueva"
                    />
                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                      <FontAwesomeIcon icon={faKey} />
                    </div>
                  </div>
                  <div className="relative text-gray-500 focus-within:text-primary">
                    <input
                      className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                      name="nclave2"
                      type="password"
                      required
                      onChange={handleChange}
                      value={values.nclave2}
                      placeholder="Contraseña nueva (confirmación)"
                    />
                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                      <FontAwesomeIcon icon={faKey} />
                    </div>
                  </div>
                </label>
                <button
                  className="block font-bold px-10 py-1 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-primary hover:bg-primary focus:outline-none focus:shadow-outline-purple"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Guardar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AjustesPage