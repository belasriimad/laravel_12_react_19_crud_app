import React from 'react'
import useCategories from '../../custom/useCategories'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../../../redux/slices/taskSlice'

export default function CategoriesFilter() {
    const { categoryId } = useSelector(state => state.task)
    const categories = useCategories()
    const dispatch = useDispatch()

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header bg-white">
                        <h4 className="mt-2">
                            Categories
                        </h4>
                    </div>
                    <div className="card-body">
                        <button 
                            className="btn btn-sm btn-secondary mx-1 mb-1"
                            onClick={() => dispatch(setCategoryId(null))}
                            hidden={!categoryId}
                        >
                            All
                        </button>
                        {
                            categories?.map(category => (
                                <button className={`btn btn-sm btn-secondary mx-1 mb-1 ${categoryId === category.id ? 'bg-danger' : ''}`}
                                    key={category.id}
                                    onClick={() => dispatch(setCategoryId(category.id))}
                                >
                                    { category.name }
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
