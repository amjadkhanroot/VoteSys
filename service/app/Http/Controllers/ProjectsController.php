<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectsController extends Controller
{
    public function update(Request $request) {
        DB::table('projects')
            ->where('name', $request->get('name'))
            ->increment('score');
    }
    public function fetch(){
        $projects = Project::all();
        $projects = json_encode($projects);
        return $projects;
    }
}
