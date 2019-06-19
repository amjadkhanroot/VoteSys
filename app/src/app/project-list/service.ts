import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { IProject } from './Project';

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  private getProjectAPI = "http://localhost:4200/api/fetch";
  private putProjectAPI = "http://localhost:4200/api/update";

  constructor(public http: HttpClient){

  }

  getProject(): Observable<IProject[]> {
    console.log("getProject Service");
    return this.http.get<IProject[]>(this.getProjectAPI).pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  updateProject(project: IProject): Observable<IProject[]>{
    return this.http.put<IProject[]>(this.putProjectAPI, project)
    .pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
}



  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${
        err.message
      }`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
