<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\validation\ValidationException;

class AdminController extends Controller
{
    /**
     * Display the admin login page
     */
    public function index(): View 
    {
        $tasks = Task::latest()->get();
        return view('admin.dashboard', compact('tasks'));
    }

    /**
     * Display the admin login page
     */
    public function login(): View | RedirectResponse
    {
        if(auth()->guard('admin')->check()) {
            return back();
        }
        return view('admin.login');
    }

    /**
     * Log in the admin
     */
    public function auth(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email|max:100',
            'password' => 'required|min:6|max:255'
        ]);

        if(auth()->guard('admin')->attempt([
            'email' => $request->email,
            'password' => $request->password,
        ])) {
            $request->session()->regenerate();
            return to_route('admin.index');
        }else {
            throw ValidationException::withMessages([
                'email' => 'These credentials do not match any of our records.'
            ]);
        }
    }

    /**
     * Log out the admin
     */
    public function logout(): RedirectResponse
    {
        auth()->guard('admin')->logout();
        return to_route('admin.login');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): RedirectResponse
    {
        //
        $task = Task::findOrFail($request->task_id);
        $task->delete();
        return back()->with('success', 'Task removed successfully.');
    }
}
