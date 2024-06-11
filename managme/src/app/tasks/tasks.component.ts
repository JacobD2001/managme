import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project, Task } from '../projects/project.model';
import { Subscription } from 'rxjs';
import { BoardService } from '../projects/board.service';
import { title } from 'process';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  sub: Subscription = new Subscription();

  constructor(public boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit() {
    this.sub = this.boardService.getProjects().subscribe((projects) => {
      this.projects = projects;
      console.log(this.projects);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openTaskDialog(task?: Task, idx?: number): void {
    const newTask = { title: 'New Task', description: 'New Task Description' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, projectId: this.projects[0].id, idx }
        : { task: newTask, isNew: true },
    });
  }
}
