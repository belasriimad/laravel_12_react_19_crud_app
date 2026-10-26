import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../../../redux/slices/taskSlice'

export default function SearchFilter() {
    const { searchTerm } = useSelector(state => state.task)
    const dispatch = useDispatch()

    return (
        <div className="col-md-6">
            <div className="card my-2">
                <div className="card-header bg-white d-flex justify-content-between">
                    <h4>
                        Search for Tasks
                    </h4>
                    {
                        searchTerm !== '' && <button 
                            className="btn btn-sm btn-warning"
                            onClick={() => dispatch(setSearchTerm(''))}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    }
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <input
                            type="search"
                            className="form-control"
                            name="searchTerm"
                            id="searchTerm"
                            aria-describedby="helpId"
                            placeholder="Start typing..."
                            value={searchTerm}
                            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                        />
                    </div>
                </div>
            </div>
        </div> 
    )
}
