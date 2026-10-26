import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useCategories from '../custom/useCategories'
import { toast } from 'react-toastify'
import axios from 'axios'
import useValidation from '../custom/useValidation'
import Spinner from '../layouts/Spinner'
import { useSelector } from 'react-redux'
import { getConfig } from '../../config/api'

export default function EditTask() {
    const { token } = useSelector(state => state.user)
    const [task, setTask] = useState({
        title: '',
        body: '',
        category_id: '',
        done: 0
    })
    const categories = useCategories()
    const [formValidationErrors, setFormValidationErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { taskId } = useParams()

    useEffect(() => {
        const fetchTask = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskId}`, getConfig(token))
                setTask(response.data.data)
            } catch (error) {
                if(error?.response?.status === 404) {
                    toast.error('Task not found.')
                }else {
                    console.log(error)
                    toast.error('Something went wrong while fetching the task try again later.')
                }
            } finally {
                setLoading(false)
            }
        }
        fetchTask()
    }, [])

    const updateTask = async (e) => {
        e.preventDefault()
        setFormValidationErrors(null)
        setLoading(true)
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}`, task, getConfig(token))
            toast.success(response.data.message)
            navigate('/')
        } catch (error) {
            if(error?.response?.status === 422) {
                setFormValidationErrors(error.response.data.errors)
            }else {
                console.log(error)
                toast.error('Something went wrong while updating the task try again later.')
            }
        } finally {
            setLoading(false)
        }
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <div className="row my-5">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header bg-white text-center">
                        <h4 className="mt-2">
                            Edit task
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => updateTask(e)}>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    id="title"
                                    aria-describedby="helpId"
                                    placeholder="Title*"
                                    value={task.title}
                                    onChange={(e) => setTask((prev) => ({...prev, title: e.target.value}))}
                                />
                                { useValidation(formValidationErrors, 'title')}
                            </div>
                            <div className="mb-2">
                                <textarea
                                    rows={5}
                                    className="form-control"
                                    name="body"
                                    id="body"
                                    aria-describedby="helpId"
                                    placeholder="Content*"
                                    value={task.body}
                                    onChange={(e) => setTask((prev) => ({...prev, body: e.target.value}))}
                                ></textarea>
                                { useValidation(formValidationErrors, 'body')}
                            </div>
                            <div className="mb-2">
                                <select 
                                    className="form-select"
                                    name="category_id" 
                                    id="category_id"
                                    onChange={(e) => setTask((prev) => ({...prev, category_id: e.target.value}))}
                                    value={task.category_id}
                                >
                                    <option value="" disabled>
                                        Choose a category
                                    </option>
                                    {
                                        categories?.map(category => (
                                            <option 
                                                key={category.id}
                                                value={category.id}
                                            >
                                                { category.name }
                                            </option>
                                        ))
                                    }
                                </select>
                                { useValidation(formValidationErrors, 'category_id')}
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" 
                                    value={task.done}
                                    checked={task.done}
                                    onChange={() => setTask((prev) => ({...prev, done: !task.done}))} 
                                    id="done" 
                                />
                                <label className="form-check-label" htmlFor="done"> Done </label>
                            </div>
                            <button type="submit" className="btn btn-sm btn-dark">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
