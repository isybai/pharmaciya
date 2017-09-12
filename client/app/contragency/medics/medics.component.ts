import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MedicService } from '../../services/medic.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit {
  displayedColumns = ['name', 'sur', 'dob', 'spec', 'hos', 'type', 'local', 'workTime', 'tel'];
  dataSource = new ExampleDataSource();

  medic = {};
  medics = [];
  isLoading = true;
  isEditing = false;

  addMedicForm: FormGroup;
  name = new FormControl('', Validators.required);
  sur = new FormControl('', Validators.required);
  dob = new FormControl('', Validators.required);


  constructor(private medicService: MedicService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getMedics();
    this.addMedicForm = this.formBuilder.group({
      name: this.name,
      sur: this.sur,
      dob: this.dob,
    });
  }

  getMedics() {
    this.medicService.getMedics().subscribe(
      data => this.medics = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addMedic() {
    this.medicService.addMedic(this.addMedicForm.value).subscribe(
      res => {
        const newMedic = res.json();
        this.medics.push(newMedic);
        this.addMedicForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(medic) {
    this.isEditing = true;
    this.medic = medic;
  }

  cancelEditing() {
    this.isEditing = false;
    this.medic = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the medics to reset the editing
    this.getMedics();
  }

  editMedic(medic) {
    this.medicService.editMedic(medic).subscribe(
      res => {
        this.isEditing = false;
        this.medic = medic;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteMedic(medic) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.medicService.deleteMedic(medic).subscribe(
        res => {
          const pos = this.medics.map(elem => elem._id).indexOf(medic._id);
          this.medics.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}

export interface Element {
  name: string;
  sur: string;
  dob: string;
  spec: string;
  hos: string;
  type: string;
  local: string;
  workTime: string;
  tel: number; 
}

const data: Element[] = [
  {name:'Alena', sur: 'Volkova', dob: '12.1.85', spec:'Акушер', hos: 'Hydrogen', type: 'Клиника', local: 'Первомайский район', workTime:'8:00 - 20:00', tel: 552007324},
  {name:'Olga', sur: 'Volkova', dob: '11.2.88', spec:'Андролог', hos: 'Hydrogen', type: 'Клиника', local: 'Свердловский район',  workTime:'8:00 - 20:00', tel: 552007324}
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data);
  }

  disconnect() {}
}