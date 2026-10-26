@extends('admin.layouts.app')

@section('title')
    Dashboard   
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-4">
            <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px;">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg class="bi pe-none me-2" width="40" height="32" aria-hidden="true">
                        <use xlink:href="#bootstrap"></use>
                    </svg>
                    <span class="fs-4">Dashboard</span> 
                </a>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <a href="{{ route('admin.index') }}" class="nav-link {{ request()->routeIs('admin.index') ? 'active' : ''}}" aria-current="page">
                            <svg class="bi pe-none me-2" width="16" height="16" aria-hidden="true">
                            <use xlink:href="#home"></use>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link text-white">
                            <svg class="bi pe-none me-2" width="16" height="16" aria-hidden="true">
                            <use xlink:href="#speedometer2"></use>
                            </svg>
                            Categories
                        </a>
                    </li>
                </ul>
                <hr>
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"> <strong>  Hello {{ auth()->guard('admin')->name }}</strong> </a> 
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li>
                            <form id="adminLogout" action="{{route('admin.logout')}}" method="post">@csrf</form>
                            <a class="dropdown-item" href="#"
                                onclick="document.getElementById('adminLogout').submit()"
                            >Sign out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>    
        <div class="col-md-8">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Body</th>
                        <th scope="col">Done</th>
                        <th scope="col">Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($tasks as $key => $task)
                        <tr>
                            <th scope="row">
                                {{ $key += 1 }}
                            </th>
                            <td>
                                {{ $task->title }}
                            </td>
                            <td>
                                {{ $task->body }}
                            </td>
                            <td>
                                @if ($task->done)
                                    <span class="badge bg-success">
                                        Done
                                    </span>
                                @else 
                                    <span class="badge bg-primary">
                                        Pending...
                                    </span>
                                @endif
                            </td>
                            <td>
                                {{ $task->category->name }}
                            </td>
                            <td>
                                <a href="#" 
                                    onClick="if(confirm('Are u sure?')) document.getElementById({{ $task->id }}).submit();"
                                    class="btn btn-sm btn-danger">
                                    Delete
                                </a>
                                <form id="{{ $task->id }}" action="{{ route('tasks.delete')}}" method="post">
                                    @csrf
                                    <input type="hidden" name="task_id" value="{{ $task->id }}">
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>   
@endsection