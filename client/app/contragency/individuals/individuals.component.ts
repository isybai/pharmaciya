import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { IndividualService } from '../../services/individual.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.css']
})
export class IndividualsComponent implements OnInit {
  individual = {};
  individuals = [];
  isLoading = true;
  isEditing = false;

  addIndividualForm: FormGroup;
  name = new FormControl('', Validators.required);
  sur = new FormControl('', Validators.required);
  dob = new FormControl('', Validators.required);
  tel = new FormControl('', Validators.required);

  constructor(private individualService: IndividualService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) {}

  ngOnInit() {
    this.getIndividuals();
    this.addIndividualForm = this.formBuilder.group({
      name: this.name,
      sur: this.sur,
      dob: this.dob,
      tel: this.tel
    });

  }

  getIndividuals() {
    this.individualService.getIndividuals().subscribe(
      data => this.individuals = data,
      error => console.log(error),
      () => this.isLoading = false

    );
  }

  addIndividual() {
    this.individualService.addIndividual(this.addIndividualForm.value).subscribe(
      res => {
        const newIndividual = res.json();
        this.individuals.push(newIndividual);
        this.addIndividualForm.reset();
        this.toast.setMessage('Врач успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(individual) {
    this.isEditing = true;
    this.individual = individual;
  }

  cancelEditing() {
    this.isEditing = false;
    this.individual = {};
    this.toast.setMessage('Редактирование врача отменена.', 'warning');
    // reload the individuals to reset the editing
    this.getIndividuals();
  }

  editIndividual(individual) {
    this.individualService.editIndividual(individual).subscribe(
      res => {
        this.isEditing = false;
        this.individual = individual;
        this.toast.setMessage('Врач успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteIndividual(individual) {
    if (window.confirm('Вы уверенны что хотите удалить этого варча?')) {
      this.individualService.deleteIndividual(individual).subscribe(
        res => {
          const pos = this.individuals.map(elem => elem._id).indexOf(individual._id);
          this.individuals.splice(pos, 1);
          this.toast.setMessage('Врач успешно удален.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
