import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from 'src/app/services/home.service';
import { Todo } from '../common/Todo';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent implements OnInit {

  todo: Todo;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private service: HomeService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<UpdateTodoComponent>) {
    this.todo = data.todo;
  }

  ngOnInit(): void {
  }

  onClickUpdate(): void {
    this.service.updateTodo(this.todo).subscribe((data) => {
      console.log(data);
      this.snackBar.open("Todo Updated successfully.", "", {
        verticalPosition: "top",
        duration: 2000
      });
      this.dialogRef.close();
    }, err => {
      console.log(err);
    })
  }

}
