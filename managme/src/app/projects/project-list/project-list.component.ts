import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../project.model';
import { BoardService } from '../board.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  sub: Subscription = new Subscription();

  constructor(public boardService: BoardService) {}

  ngOnInit() {
    this.sub = this.boardService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
    this.boardService.sortProjects(this.projects);
  }
}
