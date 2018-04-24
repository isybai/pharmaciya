import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/observable/of';

import { TenderService } from '../services/tender.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {
  tender: any = {};
  tenders: any [];
  isLoading = true;
  isEditing = false;

  addTenderForm: FormGroup;
  docN = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  lot = new FormControl('', Validators.required);
  med = new FormControl('', Validators.required);
  sum = new FormControl('', Validators.required);
  result = new FormControl('', Validators.required);

  constructor(private tenderService: TenderService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) {}

  ngOnInit() {
    this.getTenders();
    this.addTenderForm = this.formBuilder.group({
     docN: this.docN,
     name: this.name,
     lot: this.lot,
     med: this.med,
     sum: this.sum,
     result: this.result,
    });
  }

  getTenders() {
    this.tenderService.getTenders().subscribe(
      data => this.tenders = data,
      error => console.log(error),
      () => this.isLoading = false

    );
  }

  addTender() {
    this.tenderService.addTender(this.addTenderForm.value).subscribe(
      res => {
        const newTender = res.json();
        this.tenders.push(newTender);
        this.addTenderForm.reset();
        this.toast.setMessage('Тендер успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(tender) {
    this.isEditing = true;
    this.tender = tender;
  }

  cancelEditing() {
    this.isEditing = false;
    this.tender = {};
    this.toast.setMessage('Редактирование тендер отменена.', 'warning');
    // reload the tenders to reset the editing
    this.getTenders();
  }

  editTender(tender) {
    this.tenderService.editTender(tender).subscribe(
      res => {
        this.isEditing = false;
        this.tender = tender;
        this.toast.setMessage('Тендер успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteTender(tender) {
    if (window.confirm('Вы уверенны что хотите удалить этого тендер?')) {
      this.tenderService.deleteTender(tender).subscribe(
        res => {
          const pos = this.tenders.map(elem => elem._id).indexOf(tender._id);
          this.tenders.splice(pos, 1);
          this.toast.setMessage('Тендер успешно удален.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}


