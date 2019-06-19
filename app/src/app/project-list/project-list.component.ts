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
    this.getProjects();
  }


  getProjects(){
    this.projectService.getProject().subscribe(
      project => {
        (this.projects = project)
        console.log(this.projects);
      },
      error => (this.errorMessage = <any>error)
    );
  }

  updateProjects(project: IProject){
    console.log('updateProject');
    this.vote();
    // let s = parseInt(project.score);
    //console.log(s);
    //this.s = s + this.voteN;
    this.projectService.updateProject(project).subscribe(p => {
      for(let i = 0;i < this.projects.length;i++){
          if(this.projects[i].name.toLocaleLowerCase().indexOf(project.name)  !== -1){
            this.projects.splice(i,1);
          }
      }



      this.projects.push(project);
      this.ngOnInit();
      console.log('updated!');
      console.log(this.projects);
  });
  }

  vote() {
    console.log('vote');
    this.voteN++;
    console.log(this.voteN);
  }

}
