import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import axios from 'axios'
import useValidation from '../../components/custom/useValidation'
import Spinner from '../../components/layouts/Spinner'
import { useSelector } from 'react-redux'

export default function Register() {
    const { isLoggedIn } = useSelector(state => state.user)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [formValidationErrors, setFormValidationErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(isLoggedIn) navigate('/')
    }, [isLoggedIn])

    const registerNewUser = async (e) => {
        e.preventDefault()
        setFormValidationErrors(null)
        setLoading(true)
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/user/register`, user)
            toast.success(response.data.message)
            navigate('/login')
        } catch (error) {
            if(error?.response?.status === 422) {
                setFormValidationErrors(error.response.data.errors)
            }else {
                console.log(error)
                toast.error('Something went wrong while creating your account try again later.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="row my-5">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header bg-white text-center">
                        <h4 className="mt-2">
                            Register
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => registerNewUser(e)}>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    aria-describedby="helpId"
                                    placeholder="Name*"
                                    value={user.name}
                                    onChange={(e) => setUser((prev) => ({...prev, name: e.target.value}))}
                                />
                                { useValidation(formValidationErrors, 'name')}
                            </div>
                            <div className="mb-2">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    aria-describedby="helpId"
                                    placeholder="Email*"
                                    value={user.email}
                                    onChange={(e) => setUser((prev) => ({...prev, email: e.target.value}))}
                                />
                                { useValidation(formValidationErrors, 'email')}
                            </div>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    aria-describedby="helpId"
                                    placeholder="Password*"
                                    value={user.password}
                                    onChange={(e) => setUser((prev) => ({...prev, password: e.target.value}))}
                                />
                                { useValidation(formValidationErrors, 'password')}
                            </div>
                            {
                                loading ?
                                    <Spinner />
                                :
                                <button type="submit" className="btn btn-sm btn-dark">
                                    Submit
                                </button>
                            }
                        </form>
                    </div>
                    <div className="card-footer bg-white">
                        Already registred login from 
                        <NavLink to="/login" className="text-danger fw-bold ms-1">
                            here
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
