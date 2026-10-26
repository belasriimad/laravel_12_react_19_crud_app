import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDebounce } from 'use-debounce'
import { Link } from 'react-router'
import Spinner from '../layouts/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getConfig } from '../../config/api'
import CategoriesFilter from './filters/CategoriesFilter'
import OrderFilter from './filters/OrderFilter'
import SearchFilter from './filters/SearchFilter'
import { setPage } from '../../redux/slices/taskSlice'

export default function TasksList() {
    const { token } = useSelector(state => state.user)
    const { categoryId, orderBy, searchTerm, page} = useSelector(state => state.task)
    const [tasks, setTasks] = useState([])
    const startIndex = (tasks?.meta?.current_page - 1) * tasks?.meta?.per_page
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true)
            try {
                if(categoryId) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/category/${categoryId}/tasks?page=${page}`, getConfig(token))
                    setTasks(response.data)
                }else if(orderBy) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/order/${orderBy.column}/${orderBy.direction}/tasks?page=${page}`, getConfig(token))
                    setTasks(response.data)
                }else if(debouncedSearchTerm) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/search/${searchTerm}/tasks?page=${page}`, getConfig(token))
                    setTasks(response.data)
                }else {
                    const response = await axios.get(`http://127.0.0.1:8000/api/tasks?page=${page}`, getConfig(token))
                    setTasks(response.data)
                }
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong while fetching tasks try again later.')
            } finally {
                setLoading(false)
            }
        }
        fetchTasks()
    }, [page, categoryId, orderBy, debouncedSearchTerm])

    const checkIfTaskIsDone = (task) => (
        task.done ? 
            <span className="badge bg-success">
                Done
            </span>
        :
            <span className="badge bg-secondary">
                Processing...
            </span>
    )

    const renderPaginationLinks = () => (
        <ul className="pagination">
            {
                tasks?.meta?.links?.map((link, index) => (
                    <li className="page-item"
                        key={index}
                    >
                        <a href="#" 
                            className={`page-link ${link.active ? 'active' : ''}`}
                            onClick={() => moveToNextPreviousPage(link.url)}   
                            hidden={!link.url} 
                        >
                            { link.label.replace('&laquo;', '').replace('&raquo;', '') }
                        </a>
                    </li>
                ))
            }
        </ul>
    )

    const moveToNextPreviousPage = (link) => {
        const url = new URL(link)
        dispatch(setPage(url.searchParams.get('page')))
    }

    const deleteTask = async (taskId) => {
        if(confirm('Are you sure?')) {
            setLoading(true)
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`, getConfig(token))
                const taskDeletedId = response.data.task.id
                setTasks(prev => ({
                    ...prev,
                    data: prev.data.filter(task => task.id !== taskDeletedId)
                }))
                toast.success(response.data.message)
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong while deleting the task try again later.')
            } finally {
                setLoading(false)
            }
        }
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <div className="row my-5">
            <div className="col-md-12">
                <CategoriesFilter />
                <div className="row">
                    <OrderFilter />
                    <SearchFilter />
                </div>
                <div className="card">
                    <div className="card-body">
                        {
                            tasks?.data?.length > 0 ?
                                <>
                                    <div
                                        className="table-responsive"
                                    >
                                        <table
                                            className="table table-bordered"
                                        >
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Body</th>
                                                    <th scope="col">Done</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Created</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    tasks?.data?.map((task, index) => (
                                                        <tr key={index}>
                                                            <td scope="row">
                                                                { startIndex + index + 1 }
                                                            </td>
                                                            <td>
                                                                { task.title }
                                                            </td>
                                                            <td>
                                                                { task.body }
                                                            </td>
                                                            <td>
                                                                { checkIfTaskIsDone(task) }
                                                            </td>
                                                            <td>
                                                                { task.category.name }
                                                            </td>
                                                            <td>
                                                                { task.created_at }
                                                            </td>
                                                            <td className="d-flex justify-content-between">
                                                                <Link to={`/task/edit/${task.id}`} className="btn btn-sm btn-warning">
                                                                    <i className="bi bi-pencil"></i>
                                                                </Link>
                                                                <button onClick={() => deleteTask(task.id)} className="btn btn-sm btn-danger">
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <div className="my-2 d-flex justify-content-center">
                                            { renderPaginationLinks() }
                                        </div>
                                    </div>
                                </>
                            :
                                <div className="row mt-3">
                                    <div className="col-md-6 mx-auto">
                                        <div className="alert alert-info">
                                            No tasks found!
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
