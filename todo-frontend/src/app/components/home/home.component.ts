import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from 'src/app/services/home.service';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Todo } from '../common/Todo';
import { DeleteTodoComponent } from '../delete-todo/delete-todo.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'isCompleted', 'dateCreated', "actions"];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  //data: PeriodicElement[] = ELEMENT_DATA;

  completedTodos: Todo[] = [];
  notCompletedTodos: Todo[] = [];

  dataSource1 = new MatTableDataSource<Todo>(this.completedTodos);
  dataSource2 =  new MatTableDataSource<Todo>(this.notCompletedTodos);


  constructor(private _service: HomeService, private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(): void {
    this._service.getTodos().subscribe((data) => {
      console.log(data);
      this.dataSource1.data = data.completed;
      this.dataSource2.data = data.notCompleted;
    }, err => {
      console.log(err);
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddTodoComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTodos();
    })
  }

  openUpdateDialog(todo: Todo, isCompleted: boolean) {
    

    const dialogRef = this.dialog.open(UpdateTodoComponent, {
      data:{
        todo: todo
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTodos();
    })
  }

  openDeleteDialog(todo: Todo) {
    

    const dialogRef = this.dialog.open(DeleteTodoComponent, {
      data:{
        todoId: todo._id
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTodos();
    })
  }
}

