import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logout, setCredentials } from '../../redux/slices/userSlice'
import { API_BASE_URL, getConfig } from '../../config/api'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Navbar() {
    const { user, token, isLoggedIn } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user`, getConfig(token) )
                dispatch(setCredentials({user: response.data.user, token: response.data.access_token}))
            } catch (error) {
                if(error?.response?.status === 401) {
                    dispatch(logout()) 
                    navigate('/login')
                }else {
                    console.log(error)
                    toast.error('Something went wrong while fetching the logged in user try again later.')
                }
            }
        }
        if(token) getLoggedInUser()
    }, [token])

    const logoutUser = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/logout`, 
                {}, getConfig(token) )
            dispatch(logout())
            toast.success(response.data.message)
            navigate('/login')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong try again later.')
        }
    }


    return (
        <ul className="nav nav-underline justify-content-center mt-3">
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                    <i className="bi bi-house"></i> Home
                </NavLink>
            </li>
            {
                isLoggedIn ?
                    <>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/task/create">
                                <i className="bi bi-plus"></i> Create Task
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/register">
                                <i className="bi bi-person"></i> { user?.name }
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" aria-current="page"
                                onClick={() => logoutUser()}
                            >
                                <i className="bi bi-person-fill-down"></i> Logout
                            </button>
                        </li>
                    </>
                :
                    <>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/register">
                                <i className="bi bi-person-add"></i> Register
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/login">
                                <i className="bi bi-person-fill-up"></i> Login
                            </NavLink>
                        </li>
                    </>
            }
        </ul>
    )
}
