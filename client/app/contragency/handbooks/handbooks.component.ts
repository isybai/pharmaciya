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

import { HandbookService } from '../../services/handbook.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-handbooks',
  templateUrl: './handbooks.component.html',
  styleUrls: ['./handbooks.component.scss']
})
export class HandbooksComponent implements OnInit {


  handbook = {};
  handbooks = [];
  isLoading = true;
  isEditing = false;

  isDataAvailable = false;
  displayedColumns = ['head', 'name', 'website', 'contactPz', 'contactEz', 'contactTz', 'contactPs', 'contactEs', 'contactTs', 'action'];

  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }
  dataSource: ExampleDataSource | null;

  addHandbookForm: FormGroup;
  head = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  website = new FormControl('', Validators.required);
  contactPz = new FormControl('', Validators.required);
  contactEz = new FormControl('', Validators.required);
  contactTz = new FormControl('', Validators.required);
  contactPs = new FormControl('', Validators.required);
  contactEs = new FormControl('', Validators.required);
  contactTs = new FormControl('', Validators.required);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private handbookService: HandbookService, private cdRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }
  placeHandbooks() {
    this.handbookService.getHandbooks().subscribe(rcgitems => {
      this.dataChange.next(rcgitems);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
    });
  }

  ngOnInit() {
    this.placeHandbooks();
    this.getHandbooks();
    this.addHandbookForm = this.formBuilder.group({
      name: this.name,
      head: this.head,
      website: this.website,
      contactPz: this.contactPz,
      contactEz: this.contactEz,
      contactTz: this.contactTz,
      contactPs: this.contactPs,
      contactEs: this.contactEs,
      contactTs: this.contactTs,
    });
  }

  getHandbooks() {
    this.handbookService.getHandbooks().subscribe(
      data => this.handbooks = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addHandbook() {
    this.handbookService.addHandbook(this.addHandbookForm.value).subscribe(
      res => {
        const newHandbook = res.json();
        this.handbooks.push(newHandbook);
        this.addHandbookForm.reset();
        this.toast.setMessage('Элемент справочника успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
    this.ngOnInit();
  }
  enableEditing(handbook) {
    this.isEditing = true;
    this.handbook = handbook;
  }

  cancelEditing() {
    this.isEditing = false;
    this.handbook = {};
    this.toast.setMessage('Редактирование элемента справочника отменена.', 'warning');
    this.getHandbooks();
  }

  editHandbook(handbook) {
    this.handbookService.editHandbook(handbook).subscribe(
      res => {
        this.isEditing = false;
        this.handbook = handbook;
        this.toast.setMessage('Элемент справочника успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteHandbook(handbook) {
    if (window.confirm('Вы уверенны что хотите удалить?')) {
      this.handbookService.deleteHandbook(handbook).subscribe(
        res => {
          const pos = this.handbooks.map(elem => elem._id).indexOf(handbook._id);
          this.handbooks.splice(pos, 1);
          this.toast.setMessage('Элемент справочника успешно удален.', 'success');
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
  head: string;
  website: string;
  contactPz: string;
  contactEz: string;
  contactTz: string;
  contactPs: string;
  contactEs: string;
  contactTs: string;
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }

  filteredData: ChangeData[] = [];
  renderedData: ChangeData[] = [];

  constructor(private rcgcomponent: HandbooksComponent,
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
        case 'website': [propertyA, propertyB] = [a.website, b.website]; break;
        case 'contactPz': [propertyA, propertyB] = [a.contactPz, b.contactPz]; break;
        case 'contactEz': [propertyA, propertyB] = [a.contactEz, b.contactEz]; break;
        case 'contactTz': [propertyA, propertyB] = [a.contactTz, b.contactTz]; break;
        case 'contactPs': [propertyA, propertyB] = [a.contactPs, b.contactPs]; break;
        case 'contactEs': [propertyA, propertyB] = [a.contactEs, b.contactEs]; break;
        case 'contactTs': [propertyA, propertyB] = [a.contactTs, b.contactTs]; break;
        case 'head': [propertyA, propertyB] = [a.head, b.head]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
