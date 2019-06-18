import { Component, OnInit } from '@angular/core';
import { IProject } from './Project';
import { ProjectService } from './service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  voteN: number = 0;
  errorMessage: string;
  projects: IProject[] = [];
  rating: number;
  starWidth: number;

    ngOnChanges(): void {
        this.starWidth = this.voteN * 75 / 5;
      }


  constructor(private projectService: ProjectService ) { 
    this.projectService.getProject().subscribe(project => {
      console.log(project);
      
      });
  }

  ngOnInit() {
    this.projectService.getProject().subscribe(
      project => {
        (this.projects = project)
        console.log(this.projects);
      },
      error => (this.errorMessage = <any>error)
    );
  }

  vote(): void {
    console.log('vote');
    this.voteN++;
    console.log(this.voteN);
  }

}
