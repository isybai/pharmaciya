
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { LpuService } from '../../services/lpu.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-lpu',
  templateUrl: './lpu.component.html',
  styleUrls: ['./lpu.component.css']
})

export class LpuComponent implements OnInit {

  lpu = {};
  lpus = [];
  isLoading = true;
  isEditing = false;

  addLpuForm: FormGroup;
  name = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  tel = new FormControl('', Validators.required);


  constructor(private lpuService: LpuService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) {}

  ngOnInit() {
    this.getLpus();
    this.addLpuForm = this.formBuilder.group({
      name: this.name,
      address: this.address,
      type: this.type,
      tel: this.tel
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
  }

  enableEditing(lpu) {
    this.isEditing = true;
    this.lpu = lpu;
  }

  cancelEditing() {
    this.isEditing = false;
    this.lpu = {};
    this.toast.setMessage('Редактирование лпу отменена.', 'warning');
    // reload the lpus to reset the editing
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
    if (window.confirm('Вы уверенны что хотите удалить этого варча?')) {
      this.lpuService.deleteLpu(lpu).subscribe(
        res => {
          const pos = this.lpus.map(elem => elem._id).indexOf(lpu._id);
          this.lpus.splice(pos, 1);
          this.toast.setMessage('ЛПУ успешно удален.', 'success');
        },
        error => console.log(error)
      );
    }
  }
  types = [
    {value: 'Ц.С.М.', viewValue: 'Ц.С.М.'},
    {value: 'Мед. центр', viewValue: 'Мед. центр'},
    {value: 'Больница', viewValue: 'Больница'},    
    ];
}

/*
  displayedColumns = ['name', 'address', 'tel'];
  dataSource  = new CsmData();
  dataSourceM  = new MedCentrData();
  dataSourceH  = new HospitalData();
}

export interface Csm {
  name: string;
  address: string;
  tel: string;
}
export interface MedCentr {
  name: string;
  address: string;
  tel: string;
}
export interface Hospital {
  name: string;
  address: string;
  tel: string;
}
const data: Csm[] = [
  { name: 'ЦСМ №1',  address: "ул.Ю.Фучика, 15",            tel: '64-45-40'},
  { name: 'ЦСМ №2',  address: "ул.3-я Линия, 25",           tel: ''},
  { name: 'ЦСМ №3',  address: "ул. Логвиненко, 30/1",       tel: '32-52-32'},
  { name: 'ЦСМ №4',  address: "ул. Ибраимова, 181",         tel: '43–40–07'},
  { name: 'ЦСМ №5',  address: "ул. Кольбаева, 42",          tel: '63–51–23'},
  { name: 'ЦСМ №6',  address: "ул. Жукеева-Пудовкина, 75",  tel: '57–02–91'},
  { name: 'ЦСМ №7',  address: "ул. Т.Молдо, 3/1",           tel: '66–20–44'},
  { name: 'ЦСМ №8',  address: "пр. Чуй, 40",                tel: '43–39–07'},
  { name: 'ЦСМ №9',  address: "ул.Курманжан-Датка, 109а",   tel: '36–88–30'},
  { name: 'ЦСМ №10', address: "ул. Боконбаева, 61",         tel: '38–78–14'},
  { name: 'ЦСМ №11', address: "ул.Киевская , 154",          tel: '31–10–60'},
  { name: 'ЦСМ №12', address: "ул.Кривоносова, 206б",       tel: '21–17–32'},
  { name: 'ЦСМ №13', address: "ул.Токтогула, 250",          tel: '65–73–88'},
  { name: 'ЦСМ №14', address: "ул.Наманганская, 28",        tel: '67–66–11'},
  { name: 'ЦСМ №15', address: "720060, 6 мкр., 1",          tel: '42–69–62'},
  { name: 'ЦСМ №16', address: "720055, ул.Панфилова, 4",    tel: '54–13–09'},
  { name: 'ЦСМ №17', address: "720016, с. Чон-Арык, ул.Семетей, 152", tel: '55–11–06'},
  { name: 'ЦСМ №18', address: "ул. Тыныстанова, 1",            tel: '56–82–33'},
  { name: 'ЦСМ №19', address: "720073,   5 мкр., 16/1",     tel: '57–13–67'},
  { name: 'Центр медико–консультативных услуг и спортивной медицины', address: 'пр. Манаса, 41', tel: '31–88–63'},
];

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
