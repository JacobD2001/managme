import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../project.model';
import { BoardService } from '../board.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../dialogs/project-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  sub: Subscription = new Subscription();

  constructor(public boardService: BoardService, public dialog: MatDialog) {}

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

  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.createProject({
          title: result,
          priority: this.projects.length,
        });
      }
    });
  }
}
