import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardService } from '../../../projects/board.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
constructor(
  public dialogRef: MatDialogRef<TaskDialogComponent>,
  private ps: BoardService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {}

onNoClick(): void {
  this.dialogRef.close();
}

//handle deletion

}
