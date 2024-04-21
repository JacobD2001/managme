import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardService } from '../board.service';
import { MatDialog } from '@angular/material/dialog';
import { Project, Story } from '../project.model';
import { StoryDialogComponent } from '../dialogs/story-dialog/story-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() project!: Project;

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  taskDrop(event: CdkDragDrop<string[]>) {
    if (this.project.stories && this.project.id) {
      moveItemInArray(this.project.stories, event.previousIndex, event.currentIndex);
      this.boardService.updateStory(this.project.id, this.project.stories);
    }
  }

  openDialog(story?: Story, idx?: number): void {
    const newStory = { label: 'purple' };
    const dialogRef = this.dialog.open(StoryDialogComponent, {
      width: '500px',
      data: story
        ? { story: { ...story }, isNew: false, projectId: this.project.id, idx }
        : { story: newStory, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.project.id && this.project.stories) { 
          if (result.isNew) {
            this.boardService.updateStory(this.project.id, [
              ...this.project.stories,
              result.story
            ]);
          } else {
            const update = this.project.stories;
            if (typeof result.idx === 'number' && update) { 
              update.splice(result.idx, 1, result.story);
              this.boardService.updateStory(this.project.id, update); 
            }
          }
        }
      }
    });
  }

  handleDelete() {
    if (this.project.id) {
      this.boardService.deleteProject(this.project.id);
    } else {
      console.error('Project id is undefined');
    }
  }
}
