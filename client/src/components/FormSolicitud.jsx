import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../context/Provider'
import { Form, Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard, faCalendar } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

function FormSolicitud() {
    const params = useParams()
    const navigate = useNavigate()
    const { notif, buscarSolicitud, insertarSolicitud, actualizarSolicitud } = useAppContext()

    const [solicitud, setSolicitud] = useState({
        estudiante: "",
        fecha_hora_entrevista: "",
        estado: "pendiente",
        responsable: ""
    })

    function reset() {
        setSolicitud({
            estudiante: "",
            fecha_hora_entrevista: "",
            estado: "pendiente",
            responsable: ""
        })
        navigate("../")
    }

    useEffect(() => {
        const cargarSolicitud = async () => {
            if (params.id) {
                const solicitud = await buscarSolicitud(params.id)

                setSolicitud({
                    estudiante: solicitud.estudiante,
                    fecha_hora_entrevista: moment(solicitud.fecha_hora_entrevista).format('YYYY-MM-DD HH:mm:00'),
                    estado: solicitud.estado,
                    responsable: solicitud.responsable
                })
            }
        }

        cargarSolicitud()
    }, [])


    return (
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
            <h4 className="mb-4 text-lg font-semibold text-gray-600 ">
                {params.id ? `Editar solicitud [${params.id}]` : "Añadir solicitud"}
            </h4>

            <Formik
                initialValues={solicitud}
                enableReinitialize={true}

                onSubmit={async (values) => {
                    if (params.id) {
                        const respuesta = await actualizarSolicitud(params.id, values,)

                        if (respuesta.error) {
                            notif("error", "Hubo un error al intentar editar la solicitud.")
                        }
                        else {
                            notif("success", "Solicitud editada correctamente.")
                            reset()
                        }
                    }
                    else {
                        const respuesta = await insertarSolicitud(values)

                        if (respuesta.error) {
                            notif("error", "Hubo un error al intentar añadir la solicitud.")
                        }
                        else {
                            notif("success", "Solicitud añadida correctamente.")
                            reset()
                        }
                    }
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="grid gap-6 mb-4 md:grid-cols-2">
                            <label className="block text-sm">
                                <span className="text-gray-700">Documento del estudiante</span>
                                <div className="relative text-gray-500 focus-within:text-primary">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                                        name="estudiante"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        value={values.estudiante}
                                        placeholder="Documento del estudiante"
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faIdCard} />
                                    </div>
                                </div>
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700">Fecha/hora de la entrevista</span>
                                <div className="relative text-gray-500 focus-within:text-primary">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                                        name="fecha_hora_entrevista"
                                        type="datetime-local"
                                        required
                                        onChange={handleChange}
                                        value={values.fecha_hora_entrevista}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </div>
                                </div>
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Estado
                                </span>
                                <select
                                    className="block w-full mt-1 text-sm form-select focus:border-primary focus:outline-none focus:shadow-outline-primary"
                                    name="estado"
                                    required
                                    onChange={handleChange}
                                    value={values.estado}
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="aprobada">Aprobada</option>
                                    <option value="cancelada">Cancelada</option>
                                </select>
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700">Documento del responsable</span>
                                <div className="relative text-gray-500 focus-within:text-primary">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                                        name="responsable"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        value={values.responsable}
                                        placeholder="Documento del responsable"
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faIdCard} />
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="block font-bold px-10 py-1 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-primary hover:bg-primary focus:outline-none focus:shadow-outline-purple"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Guardar
                            </button>
                            <Link to="../">
                                <button
                                    className="block font-bold px-10 py-1 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-secondary border border-transparent rounded-lg hover:bg-secondary focus:outline-none focus:shadow-outline-purple"
                                    type="button"
                                >
                                    Volver
                                </button>
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FormSolicitud