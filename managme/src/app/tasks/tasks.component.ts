import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../projects/project.model';
import { Subscription } from 'rxjs';
import { BoardService } from '../projects/board.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, OnDestroy{
  projects: Project[] = [];
  sub: Subscription = new Subscription();
  
  constructor(public boardService: BoardService) {}

  ngOnInit() {
    this.sub = this.boardService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onStoryClick(): void {
    console.log('Story clicked');
  }

}
