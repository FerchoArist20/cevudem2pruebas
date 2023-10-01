import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../context/Provider'
import { Form, Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard, faCalendar, faPeopleLine } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

function Options({ lugares }) {
    return (
        <>
            {lugares.map((l) => (
                <option value={l.id} key={l.id}>{`${l.nombre} | Capacidad: ${l.capacidad} | ${l.disponible != null ? "[Disponible]" : "[No disponible]"}`}</option>
            ))}
        </>
    )
}

function FormEvento() {
    const params = useParams()
    const navigate = useNavigate()
    const { notif, buscarEvento, insertarEvento, actualizarEvento, lugares, buscarLugares } = useAppContext()

    const [evento, setEvento] = useState({
        socio: "",
        fecha_hora_inicio: "",
        fecha_hora_fin: "",
        lugar: "",
        numero_asistentes: 0,
        estado: "pendiente"
    })

    function reset() {
        setEvento({
            socio: "",
            fecha_hora_inicio: "",
            fecha_hora_fin: "",
            lugar: "",
            numero_asistentes: 0,
            estado: "pendiente"
        })
        navigate("../")
    }

    useEffect(() => {
        const cargarEvento = async () => {
            if (params.id) {
                const evento = await buscarEvento(params.id)

                setEvento({
                    socio: evento.socio,
                    fecha_hora_inicio: moment(evento.fecha_hora_inicio).format('YYYY-MM-DD HH:mm:00'),
                    fecha_hora_fin: moment(evento.fecha_hora_fin).format('YYYY-MM-DD HH:mm:00'),
                    lugar: evento.lugar,
                    numero_asistentes: evento.numero_asistentes,
                    estado: evento.estado
                })
            }
        }

        cargarEvento()
        buscarLugares()
    }, [])


    return (
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
            <h4 className="mb-4 text-lg font-semibold text-gray-600 ">
                {params.id ? `Editar evento [${params.id}]` : "Añadir evento"}
            </h4>

            <Formik
                initialValues={evento}
                enableReinitialize={true}

                onSubmit={async (values) => {
                    if (values.fecha_hora_inicio > values.fecha_hora_fin) {
                        notif("warning", "La fecha/hora de inicio no puede ser mayor a la fecha/hora de fin.")
                    }
                    else {
                        if (params.id) {
                            const respuesta = await actualizarEvento(params.id, values,)

                            if (respuesta.error) {
                                notif("error", "Hubo un error al intentar editar el evento.")
                            }
                            else {
                                notif("success", "Evento editado correctamente.")
                                reset()
                            }
                        }
                        else {
                            const respuesta = await insertarEvento(values)

                            if (respuesta.error) {
                                notif("error", "Hubo un error al intentar añadir el evento.")
                            }
                            else {
                                notif("success", "Evento añadido correctamente.")
                                reset()
                            }
                        }
                    }
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="grid gap-6 mb-4 md:grid-cols-2">
                            <label className="block text-sm">
                                <span className="text-gray-700">Documento del socio</span>
                                <div className="relative text-gray-500 focus-within:text-primary">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                                        name="socio"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        value={values.socio}
                                        placeholder="Documento del socio"
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faIdCard} />
                                    </div>
                                </div>
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Lugar
                                </span>
                                <select
                                    className="block w-full mt-1 text-sm form-select focus:border-primary focus:outline-none focus:shadow-outline-primary"
                                    name="lugar"
                                    required
                                    onChange={handleChange}
                                    value={values.lugar}
                                >
                                    <option value="" disabled>Selecciona un lugar</option>
                                    <Options lugares={lugares} />
                                </select>
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700">Fecha/hora de inicio</span>
                                <div className="relative text-gray-500 focus-within:text-primary">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                                        name="fecha_hora_inicio"
                                        type="datetime-local"
                                        required
                                        onChange={handleChange}
                                        value={values.fecha_hora_inicio}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </div>
                                </div>
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700">Fecha/hora de fin</span>
                                <div className="relative text-gray-500 focus-within:text-primary">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                                        name="fecha_hora_fin"
                                        type="datetime-local"
                                        required
                                        onChange={handleChange}
                                        value={values.fecha_hora_fin}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </div>
                                </div>
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700">Número de asistentes</span>
                                <div className="relative text-gray-500 focus-within:text-primary">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                                        name="numero_asistentes"
                                        type="number"
                                        required
                                        onChange={handleChange}
                                        value={values.numero_asistentes}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faPeopleLine} />
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
                                    <option value="activo">Activo</option>
                                    <option value="finalizado">Finalizado</option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
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

export default FormEvento