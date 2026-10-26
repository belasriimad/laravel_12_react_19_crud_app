<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\TaskResource;
use App\Http\Requests\AddTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResource
    {
        $tasks = $request->user()->tasks()->with('category')->paginate(1);
        return TaskResource::collection($tasks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddTaskRequest $request): JsonResponse
    {
        //
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $task = Task::create($data);
        return response()->json([
            'task' => TaskResource::make($task),
            'message' => 'Your task has been added.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Task $task): JsonResource
    {
        //
        
        if($this->checkIfUserOwnsTask($request, $task->id)) {
            return TaskResource::make($task);
        }else {
            return abort(404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
        return abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        //
        if($this->checkIfUserOwnsTask($request, $task->id)) {
            $data = $request->validated();
            $data['done'] = $request->done;

            $task->update($data);

            return response()->json([
                'task' => TaskResource::make($task),
                'message' => 'Your task has been updated.'
            ]);
        }else {
            return abort(404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Task $task): JsonResponse
    {
        //
        if($this->checkIfUserOwnsTask($request, $task->id)) {
            $task->delete();
            return response()->json([
                'task' => TaskResource::make($task),
                'message' => 'Your task has been deleted.'
            ]);
        }else {
            return abort(404);
        }
    }

    /**
     * Filter tasks by a given category
     *
     * @param Category $category
     * @return JsonResource
     */
    public function filterTaskByCategory(Request $request, Category $category): JsonResource
    {
        $tasks = $request->user()->tasks()
            ->where('category_id', $category->id)
            ->with('category')->paginate(1);
        return TaskResource::collection($tasks);
    }

    /**
     * Order tasks by id or title
     *
     * @param Category $category
     * @return JsonResource
     */
    public function orderTasksByColumn(Request $request, $column, $direction): JsonResource
    {
        $tasks = $request->user()->tasks()->with('category')->orderBy($column, $direction)->paginate(10);
        return TaskResource::collection($tasks);
    }

    /**
     * Search for tasks by term
     *
     * @param [type] $searchTerm
     * @return JsonResource
     */
    public function findTaskByTerm(Request $request, $searchTerm): JsonResource
    {
        $tasks = $request->user()->tasks()->with('category')
                    ->where('title','like','%'.$searchTerm.'%')
                    ->orWhere('body','like','%'.$searchTerm.'%')
                    ->paginate(10);
        return TaskResource::collection($tasks);
    }

    /**
     * Check if the user owns a task
     *
     * @param [type] $taskId
     */
    private function checkIfUserOwnsTask($request, $taskId) :?Task
    {
        return $request->user()->tasks()->find($taskId); 
    }
}
