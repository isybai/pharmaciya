import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { Http } from '@angular/http';

import { RpoService } from '../../services/rpo.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-rpo',
  templateUrl: './rpo.component.html',
  styleUrls: ['./rpo.component.css']
})
export class RpoComponent implements OnInit {

  rpo: any = {};
  rpos = [];
  isLoading = true;
  isEditing = false;

  isDataAvailable = false;
  displayedColumns = ['name', 'unit', 'price', 'madeBy', 'expireDate', 'action'];
  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }
  dataSource: ExampleDataSource | null;

  addRpoForm: FormGroup;
  name = new FormControl('', Validators.required);
  unit = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  madeBy = new FormControl('', Validators.required);
  expireDate = new FormControl('', Validators.required);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private rpoService: RpoService, private cdRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }
  placeRpos() {
    this.rpoService.getRpos().subscribe(rcgitems => {
      this.dataChange.next(rcgitems);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
    });
  }

  ngOnInit() {
    this.placeRpos();
    this.getRpos();
    this.addRpoForm = this.formBuilder.group({
      name: this.name,
      unit: this.unit,
      price: this.price,
      madeBy: this.madeBy,
      expireDate: this.expireDate,
    });
  }

  getRpos() {
    this.rpoService.getRpos().subscribe(
      data => this.rpos = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addRpo() {
    this.rpoService.addRpo(this.addRpoForm.value).subscribe(
      res => {
        const newRpo = res.json();
        this.rpos.push(newRpo);
        this.addRpoForm.reset();
        this.toast.setMessage('продукт успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
    this.ngOnInit();
  }
  enableEditing(rpo) {
    this.isEditing = true;
    this.rpo = rpo;
  }

  cancelEditing() {
    this.isEditing = false;
    this.rpo = {};
    this.toast.setMessage('Редактирование продукта отменена.', 'warning');
    this.getRpos();
  }

  editRpo(rpo) {
    this.rpoService.editRpo(rpo).subscribe(
      res => {
        this.isEditing = false;
        this.rpo = rpo;
        this.toast.setMessage('продукт успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteRpo(rpo) {
    if (window.confirm('Вы уверенны что хотите удалить физ.лицо?')) {
      this.rpoService.deleteRpo(rpo).subscribe(
        res => {
          const pos = this.rpos.map(elem => elem._id).indexOf(rpo._id);
          this.rpos.splice(pos, 1);
          this.toast.setMessage('продукт успешно удален.', 'success');
        },
        error => console.log(error)
      );
      this.ngOnInit();
    }
  }

  initSource() {
    this.dataSource = new ExampleDataSource(this, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
    this.cdRef.detectChanges();
  }
}

export interface ChangeData {
    name: string;
    unit: string;
    price: string;
    madeBy: string;
    expireDate: string;
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }

  filteredData: ChangeData[] = [];
  renderedData: ChangeData[] = [];

  constructor(private rcgcomponent: RpoComponent,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ChangeData[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.rcgcomponent.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.rcgcomponent.data.slice().filter((item: ChangeData) => {
        const searchStr = (item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() { }

  /** Returns a sorted copy of the database data. */
  sortData(data: ChangeData[]): ChangeData[] {
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name' : [propertyA, propertyB] = [a.name, b.name]; break;
        case 'unit' : [propertyA, propertyB] = [a.unit, b.unit]; break;
        case 'price' : [propertyA, propertyB] = [a.price, b.price]; break;
        case 'madeBy' : [propertyA, propertyB] = [a.madeBy, b.madeBy]; break;
        case 'expireDate' : [propertyA, propertyB] = [a.expireDate, b.expireDate]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
