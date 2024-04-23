import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../../board.service';

@Component({
  selector: 'app-story-dialog',
  template: `
    <h1 mat-dialog-title>Story</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <textarea
          placeholder="Story description"
          matInput
          [(ngModel)]="data.story.description"
        ></textarea>
      </mat-form-field>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.story.label"
      >
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt.color">
          <mat-icon [ngClass]="opt.color">{{
            opt.color === 'yellow' ? 'check_circle' : 'lens'
          }}</mat-icon>
          {{ opt.status }}
          <!-- Add this line to display the status text -->
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
    { color: 'grey', status: 'Todo' },
    { color: 'yellow', status: 'Doing' },
    { color: 'green', status: 'Done' },
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
