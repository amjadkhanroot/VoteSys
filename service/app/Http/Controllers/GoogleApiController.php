<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Google_Client;
use Google_Service_Drive;
use Google_Service_Sheets;
use League\Csv\Reader;
use Google_Service_Sheets_BatchUpdateSpreadsheetRequest;
use Google_Service_Sheets_Request;

class GoogleApiController extends Controller
{
    public function index()
    {
        // setup client and driver of google api
        $client = new Google_Client();
        putenv('GOOGLE_APPLICATION_CREDENTIALS=votesystem-244108-c4c571b62789.json');
        $client->useApplicationDefaultCredentials();
        $client->addScope(Google_Service_Drive::DRIVE);
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
        $newarray = array();
        foreach ($records as $value) {
            $newarray[] = $value;
        }

        $this->store($newarray);

        $jsonProjects = json_encode($newarray);
        return $jsonProjects;
    }

    public function store($projects)
    {
        foreach ($projects as $p) {
            $project = new Project();
            $project->name = $p['name'];
            $project->description = $p['description'];
            $project->type = $p['type'];
            $project->picture = $p['pic'];
            $project->score = $p['score'];
            $project->save();
        }
    }
    public function update() {
        $client = new Google_Client();
        putenv('GOOGLE_APPLICATION_CREDENTIALS=votesystem-244108-c4c571b62789.json');
        $client->useApplicationDefaultCredentials();
        $client->addScope(Google_Service_Drive::DRIVE);
        $service = new Google_Service_Sheets($client);

        $fileID = '1p6jf-AQFQOldN3mjis6oqawmUb7RWjlsQ8SSnhWbAZQ';

        $range = "A1:B1";
        $values = [
            ["ahmed", "Alghamdi"]
        ];
        $body = new \Google_Service_Sheets_ValueRange([
            'values'=> $values
        ]);
        $params = [
            'valueInputOption' => 'RAW'
        ];
        $result = $service->spreadsheets_values->update(
            $fileID,
            $range,
            $body,
            $params
        );
    }
}
