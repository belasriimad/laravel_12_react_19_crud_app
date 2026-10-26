import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderBy } from '../../../redux/slices/taskSlice'

export default function OrderFilter() {
    const { orderBy } = useSelector(state => state.task)
    const dispatch = useDispatch()

    const handleOrderBy = (column, direction) => {
        dispatch(setOrderBy({column, direction}))
    }

    return (
        <div className="col-md-6">
            <div className="card my-2">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h4>
                        Order by
                    </h4>
                    {
                        orderBy !== null && <button 
                            className="btn btn-sm btn-warning"
                            onClick={() => dispatch(setOrderBy(null))}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    }
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div>
                            <button 
                                className={`btn btn-sm btn-dark mx-1 mb-1 ${orderBy && orderBy.column === 'id' && orderBy.direction === 'asc' ? 'bg-danger' : ''}`}
                                onClick={() => handleOrderBy('id', 'asc')} 
                            >
                                <i className="bi bi-arrow-up"></i>
                            </button>
                            <span className="fw-bold mx-2">
                                ID
                            </span>
                            <button 
                                className={`btn btn-sm btn-dark mx-1 mb-1 ${orderBy && orderBy.column === 'id' && orderBy.direction === 'desc' ? 'bg-danger' : ''}`}
                                onClick={() => handleOrderBy('id', 'desc')} 
                            >
                                <i className="bi bi-arrow-down"></i>
                            </button>
                        </div>
                        <div>
                            <button 
                                className={`btn btn-sm btn-dark mx-1 mb-1 ${orderBy && orderBy.column === 'title' && orderBy.direction === 'asc' ? 'bg-danger' : ''}`}
                                onClick={() => handleOrderBy('title', 'asc')} 
                            >
                                <i className="bi bi-arrow-up"></i>
                            </button>
                            <span className="fw-bold mx-2">
                                Title
                            </span>
                            <button 
                                className={`btn btn-sm btn-dark mx-1 mb-1 ${orderBy && orderBy.column === 'title' && orderBy.direction === 'desc' ? 'bg-danger' : ''}`}
                                onClick={() => handleOrderBy('title', 'desc')} 
                            >
                                <i className="bi bi-arrow-down"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
