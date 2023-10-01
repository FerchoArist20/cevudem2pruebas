import { useEffect } from "react";
import { Dropdown, Avatar } from "flowbite-react"
import userPicture from '../assets/img/user.png'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAppContext } from '../context/Provider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


function Header() {

    const { sesion, setSesion, notif } = useAppContext()

    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    const logout = () => {
        setSesion(null)
        notif("success", "Sesión cerrada correctamente. ¡Hasta luego!", 0)
        localStorage.clear()
        setSesion(null)
        setTimeout(() => { navigate("/") }, 1000);
    }

    return (
        <header className="z-10 py-4 bg-white shadow-md">
            <div
                className="container flex items-center justify-around px-6 mx-auto relative"
                style={{
                    minHeight: 35
                }}
            >

                <div className="inline-flex items-center font-bold mr-4" href="/dashboard">
                    <img style={{ width: 50 }} alt="User settings" className="!rounded-full rounded w-10 h-10 rounded" src="/src/assets/img/Logo_Club_Egresado.png" />
                </div>

                <div className="inline-flex items-center font-bold" href="/dashboard">
                    <img style={{ width: 50 }} alt="User settings" className="!rounded-full rounded w-10 h-10 rounded" src="/src/assets/img/Logo_Vives.png" />
                </div>



                <div className="absolute top-10 right-0 mr-5">
                    <span style={{ border: '1px solid #7a7a7a', margin: 20, fontSize: 45 }}></span>

                    <div className="inline-flex items-center font-bold">
                        <img style={{ width: 40 }} alt="User settings" className="!rounded-full rounded w-10 h-10 rounded" src={userPicture} />
                        <h2
                            className="ml-2 text-dark"
                            style={{
                                fontWeight: 'bolder',
                            }}>{sesion !== null ? (sesion.primer_nombre + " " + sesion.primer_apellido) : null}
                        </h2>
                    </div>

                    <span style={{ border: '1px solid #7a7a7a', margin: 20, fontSize: 45 }}></span>

                    <NavLink to="/dashboard/ajustes">
                        <div className="inline-flex items-center font-bold">
                            <FontAwesomeIcon className="!rounded-full rounded w-10 h-10 rounded hover:color-gray" icon={faGears} size="2xl" color="#333333"></FontAwesomeIcon>
                        </div>
                    </NavLink>

                    <span style={{ border: '1px solid #7a7a7a', margin: 20, fontSize: 45 }}></span>

                    <NavLink onClick={logout}>
                        <div className="inline-flex items-center font-bold">
                            <FontAwesomeIcon className="!rounded-full rounded w-10 h-10 rounded hover:color-gray" icon={faRightFromBracket} size="2xl" color="#333333"></FontAwesomeIcon>
                        </div>
                    </NavLink>
                </div>

                {/*
                <div className="absolute top-10 right-0 mr-5">
                    <Avatar style={{ width: 80, height: 80 }} alt="User settings" img={userPicture} rounded={true}>
                        <Dropdown
                            arrowIcon={true}
                            inline={true}
                            onFocus={false}
                        >
                            <Dropdown.Header>
                                <span className="block text-sm font-bold">
                                    {sesion !== null ? sesion.primer_nombre + " " + sesion.primer_apellido : null}
                                </span>
                            </Dropdown.Header>
                            <hr />
                            <Dropdown.Item onClick={() => {navigate("/dashboard/ajustes")}}>
                                Ajustes
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout}>
                                Cerrar sesión
                            </Dropdown.Item>
                        </Dropdown>
                    </Avatar>
                </div>
                    */}
            </div>
        </header>
    )
}

export default Header