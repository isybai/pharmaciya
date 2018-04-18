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

import { SaleService } from '../../services/sale.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  sale: any = {};
  sales = [];
  isLoading = true;
  isEditing = false;

  isDataAvailable = false;
  displayedColumns = ['name', 'unit', 'price', 'madeBy', 'expireDate', 'contain', 'action'];
  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }
  dataSource: ExampleDataSource | null;

  addSaleForm: FormGroup;
  name = new FormControl('', Validators.required);
  unit = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  contain = new FormControl('', Validators.required);
  madeBy = new FormControl('', Validators.required);
  expireDate = new FormControl('', Validators.required);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private saleService: SaleService, private cdRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }
  placeSales() {
    this.saleService.getSales().subscribe(rcgitems => {
      this.dataChange.next(rcgitems);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
    });
  }

  ngOnInit() {
    this.placeSales();
    this.getSales();
    this.addSaleForm = this.formBuilder.group({
      name: this.name,
      unit: this.unit,
      price: this.price,
      madeBy: this.madeBy,
      expireDate: this.expireDate,
      contain: this.contain,
    });
  }

  getSales() {
    this.saleService.getSales().subscribe(
      data => this.sales = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addSale() {
    this.saleService.addSale(this.addSaleForm.value).subscribe(
      res => {
        const newSale = res.json();
        this.sales.push(newSale);
        this.addSaleForm.reset();
        this.toast.setMessage('продукт успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
    this.ngOnInit();
  }
  enableEditing(sale) {
    this.isEditing = true;
    this.sale = sale;
  }

  cancelEditing() {
    this.isEditing = false;
    this.sale = {};
    this.toast.setMessage('Редактирование продукта отменена.', 'warning');
    this.getSales();
  }

  editSale(sale) {
    this.saleService.editSale(sale).subscribe(
      res => {
        this.isEditing = false;
        this.sale = sale;
        this.toast.setMessage('продукт успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteSale(sale) {
    if (window.confirm('Вы уверенны что хотите удалить физ.лицо?')) {
      this.saleService.deleteSale(sale).subscribe(
        res => {
          const pos = this.sales.map(elem => elem._id).indexOf(sale._id);
          this.sales.splice(pos, 1);
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
    contain: string;
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }

  filteredData: ChangeData[] = [];
  renderedData: ChangeData[] = [];

  constructor(private rcgcomponent: SalesComponent,
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
        case 'contain' : [propertyA, propertyB] = [a.contain, b.contain]; break;
        case 'madeBy' : [propertyA, propertyB] = [a.madeBy, b.madeBy]; break;
        case 'expireDate' : [propertyA, propertyB] = [a.expireDate, b.expireDate]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
