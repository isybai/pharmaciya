import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  task = {};
  tasks = [];
  isLoading = true;
  isEditing = false;

  addTaskForm: FormGroup;
  name = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  belongTo = new FormControl('', Validators.required);
  plan = new FormControl('', Validators.required);

  constructor(private taskService: TaskService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getTasks();
    this.addTaskForm = this.formBuilder.group({
      name: this.name,
      type: this.type,
      belongTo: this.belongTo,
      plan: this.plan
    });
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

}
