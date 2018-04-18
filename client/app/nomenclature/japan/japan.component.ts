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

import { JapanService } from '../../services/japan.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-japan',
  templateUrl: './japan.component.html',
  styleUrls: ['./japan.component.css']
})
export class JapanComponent implements OnInit {

  japan: any = {};
  japans = [];
  isLoading = true;
  isEditing = false;

  isDataAvailable = false;
  displayedColumns = ['name', 'purpose', 'dose', 'action'];
  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }
  dataSource: ExampleDataSource | null;

  addJapanForm: FormGroup;
  name = new FormControl('', Validators.required);
  purpose = new FormControl('', Validators.required);
  dose = new FormControl('', Validators.required);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private japanService: JapanService, private cdRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }
  placeJapans() {
    this.japanService.getJapans().subscribe(rcgitems => {
      this.dataChange.next(rcgitems);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
    });
  }

  ngOnInit() {
    this.placeJapans();
    this.getJapans();
    this.addJapanForm = this.formBuilder.group({
      name: this.name,
      purpose: this.purpose,
      dose: this.dose,
    });
  }

  getJapans() {
    this.japanService.getJapans().subscribe(
      data => this.japans = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addJapan() {
    this.japanService.addJapan(this.addJapanForm.value).subscribe(
      res => {
        const newJapan = res.json();
        this.japans.push(newJapan);
        this.addJapanForm.reset();
        this.toast.setMessage('продукт успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
    this.ngOnInit();
  }
  enableEditing(japan) {
    this.isEditing = true;
    this.japan = japan;
  }

  cancelEditing() {
    this.isEditing = false;
    this.japan = {};
    this.toast.setMessage('Редактирование продукта отменена.', 'warning');
    this.getJapans();
  }

  editJapan(japan) {
    this.japanService.editJapan(japan).subscribe(
      res => {
        this.isEditing = false;
        this.japan = japan;
        this.toast.setMessage('продукт успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteJapan(japan) {
    if (window.confirm('Вы уверенны что хотите удалить физ.лицо?')) {
      this.japanService.deleteJapan(japan).subscribe(
        res => {
          const pos = this.japans.map(elem => elem._id).indexOf(japan._id);
          this.japans.splice(pos, 1);
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
    purpose: string;
    dose: string;
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }

  filteredData: ChangeData[] = [];
  renderedData: ChangeData[] = [];

  constructor(private rcgcomponent: JapanComponent,
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
        case 'purpose': [propertyA, propertyB] = [a.purpose, b.purpose]; break;
        case 'dose': [propertyA, propertyB] = [a.dose, b.dose]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
