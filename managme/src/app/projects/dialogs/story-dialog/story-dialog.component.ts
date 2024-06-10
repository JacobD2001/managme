import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../../board.service';

@Component({
  selector: 'app-story-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.isNew ? 'Add New Story' : 'Edit Story' }}</h1>
    <button mat-button>
        <mat-icon>menu</mat-icon>
        See Tasks For This Story
      </button>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <textarea
          placeholder="Story description"
          matInput
          [(ngModel)]="data.story.description"
        ></textarea>
      </mat-form-field>
      <br />
      <!-- Conditionally disable status dropdown -->
      <mat-form-field>
        <mat-label>Status</mat-label>
        <mat-select [(ngModel)]="data.story.status" [disabled]="data.isNew">
          <mat-option *ngIf="data.isNew" value="todo">Todo</mat-option>
          <mat-option *ngIf="!data.isNew" value="todo">Todo</mat-option>
          <mat-option *ngIf="!data.isNew" value="doing">Doing</mat-option>
          <mat-option *ngIf="!data.isNew" value="done">Done</mat-option>
        </mat-select>
      </mat-form-field>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.story.label"
      >
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt.color">
          <mat-icon [ngClass]="opt.color">{{ opt.icon }}</mat-icon>
          {{ opt.color }}
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
        {{ data.isNew ? 'Add Story' : 'Update Story' }}
      </button>
      <app-delete-button
        *ngIf="!data.isNew"
        (delete)="handleStoryDelete()"
      ></app-delete-button>
    </div>
  `,
  styles: `.content {
    overflow: hidden;
    height: auto;
    padding: 20px;
    width: 100%;
}

mat-form-field {
    width: 100%;
  }

textarea { display: block; width: 100%; }

.green { color: #36e9b6; }
.yellow { color: #ffcf44; }
.grey { color: #505451; }`,
})
export class StoryDialogComponent {
  labelOptions = [
    { color: 'grey', icon: 'lens' },
    { color: 'yellow', icon: 'check_circle' },
    { color: 'green', icon: 'star' },
  ];
  constructor(
    public dialogRef: MatDialogRef<StoryDialogComponent>,
    private ps: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleStoryDelete() {
    this.ps.removeStory(this.data.projectId, this.data.story);
  }
}
