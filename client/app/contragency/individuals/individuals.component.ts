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

  isDataAvailable = false;
  displayedColumns = ['name', 'dob', 'tel', 'action'];
  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }
  dataSource: ExampleDataSource | null;

  addIndividualForm: FormGroup;
  name = new FormControl('', Validators.required);
  dob = new FormControl('', Validators.required);
  tel = new FormControl('', Validators.required);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private individualService: IndividualService, private cdRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }
  placeIndividuals() {
    this.individualService.getIndividuals().subscribe(rcgitems => {
      this.dataChange.next(rcgitems);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
    });
  }

  ngOnInit() {
    this.placeIndividuals();
    this.getIndividuals();
    this.addIndividualForm = this.formBuilder.group({
      name: this.name,
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
    this.ngOnInit();
  }
  enableEditing(individual) {
    this.isEditing = true;
    this.individual = individual;
  }

  cancelEditing() {
    this.isEditing = false;
    this.individual = {};
    this.toast.setMessage('Редактирование физ.лица отменена.', 'warning');
    this.getIndividuals();
  }

  editIndividual(individual) {
    this.individualService.editIndividual(individual).subscribe(
      res => {
        this.isEditing = false;
        this.individual = individual;
        this.toast.setMessage('Физ.лицо успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteIndividual(individual) {
    if (window.confirm('Вы уверенны что хотите удалить физ.лицо?')) {
      this.individualService.deleteIndividual(individual).subscribe(
        res => {
          const pos = this.individuals.map(elem => elem._id).indexOf(individual._id);
          this.individuals.splice(pos, 1);
          this.toast.setMessage('Физ.лицо успешно удален.', 'success');
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
  dob: string;
  tel: string;
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }

  filteredData: ChangeData[] = [];
  renderedData: ChangeData[] = [];

  constructor(private rcgcomponent: IndividualsComponent,
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
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
