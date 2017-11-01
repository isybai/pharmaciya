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
import { MedicService } from '../../services/medic.service';
import { LpuService } from '../../services/lpu.service';
import { ToastComponent } from '../../shared/toast/toast.component';


@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})

export class MedicsComponent implements OnInit {

  specs = [
    {value: 'Акушер', viewValue: 'Акушер'},
    {value: 'Аллерголог', viewValue: 'Аллерголог'},
    {value: 'Андролог', viewValue: 'Андролог'},
    {value: 'Анестезиолог', viewValue: 'Анестезиолог'},
    {value: 'Венеролог', viewValue: 'Венеролог'},
    {value: 'Вертебролог', viewValue: 'Вертебролог'},
    {value: 'Врач ЛФ', viewValue: 'Врач ЛФ'},
    {value: 'Гастроэнтеролог', viewValue: 'Гастроэнтеролог'},
    {value: 'Гематолог', viewValue: 'Гематолог'},
    {value: 'Генетик', viewValue: 'Генетик'},
    {value: 'Гепатолог', viewValue: 'Гепатолог'},
    {value: 'Гинеколог', viewValue: 'Гинеколог'},
    {value: 'Гинеколог-эндокринолог', viewValue: 'Гинеколог-эндокринолог'},
    {value: 'Гирудотерапевт', viewValue: 'Гирудотерапевт'},
    {value: 'Гомеопат', viewValue: 'Гомеопат'},
    {value: 'Дерматолог', viewValue: 'Дерматолог'},
    {value: 'Диетолог', viewValue: 'Диетолог'},
    {value: 'Иммунолог', viewValue: 'Иммунолог'},
    {value: 'Инфекционист', viewValue: 'Инфекционист'},
    {value: 'Кардиолог', viewValue: 'Кардиолог'},
    {value: 'Кардиохирург', viewValue: 'Кардиохирург'},
    {value: 'Кинезиолог', viewValue: 'Кинезиолог'},
    {value: 'Колопроктолог', viewValue: 'Колопроктолог'},
    {value: 'Косметолог', viewValue: 'Косметолог'},
    {value: 'Логопед', viewValue: 'Логопед'},
    {value: 'Маммолог', viewValue: 'Маммолог'},
    {value: 'Мануальный терапевт', viewValue: 'Мануальный терапевт'},
    {value: 'Массажист', viewValue: 'Массажист'},
    {value: 'Миколог', viewValue: 'Миколог'},
    {value: 'Нарколог', viewValue: 'Нарколог'},
    {value: 'Невролог', viewValue: 'Невролог'},
    {value: 'Нейрохирург', viewValue: 'Нейрохирург'},
    {value: 'Неонатолог', viewValue: 'Неонатолог'},
    {value: 'Нефролог', viewValue: 'Нефролог'},
    {value: 'Окулист', viewValue: 'Окулист'},
    {value: 'Онкогинеколог', viewValue: 'Онкогинеколог'},
    {value: 'Онкодерматолог', viewValue: 'Онкодерматолог'},
    {value: 'Онколог', viewValue: 'Онколог'},
    {value: 'Ортопед', viewValue: 'Ортопед'},
    {value: 'Остеопат', viewValue: 'Остеопат'},
    {value: 'Отоларинголог', viewValue: 'Отоларинголог'},
    {value: 'Педиатр', viewValue: 'Педиатр'},
    {value: 'Пластический хирург', viewValue: 'Пластический хирург'},
    {value: 'Подолог', viewValue: 'Подолог'},
    {value: 'Проктолог', viewValue: 'Проктолог'},
    {value: 'Психиатр', viewValue: 'Психиатр'},
    {value: 'Психолог', viewValue: 'Психолог'},
    {value: 'Психотерапевт', viewValue: 'Психотерапевт'},
    {value: 'Пульмонолог', viewValue: 'Пульмонолог'},
    {value: 'Реабилитолог', viewValue: 'Реабилитолог'},
    {value: 'Ревматолог', viewValue: 'Ревматолог'},
    {value: 'Рентгенолог', viewValue: 'Рентгенолог'},
    {value: 'Репродуктолог', viewValue: 'Репродуктолог'},
    {value: 'Рефлексотерапевт', viewValue: 'Рефлексотерапевт'},
    {value: 'Сексолог', viewValue: 'Сексолог'},
    {value: 'Семейный врач', viewValue: 'Семейный врач'},
    {value: 'Сомнолог', viewValue: 'Сомнолог'},
    {value: 'Сосудистый хирург', viewValue: 'Сосудистый хирург'},
    {value: 'Специалист по клет технологиям', viewValue: 'Специалист по клет технологиям'},
    {value: 'Спортивный врач', viewValue: 'Спортивный врач'},
    {value: 'Стоматолог', viewValue: 'Стоматолог'},
    {value: 'Стоматолог-гигиенис', viewValue: 'Стоматолог-гигиенис'},
    {value: 'Стоматолог-имплантоло', viewValue: 'Стоматолог-имплантоло'},
    {value: 'Стоматолог-ортодон', viewValue: 'Стоматолог-ортодон'},
    {value: 'Стоматолог-ортопе', viewValue: 'Стоматолог-ортопе'},
    {value: 'Стоматолог-пародонтоло', viewValue: 'Стоматолог-пародонтоло'},
    {value: 'Стоматолог-терапев', viewValue: 'Стоматолог-терапев'},
    {value: 'Стоматолог-хирур', viewValue: 'Стоматолог-хирур'},
    {value: 'Сурдолог', viewValue: 'Сурдолог'},
    {value: 'Терапевт', viewValue: 'Терапевт'},
    {value: 'Травматолог', viewValue: 'Травматолог'},
    {value: 'Трихолог', viewValue: 'Трихолог'},
    {value: 'УЗИ-специалист', viewValue: 'УЗИ-специалист'},
    {value: 'Уролог', viewValue: 'Уролог'},
    {value: 'Физиотерапевт', viewValue: 'Физиотерапевт'},
    {value: 'Флеболог', viewValue: 'Флеболог'},
    {value: 'Фтизиатр', viewValue: 'Фтизиатр'},
    {value: 'Хирург', viewValue: 'Хирург'},
    {value: 'Эндокринолог', viewValue: 'Эндокринолог'},
    {value: 'Эндоскопист', viewValue: 'Эндоскопист'},
    {value: 'Эпилептологи', viewValue: 'Эпилептологи'},
  ];

