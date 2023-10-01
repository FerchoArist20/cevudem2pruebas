import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../context/Provider'
import { Form, Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard, faCalendar } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

function Options({ habitaciones }) {
    return (
        <>
            {habitaciones.map((h) => (
                <option value={h.id} key={h.id}>{`${h.id} | Capacidad: ${h.capacidad} | ${h.disponible != null ? "[Disponible]" : "[No disponible]"}`}</option>
            ))}
        </>
    )
}

function FormReserva() {
    const params = useParams()
    const navigate = useNavigate()
    const { notif, buscarReserva, insertarReserva, actualizarReserva, habitaciones, buscarHabitaciones } = useAppContext()

    const [reserva, setReserva] = useState({
        socio: "",
        fecha_hora_inicio: "",
        fecha_hora_fin: "",
        habitacion: "",
        numero_agregados: 0,
        estado: "pendiente"
    })

    function reset() {
        setReserva({
            socio: "",
            fecha_hora_inicio: "",
            fecha_hora_fin: "",
            habitacion: "",
            numero_agregados: 0,
            estado: "pendiente"
        })
        navigate("../")
    }

    useEffect(() => {
        const cargarReserva = async () => {
            if (params.id) {
                const reserva = await buscarReserva(params.id)

                setReserva({
                    socio: reserva.socio,
                    fecha_hora_inicio: moment(reserva.fecha_hora_inicio).format('YYYY-MM-DD HH:mm:00'),
                    fecha_hora_fin: moment(reserva.fecha_hora_fin).format('YYYY-MM-DD HH:mm:00'),
                    habitacion: reserva.habitacion,
                    numero_agregados: reserva.numero_agregados,
                    estado: reserva.estado
                })
            }
        }

        cargarReserva()
        buscarHabitaciones()
    }, [])


    return (
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
            <h4 className="mb-4 text-lg font-semibold text-gray-600 ">
                {params.id ? `Editar reserva [${params.id}]` : "Añadir reserva"}
            </h4>

            <Formik
                initialValues={reserva}
                enableReinitialize={true}

                onSubmit={async (values) => {
                    if (values.fecha_hora_inicio > values.fecha_hora_fin) {
                        notif("warning", "La fecha/hora de inicio no puede ser mayor a la fecha/hora de fin.")
                    }
                    else {
                        if (params.id) {
                            const respuesta = await actualizarReserva(params.id, values,)

                            if (respuesta.error) {
                                notif("error", "Hubo un error al intentar editar la reserva.")
                            }
                            else {
                                notif("success", "Reserva editada correctamente.")
                                reset()
                            }
                        }
                        else {
                            const respuesta = await insertarReserva(values)

                            if (respuesta.error) {
                                notif("error", "Hubo un error al intentar añadir la reserva.")
                            }
                            else {
                                notif("success", "Reserva añadida correctamente.")
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
                                    Habitación
                                </span>
                                <select
                                    className="block w-full mt-1 text-sm form-select focus:border-primary focus:outline-none focus:shadow-outline-primary"
                                    name="habitacion"
                                    required
                                    onChange={handleChange}
                                    value={values.habitacion}
                                >
                                    <option value="" disabled>Selecciona una habitación</option>
                                    <Options habitaciones={habitaciones} />
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
                                <span className="text-gray-700 dark:text-gray-400">
                                    Número de acompañantes
                                </span>
                                <select
                                    className="block w-full mt-1 text-sm form-select focus:border-primary focus:outline-none focus:shadow-outline-primary"
                                    name="numero_agregados"
                                    required
                                    onChange={handleChange}
                                    value={values.numero_agregados}
                                >
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
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
                                    <option value="activa">Activa</option>
                                    <option value="finalizada">Finalizada</option>
                                    <option value="cancelada">Cancelada</option>
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

export default FormReserva