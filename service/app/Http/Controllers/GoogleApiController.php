<?php

namespace App\Http\Controllers;

use App\Project;
use App\Score;
use Illuminate\Http\Request;
use Google_Client;
use Google_Service_Drive;
use Google_Service_Sheets;
use League\Csv\Reader;
use Google_Service_Sheets_ValueRange;
use Illuminate\Support\Facades\DB;

class GoogleApiController extends Controller
{
    public function index()
    {
        $client = $this->createClient();
        $driveService = new Google_Service_Drive($client);


        // Set File ID and get the contents of your Google Sheet
        $fileID = '1p6jf-AQFQOldN3mjis6oqawmUb7RWjlsQ8SSnhWbAZQ';
        $response = $driveService->files->export($fileID, 'text/csv', array(
            'alt' => 'media'));
        $content = $response->getBody()->getContents();

        // Create CSV from String
        $csv = Reader::createFromString($content, 'r');
        $csv->setHeaderOffset(0);
        $records = $csv->getRecords();

        // Create an Empty Array and Loop through the Records
        $projectsData = array();
        foreach ($records as $value) {
            $projectsData[] = $value;
        }

        //store everything taken from googlesheet into db
        $this->store($projectsData);

        $projectsJson = json_encode($projectsData);
        return $projectsJson;
    }

    //store everything taken from googlesheet into db
    public function store($projects)
    {
        $scores = Project::select('score')->get();
        if (count($scores) != 0) {
            Project::truncate();
            foreach ($projects as $p) {
                $project = new Project();
                $project->name = $p['name'];
                $project->description = $p['description'];
                $project->type = $p['type'];
                $project->picture = $p['pic'];
                $project->score = 0;
                $project->save();
            }
        }
    }

    //update googlesheet with the body of the massage
    public function update()
    {
        //creat the client and the service
        $client = $this->createClient();
        $service = new Google_Service_Sheets($client);

        //give the id of the google sheet
        $googleSheetID = '1p6jf-AQFQOldN3mjis6oqawmUb7RWjlsQ8SSnhWbAZQ';

        //give the range of the cells of the google sheet with the values to change
        $range = "A1:B1";
        $values = [
            ["a", "a"]
        ];

        //setup the values inside the google api request then sends it
        $body = new Google_Service_Sheets_ValueRange([
            'values' => $values
        ]);
        $params = [
            'valueInputOption' => 'RAW'
        ];
        $result = $service->spreadsheets_values->update(
            $googleSheetID,
            $range,
            $body,
            $params
        );
    }

    // setup client of google api
    public function createClient()
    {
        $client = new Google_Client();
        putenv('GOOGLE_APPLICATION_CREDENTIALS=votesystem-244108-c4c571b62789.json');
        $client->useApplicationDefaultCredentials();
        $client->addScope(Google_Service_Drive::DRIVE);
        return $client;
    }
}
