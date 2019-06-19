import { Component, OnInit, OnChanges } from '@angular/core';
import { IProject } from './Project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit , OnChanges{
   voteN: number = 0;
   clicked: boolean = false;

  projects: IProject[] = [];
  starWidth: number;
    ngOnChanges(): void {
        this.starWidth = this.voteN * 75 / 5;
      }

    getStars(v: number) {
      v = this.voteN;
       return this.starWidth = v* 75 / 15;
      }

  constructor() { }

  ngOnInit() {
  }

  vote(): void {
    this.voteN++;
    console.log(this.voteN);
  }

}
