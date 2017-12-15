import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


  user = {};
  users = [];
  task = {};
  tasks = [];
  todays:string;

  isLoading = true;
  isEditing = false;
  types = [
    {value: 'Высокий', viewValue: 'Высокий'},
    {value: 'Нормальный', viewValue: 'Нормальный'},
    {value: 'Низкий', viewValue: 'Низкий'},
  ];
  statuses = [
    {value: 'на расмотрении', viewValue: 'на расмотрении'},
    {value: 'в процессе', viewValue: 'в процессе'},
    {value: 'выполнен', viewValue: 'выполнен'},
    {value: 'не выполнен', viewValue: 'не выполнен'},
  ];
  addTaskForm: FormGroup;
  name = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  belongTo = new FormControl('', Validators.required);
  plan = new FormControl('', Validators.required);
  until = new FormControl('', Validators.required);
  status = new FormControl('на расмотрении');

  constructor(private userService: UserService,
              private taskService: TaskService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public auth: AuthService) {
this.todaySday();
               }

  ngOnInit() {
    this.getUsers();
    this.getTasks();
    this.addTaskForm = this.formBuilder.group({
      name: this.name,
      type: this.type,
      belongTo: this.belongTo,
      plan: this.plan,
      until: this.until,
      status: this.status
    });
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false

    );
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      data => this.tasks = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addTask() {
    this.taskService.addTask(this.addTaskForm.value).subscribe(
      res => {
        const newTask = res.json();
        this.tasks.push(newTask);
        this.addTaskForm.reset();
        this.toast.setMessage('Новый план создан успешно.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(task) {
    this.isEditing = true;
    this.task = task;
  }

  cancelEditing() {
    this.isEditing = false;
    this.task = {};
    this.toast.setMessage('Редактирование плана отменено!', 'warning');
    // reload the tasks to reset the editing
    this.getTasks();
  }

  editTask(task) {
    this.taskService.editTask(task).subscribe(
      res => {
        this.isEditing = false;
        this.task = task;
        this.toast.setMessage('План отредактирован!', 'success');
      },
      error => console.log(error)
    );
  }

  deleteTask(task) {
    if (window.confirm('Вы хотите удалить план?')) {
      this.taskService.deleteTask(task).subscribe(
        res => {
          const pos = this.tasks.map(elem => elem._id).indexOf(task._id);
          this.tasks.splice(pos, 1);
          this.toast.setMessage('План удален!', 'success');
        },
        error => console.log(error)
      );
    }
  }

  todaySday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = 0 + dd;
    }
    if (mm < 10) {
        mm = 0 + mm;
    }
    this.todays = yyyy+ '-' + mm + '-' + dd;
  }
}
