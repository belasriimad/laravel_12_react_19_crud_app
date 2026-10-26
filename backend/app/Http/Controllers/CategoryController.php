<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryController extends Controller
{
    /**
     * Get all the categories
     *
     * @return JsonResource
     */
    public function index(): JsonResource
    {
        $categories = Category::has('tasks')->get();
        return CategoryResource::collection($categories);
    }
}
