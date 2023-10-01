import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../context/Provider'
import { Form, Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard, faCalendar, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

function Options({ apartamentos }) {
    return (
        <>
            {apartamentos.map((a) => (
                <option value={a.id} key={a.id}>{`${a.id} | Tipo: ${a.tipo} | ${a.disponible != null ? "[Disponible]" : "[No disponible]"}`}</option>
            ))}
        </>
    )
}

function FormContrato() {
    const params = useParams()
    const navigate = useNavigate()
    const { notif, buscarContrato, insertarContrato, actualizarContrato, apartamentos, buscarApartamentos } = useAppContext()

    const [contrato, setContrato] = useState({
        estudiante: "",
        fecha_inicio: "",
        fecha_fin: "",
        apartamento: "",
        estado: "activo",
        observaciones: "",
        responsable: ""
    })

    function reset() {
        setContrato({
            estudiante: "",
            fecha_inicio: "",
            fecha_fin: "",
            apartamento: "",
            estado: "activo",
            observaciones: "",
            responsable: ""
        })
        navigate("../")
    }

    useEffect(() => {
        const cargarContrato = async () => {
            if (params.id) {
                const contrato = await buscarContrato(params.id)

                setContrato({
                    estudiante: contrato.estudiante,
                    fecha_inicio: moment(contrato.fecha_inicio).format('YYYY-MM-DD'),
                    fecha_fin: moment(contrato.fecha_fin).format('YYYY-MM-DD'),
                    apartamento: contrato.apartamento,
                    estado: contrato.estado,
                    observaciones: contrato.observaciones,
                    responsable: contrato.responsable
                })
            }
        }

        cargarContrato()
        buscarApartamentos()
    }, [])


    return (
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
            <h4 className="mb-4 text-lg font-semibold text-gray-600 ">
                {params.id ? `Editar contrato [${params.id}]` : "Añadir contrato"}
            </h4>

            <Formik
                initialValues={contrato}
                enableReinitialize={true}

                onSubmit={async (values) => {
                    if (values.fecha_inicio > values.fecha_fin) {
                        notif("warning", "La fecha de inicio no puede ser mayor a la fecha de fin.")
                    }
                    else {
                        if (params.id) {
                            const respuesta = await actualizarContrato(params.id, values,)

                            if (respuesta.error) {
                                notif("error", "Hubo un error al intentar editar el contrato.")
                            }
                            else {
                                notif("success", "Contrato editado correctamente.")
                                reset()
                            }
                        }
                        else {
                            const respuesta = await insertarContrato(values)

                            if (respuesta.error) {
                                notif("error", "Hubo un error al intentar añadir el contrato.")
                            }
                            else {
                                notif("success", "Contrato añadido correctamente.")
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
                                <span className="text-gray-700 dark:text-gray-400">
                                    Apartamento
                                </span>
                                <select
                                    className="block w-full mt-1 text-sm form-select focus:border-primary focus:outline-none focus:shadow-outline-primary"
                                    name="apartamento"
                                    required
                                    onChange={handleChange}
                                    value={values.apartamento}
                                >
                                    <option value="" disabled>Selecciona un apartamento</option>
                                    <Options apartamentos={apartamentos} />
                                </select>
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700">Fecha de inicio</span>
                                <div className="relative text-gray-500 focus-within:text-primary">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                                        name="fecha_inicio"
                                        type="date"
                                        required
                                        onChange={handleChange}
                                        value={values.fecha_inicio}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </div>
                                </div>
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700">Fecha de fin</span>
                                <div className="relative text-gray-500 focus-within:text-primary">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                                        name="fecha_fin"
                                        type="date"
                                        required
                                        onChange={handleChange}
                                        value={values.fecha_fin}
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
                                    <option value="activo">Activo</option>
                                    <option value="finalizado">Finalizado</option>
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
                            <label className="block text-sm">
                                <span className="text-gray-700">Observaciones</span>
                                <div className="relative text-gray-500 focus-within:text-primary">
                                    <textarea
                                        className="block w-full pl-10 mt-1 text-sm text-black focus:border-primary focus:outline-none focus:shadow-outline-primary form-input"
                                        name="observaciones"
                                        onChange={handleChange}
                                        value={values.observaciones}
                                    >
                                    </textarea>
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faCommentDots} />
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

export default FormContrato