  medic = {};
  medics = [];
  lpu = {};
  lpus = [];
  isLoading = true;

  isDataAvailable = false;
  displayedColumns = ['name', 'spec', 'hos', 'type', 'local', 'workTime', 'tel', 'action'];
  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  get data(): ChangeData[] { return this.dataChange.value; }
  dataSource: ExampleDataSource | null;

  addMedicForm: FormGroup;
  name = new FormControl('', Validators.required);
  spec = new FormControl(null, Validators.required);
  hos = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  local = new FormControl('', Validators.required);
  workTime = new FormControl('', Validators.required);
  tel = new FormControl('', Validators.required);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private medicService: MedicService, private cdRef: ChangeDetectorRef,
              private lpuService: LpuService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }
  placeMedics() {
    this.medicService.getMedics().subscribe(rcgitems => {
      this.dataChange.next(rcgitems);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
    });
  }

  ngOnInit() {
    this.placeMedics();
    this.getMedics();
    this.getLpus();
    this.addMedicForm = this.formBuilder.group({
      name: this.name,
      spec: this.spec,
      hos: this.hos,
      type: this.type,
      local: this.local,
      workTime: this.workTime,
      tel: this.tel
    });
  }

  getMedics() {
    this.medicService.getMedics().subscribe(
      data => this.medics = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getLpus() {
    this.lpuService.getLpus().subscribe(
      data => this.lpus = data,
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
        this.toast.setMessage('Врач успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
    this.ngOnInit();
  }
  enableEditing(medic) {
    this.medic = medic;
  }

  cancelEditing() {
    this.medic = {};
    this.toast.setMessage('Редактирование врача отменена.', 'warning');
    this.getMedics();
  }

  editMedic(medic) {
    this.medicService.editMedic(medic).subscribe(
      res => {
        this.medic = medic;
        this.toast.setMessage('Врач успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteMedic(medic) {
    if (window.confirm('Вы уверенны что хотите удалить этого варча?')) {
      this.medicService.deleteMedic(medic).subscribe(
        res => {
          const pos = this.medics.map(elem => elem._id).indexOf(medic._id);
          this.medics.splice(pos, 1);
          this.toast.setMessage('Врач успешно удален.', 'success');
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
  spec: string;
  hos: string;
  type: string;
  local: string;
  workTime: string;
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

  constructor(private rcgcomponent: MedicsComponent,
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
        case 'spec': [propertyA, propertyB] = [a.spec, b.spec]; break;
        case 'hos': [propertyA, propertyB] = [a.hos, b.hos]; break;
        case 'type': [propertyA, propertyB] = [a.type, b.type]; break;
        case 'local': [propertyA, propertyB] = [a.local, b.local]; break;
        case 'workTime': [propertyA, propertyB] = [a.workTime, b.workTime]; break;
        case 'tel': [propertyA, propertyB] = [a.tel, b.tel]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
