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

import 'rxjs/add/observable/of';

import { LpuService } from '../../services/lpu.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-lpu',
  templateUrl: './lpu.component.html',
  styleUrls: ['./lpu.component.css']
})

export class LpuComponent implements OnInit {

  types = [
    {value: 'Ц.С.М.', viewValue: 'Ц.С.М.'},
    {value: 'Мед. центр', viewValue: 'Мед. центр'},
    {value: 'Больница', viewValue: 'Больница'},
  ];
  localAreas = [
    {value: 'Первомайский район.', viewValue: 'Первомайский район.'},
    {value: 'Свердловский район', viewValue: 'Свердловский район'},
    {value: 'Октябрьский район', viewValue: 'Октябрьский район'},
    {value: 'Ленинский район', viewValue: 'Ленинский район'},
  ];

  lpu = {};
  lpus = [];
  isLoading = true;
  isEditing = false;

  isDataAvailable = false;
  displayedColumns = ['name', 'localArea', 'address', 'workTime', 'tel', 'director', 'directorPhone', 'action'];
  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }
  dataSource: ExampleDataSource | null;

  addLpuForm: FormGroup;
  name = new FormControl('', Validators.required);
  localArea = new FormControl(null, Validators.required);
  address = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  workTime = new FormControl('', Validators.required);
  tel = new FormControl('', Validators.required);
  director = new FormControl(null);
  directorPhone = new FormControl(null);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private lpuService: LpuService, private cdRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }


  ngOnInit() {
    this.placeLpus();
    this.getLpus();
    this.getLpus();
    this.addLpuForm = this.formBuilder.group({
      name: this.name,
      localArea: this.localArea,
      address: this.address,
      type: this.type,
      workTime: this.workTime,
      tel: this.tel,
      director: this.director,
      directorPhone: this.directorPhone
    });
  }
  placeLpus() {
    this.lpuService.getLpus().subscribe(rcgitems => {
      this.dataChange.next(rcgitems);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
    });
  }
  getLpus() {
    this.lpuService.getLpus().subscribe(
      data => this.lpus = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addLpu() {
    this.lpuService.addLpu(this.addLpuForm.value).subscribe(
      res => {
        const newLpu = res.json();
        this.lpus.push(newLpu);
        this.addLpuForm.reset();
        this.toast.setMessage('ЛПУ успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
    this.ngOnInit();
  }
  enableEditing(lpu) {
    this.isEditing = true;
    this.lpu = lpu;
  }

  cancelEditing() {
    this.isEditing = false;
    this.lpu = {};
    this.toast.setMessage('Редактирование ЛПУ отменена.', 'warning');
    this.getLpus();
  }

  editLpu(lpu) {
    this.lpuService.editLpu(lpu).subscribe(
      res => {
        this.isEditing = false;
        this.lpu = lpu;
        this.toast.setMessage('ЛПУ успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteLpu(lpu) {
    if (window.confirm('Вы уверенны что хотите удалить ЛПУ?')) {
      this.lpuService.deleteLpu(lpu).subscribe(
        res => {
          const pos = this.lpus.map(elem => elem._id).indexOf(lpu._id);
          this.lpus.splice(pos, 1);
          this.toast.setMessage('ЛПУ успешно удалена.', 'success');
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
  localArea: string;
  address: string;
  type: string;
  workTime: string;
  tel: string;
  director: string;
  directorPhone: string;
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }

  filteredData: ChangeData[] = [];
  renderedData: ChangeData[] = [];

  constructor(private rcgcomponent: LpuComponent,
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
        case 'localArea': [propertyA, propertyB] = [a.localArea, b.localArea]; break;
        case 'address': [propertyA, propertyB] = [a.address, b.address]; break;
        case 'workTime': [propertyA, propertyB] = [a.workTime, b.workTime]; break;
        case 'tel': [propertyA, propertyB] = [a.tel, b.tel]; break;
        case 'director': [propertyA, propertyB] = [a.director, b.director]; break;
        case 'directorPhone': [propertyA, propertyB] = [a.directorPhone, b.directorPhone]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

/*

const data: Csm[] = [
db.lpus.insertMany([
  { name: "ЦСМ №1",  type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул.Ю.Фучика, 15",            tel: '64-45-40'},
  { name: "ЦСМ №2",  type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул.3-я Линия, 25",           tel: ''},
  { name: "ЦСМ №3",  type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул. Логвиненко, 30/1",       tel: '32-52-32'},
  { name: "ЦСМ №4",  type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул. Ибраимова, 181",         tel: '43–40–07'},
  { name: "ЦСМ №5",  type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул. Кольбаева, 42",          tel: '63–51–23'},
  { name: "ЦСМ №6",  type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул. Жукеева-Пудовкина, 75",  tel: '57–02–91'},
  { name: "ЦСМ №7",  type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул. Т.Молдо, 3/1",           tel: '66–20–44'},
  { name: "ЦСМ №8",  type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "пр. Чуй, 40",                tel: '43–39–07'},
  { name: "ЦСМ №9",  type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул.Курманжан-Датка, 109а",   tel: '36–88–30'},
  { name: "ЦСМ №10", type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул. Боконбаева, 61",         tel: '38–78–14'},
  { name: "ЦСМ №11", type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул.Киевская , 154",          tel: '31–10–60'},
  { name: "ЦСМ №12", type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул.Кривоносова, 206б",       tel: '21–17–32'},
  { name: "ЦСМ №13", type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул.Токтогула, 250",          tel: '65–73–88'},
  { name: "ЦСМ №14", type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул.Наманганская, 28",        tel: '67–66–11'},
  { name: "ЦСМ №15", type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "720060, 6 мкр., 1",          tel: '42–69–62'},
  { name: "ЦСМ №16", type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "720055, ул.Панфилова, 4",    tel: '54–13–09'},
  { name: "ЦСМ №17", type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "720016, с. Чон-Арык, ул.Семетей, 152", tel: '55–11–06'},
  { name: "ЦСМ №18", type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "ул. Тыныстанова, 1",            tel: '56–82–33'},
  { name: "ЦСМ №19", type: "Ц.С.М.",  director: " ", directorPhone: " ", address: "720073,   5 мкр., 16/1",     tel: '57–13–67'},
]);

const dataTwo: MedCentr[] = [
  { name: '«Green med», медицинский центр                      ',  address: "ул. Ибраимова, 42,",      tel: '62-08-64'},
  { name: '«Медицинский центр доктора Назаралиева»             ',  address: "ул. Фучика, 34",          tel: '65-02-41'},
  { name: '«Медицинский центр лазерных технологий»             ',  address: "ул. Суюмбаева, 14",       tel: '28-59-87'},
  { name: '«Аист», медицинский центр                           ',  address: "ул. Байтик Баатыра, 1/4", tel: '51-19-69'},
  { name: '«Анти-Стресс», медицинский центр                    ',  address: "ул. Ибраимова, 61",       tel: '38-20-95'},
  { name: '«Алмена», медицинский центр                         ',  address: "пр. Чуй, 125,",           tel: '43-75-51'},
  { name: '«Ай-Сулуу», медицинский центр                       ',  address: "пр. Чуй, 202",            tel: '64-62-49'},
  { name: '«Артемида», оздоровительный центр                   ',  address: "ул. Садыкова, 113",       tel: '21-75-39'},
  { name: '«Азия-Лян-Шу», центр китайской медицины             ',  address: "ул. Байтик Баатыра, 1/4", tel: '51-14-94'},
  { name: '«Вселенная красоты», центр медицинской косметологии ',  address: "ул. Московская, 209",     tel: '90-88-84'},
  { name: '«Дент Мастер», медицинский центр                    ',  address: "ул. Киевская, 118",       tel: '90-05-25'},
  { name: '«Аймек», центр восточной медицины                   ',  address: "пр. Чуй, 182",            tel: '39-21-17'},
  { name: '«Бишкек-Бранд», медицинский центр                   ',  address: "ул. Байтик Баатыра, 131", tel: '66-06-39'},
  { name: '«Брак и семья», лечебно-консультационный центр      ',  address: "ул. Тоголока Молодо, 1",  tel: '62-07-80'},
  { name: '«Вольвич», фитоцентр                                ',  address: "ул. Жибек Жолу, 393",     tel: '38-01-54'},
  { name: '«Сана – Форте», медицинский центр                   ',  address: "пр. Манаса, 40",          tel: '61-04-03'},
  { name: '«Эксклюзив», медико-психологический центр           ',  address: "ул. Ахунбаева, 98",       tel: '54-94-46'},
  { name: '«Нуралы», медицинский центр                         ',  address: "ул. Байтик Баатыра199",   tel: '62-39-22'},
  { name: 'Республиканский диагностический центр               ',  address: "ул. Киевская, 27",        tel: '43-54-36'},
  { name: 'Республиканский центр наркологии                    ',  address: "ул. Суеркулова, 1",       tel: '51-04-70'},
];

const dataThree: Hospital[] = [
  { name: 'Городская клиническая больница № 1       ',  address: "ул. Фучика, 15           ", tel: '64-45-09'},
  { name: 'Детская противотуберкулезная больница № 2',  address: "пр. Молодой Гвардии, 71 А", tel: '34-04-18'},
  { name: 'Городская детская больница № 2           ',  address: "ул. Московская, 151      ", tel: '21-37-57'},
  { name: 'Городская противотуберкулезная больница  ',  address: "ул. Элебесова, 211       ", tel: '67-90-08'},
  { name: 'Национальный хирургический центр         ',  address: "ул. 2-я линия, 25        ", tel: '21-03-09'},
  { name: 'Республиканская больница № 2             ',  address: "ул. Киевская, 110        ", tel: '26-35-23'},
  { name: 'Чуйская областная больница               ',  address: "ул. Саратовская, 10      ", tel: '36-71-50'},
  { name: 'Клинический родильный дом № 2            ',  address: "ул. Московская, 225      ", tel: '65-73-38'},
  ];

export class CsmData extends DataSource<any> {
  connect(): Observable<Csm[]> {
    return Observable.of(data);
  }
  disconnect() {}
}
export class MedCentrData extends DataSource<any> {
  connect(): Observable<MedCentr[]> {
    return Observable.of(dataTwo);
  }
  disconnect() {}
}
export class HospitalData extends DataSource<any> {
  connect(): Observable<Hospital[]> {
    return Observable.of(dataThree);
  }
  disconnect() {}
}
*/
