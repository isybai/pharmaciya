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

import { CoworkerService } from '../services/coworker.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-coworkers',
  templateUrl: './coworkers.component.html',
  styleUrls: ['./coworkers.component.css']
})
export class CoworkersComponent implements OnInit {

  companies = [
    {value: 'ОАО “Фармация”', viewValue: 'ОАО “Фармация”'},
    {value: 'Фармация-плюс', viewValue: 'Фармация-плюс'},
    {value: 'АПТЕКА № 156', viewValue: 'АПТЕКА № 156'},
    {value: 'Бронс-строй', viewValue: 'Бронс-строй'},
    {value: 'Экспофарм', viewValue: 'Экспофарм'},
    {value: 'Форвард СТ', viewValue: 'Форвард СТ'},
    {value: 'Бимакс компани', viewValue: 'Бимакс компани'}
    ];
  coworker = {};
  coworkers = [];
  isLoading = true;
  isEditing = false;

  isDataAvailable = false;
  displayedColumns = ['name', 'workPlace', 'position', 'dob', 'tel', 'adress', 'action'];
  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }
  dataSource: ExampleDataSource | null;

  addCoworkerForm: FormGroup;
  name = new FormControl('', Validators.required);
  workPlace = new FormControl('', Validators.required);
  tel = new FormControl('', Validators.required);
  position = new FormControl('', Validators.required);
  dob = new FormControl('', Validators.required);
  adress = new FormControl('', Validators.required);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private coworkerService: CoworkerService, private cdRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }
  placeCoworkers() {
    this.coworkerService.getCoworkers().subscribe(rcgitems => {
      this.dataChange.next(rcgitems);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
    });
  }

  ngOnInit() {
    this.placeCoworkers();
    this.getCoworkers();
    this.addCoworkerForm = this.formBuilder.group({
      name: this.name,
      workPlace: this.workPlace,
      tel: this.tel,
      position: this.position,
      dob: this.dob,
      adress: this.adress,
    });
  }

  getCoworkers() {
    this.coworkerService.getCoworkers().subscribe(
      data => this.coworkers = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCoworker() {
    this.coworkerService.addCoworker(this.addCoworkerForm.value).subscribe(
      res => {
        const newCoworker = res.json();
        this.coworkers.push(newCoworker);
        this.addCoworkerForm.reset();
        this.toast.setMessage('сотрудник успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
    this.ngOnInit();
  }
  enableEditing(coworker) {
    this.isEditing = true;
    this.coworker = coworker;
  }

  cancelEditing() {
    this.isEditing = false;
    this.coworker = {};
    this.toast.setMessage('Редактирование сотрудника отменена.', 'warning');
    this.getCoworkers();
  }

  editCoworker(coworker) {
    this.coworkerService.editCoworker(coworker).subscribe(
      res => {
        this.isEditing = false;
        this.coworker = coworker;
        this.toast.setMessage('сотрудник успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCoworker(coworker) {
    if (window.confirm('Вы уверенны что хотите удалить физ.лицо?')) {
      this.coworkerService.deleteCoworker(coworker).subscribe(
        res => {
          const pos = this.coworkers.map(elem => elem._id).indexOf(coworker._id);
          this.coworkers.splice(pos, 1);
          this.toast.setMessage('сотрудник успешно удален.', 'success');
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
    workPlace: string;
    tel: string;
    position: string;
    dob: string;
    adress: string;
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }

  filteredData: ChangeData[] = [];
  renderedData: ChangeData[] = [];

  constructor(private rcgcomponent: CoworkersComponent,
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
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'dob': [propertyA, propertyB] = [a.dob, b.dob]; break;
        case 'tel': [propertyA, propertyB] = [a.tel, b.tel]; break;
        case 'adress': [propertyA, propertyB] = [a.adress, b.adress]; break;
        case 'position': [propertyA, propertyB] = [a.position, b.position]; break;
        case 'workPlace': [propertyA, propertyB] = [a.workPlace, b.workPlace]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
