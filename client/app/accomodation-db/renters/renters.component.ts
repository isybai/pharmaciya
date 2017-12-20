import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/observable/of';

import { RenterService } from '../../services/renter.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-renters',
  templateUrl: './renters.component.html',
  styleUrls: ['./renters.component.css']
})
export class RentersComponent implements OnInit {
  renter = {};
  renters = [];
  isLoading = true;
  isEditing = false;

  addRenterForm: FormGroup;
  name = new FormControl('', Validators.required);
  sur = new FormControl('', Validators.required);
  dob = new FormControl('', Validators.required);
  tel = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  liter = new FormControl('', Validators.required);
  square = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  dateFrom = new FormControl('', Validators.required);
  dateUntil = new FormControl('', Validators.required);
  priceSum = new FormControl('', Validators.required);
  deposite = new FormControl('', Validators.required);
  tbo = new FormControl('', Validators.required);
  electric = new FormControl('', Validators.required);
  telNet = new FormControl('', Validators.required);
  sumAll = new FormControl('', Validators.required);
  factPay = new FormControl('', Validators.required);
  datePay = new FormControl('', Validators.required);
  typePay = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  note = new FormControl(null);
  docNumber = new FormControl(null);
  docSide = new FormControl(null);
  docSidePos = new FormControl(null);
  docSideTel = new FormControl(null);
  rentersProduct = new FormControl(null);

  constructor(private renterService: RenterService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) {}

  ngOnInit() {
    this.getRenters();
    this.addRenterForm = this.formBuilder.group({
     name: this.name,
		 dob: this.dob,
		 tel: this.tel,
		 type: this.type,
		 liter: this.liter,
		 square: this.square,
		 price: this.price,
		 dateFrom: this.dateFrom,
		 dateUntil: this.dateUntil,
		 priceSum: this.priceSum,
		 deposite: this.deposite,
		 tbo: this.tbo,
		 electric: this.electric,
		 telNet: this.telNet,
		 sumAll: this.sumAll,
		 factPay: this.factPay,
		 datePay: this.datePay,
		 typePay: this.typePay,
		 status: this.status,
		 note: this.note,
		 docNumber: this.docNumber,
		 docSide: this.docSide,
		 docSidePos: this.docSidePos,
     docSideTel: this.docSideTel,
		 rentersProduct: this.rentersProduct,
    });
  }

  getRenters() {
    this.renterService.getRenters().subscribe(
      data => this.renters = data,
      error => console.log(error),
      () => this.isLoading = false

    );
  }

  addRenter() {
    this.renterService.addRenter(this.addRenterForm.value).subscribe(
      res => {
        const newRenter = res.json();
        this.renters.push(newRenter);
        this.addRenterForm.reset();
        this.toast.setMessage('Арендатор успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(renter) {
    this.isEditing = true;
    this.renter = renter;
  }

  cancelEditing() {
    this.isEditing = false;
    this.renter = {};
    this.toast.setMessage('Редактирование арендатора отменена.', 'warning');
    // reload the renters to reset the editing
    this.getRenters();
  }

  editRenter(renter) {
    this.renterService.editRenter(renter).subscribe(
      res => {
        this.isEditing = false;
        this.renter = renter;
        this.toast.setMessage('Арендатор успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteRenter(renter) {
    if (window.confirm('Вы уверенны что хотите удалить этого арендатора?')) {
      this.renterService.deleteRenter(renter).subscribe(
        res => {
          const pos = this.renters.map(elem => elem._id).indexOf(renter._id);
          this.renters.splice(pos, 1);
          this.toast.setMessage('Арендатор успешно удален.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}


