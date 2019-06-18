import { Component, OnInit } from '@angular/core';
import { IProject } from './Project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  voteN: number = 0;
  imgUrl: string = "img/NoVote2.png";

  projects: IProject[] = [];
  rating: number;
  starWidth: number;

    ngOnChanges(): void {
        this.starWidth = this.voteN * 75 / 5;
      }


  constructor() { }

  ngOnInit() {
  }

  vote(): void {
    console.log('vote');
    this.voteN++;
    console.log(this.voteN);
    this.imgUrl = "img/Voted.png";
  }

}
