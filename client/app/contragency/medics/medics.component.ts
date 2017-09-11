import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { MedicService } from '../../services/medic.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit {

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
