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
            ->update(['score' => $request->get('score')]);
    }
}
