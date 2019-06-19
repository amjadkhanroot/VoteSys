import { Component, OnInit, OnChanges } from '@angular/core';
import { IProject } from './Project';
import { ProjectService } from './service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  voteN: number = 0;
  clicked: boolean = false;
  errorMessage: string;
  projects: IProject[] = [];
  starWidth: number;
    ngOnChanges(): void {
        this.starWidth = this.voteN * 75 / 5;
      }

    getStars(v: number) {
      v = this.voteN;
       return this.starWidth = v* 75 / 15;
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
    this.voteN++;
    console.log(this.voteN);
  }

}
