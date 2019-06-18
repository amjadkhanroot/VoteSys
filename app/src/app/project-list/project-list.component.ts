import { Component, OnInit } from '@angular/core';
import { IProject } from './Project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: IProject[] = [];

  constructor() { }

  ngOnInit() {
  }

}
