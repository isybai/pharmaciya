
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import 'rxjs/add/observable/of';

import { DrugstoreService } from '../../services/drugstore.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-drugstores',
  templateUrl: './drugstores.component.html',
  styleUrls: ['./drugstores.component.css']
})

export class DrugstoresComponent implements OnInit {

  drugstore = {};
  drugstores = [];
  isLoading = true;
  isEditing = false;
  isSearching = false;
  searchItem: string;

  addDrugstoreForm: FormGroup;
  name = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  workTime = new FormControl('', Validators.required);
  tel = new FormControl('', Validators.required);


  constructor(private drugstoreService: DrugstoreService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) {}

  ngOnInit() {
    this.getDrugstores();
    this.addDrugstoreForm = this.formBuilder.group({
      name: this.name,
      address: this.address,
      type: this.type,
      workTime: this.workTime,
      tel: this.tel
    });

  }
  search(e) {
    this.searchItem = e.toUpperCase();
    if(e.length === 0 || !e.trim()){
     this.isSearching = false;
    }
    else{
     this.isSearching = true;
    }
  }
  getDrugstores() {
    this.drugstoreService.getDrugstores().subscribe(
      data => this.drugstores = data,
      error => console.log(error),
      () => this.isLoading = false

    );
  }

  addDrugstore() {
    this.drugstoreService.addDrugstore(this.addDrugstoreForm.value).subscribe(
      res => {
        const newDrugstore = res.json();
        this.drugstores.push(newDrugstore);
        this.addDrugstoreForm.reset();
        this.toast.setMessage('Аптека успешно добавленна.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(drugstore) {
    this.isEditing = true;
    this.drugstore = drugstore;
  }

  cancelEditing() {
    this.isEditing = false;
    this.drugstore = {};
    this.toast.setMessage('Редактирование аптеки отменена.', 'warning');
    // reload the drugstores to reset the editing
    this.getDrugstores();
  }

  editDrugstore(drugstore) {
    this.drugstoreService.editDrugstore(drugstore).subscribe(
      res => {
        this.isEditing = false;
        this.drugstore = drugstore;
        this.toast.setMessage('Аптека успешно отредактированна.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteDrugstore(drugstore) {
    if (window.confirm('Вы уверенны что хотите удалить эту аптеку?')) {
      this.drugstoreService.deleteDrugstore(drugstore).subscribe(
        res => {
          const pos = this.drugstores.map(elem => elem._id).indexOf(drugstore._id);
          this.drugstores.splice(pos, 1);
          this.toast.setMessage('Аптека успешно удалена.', 'success');
        },
        error => console.log(error)
      );
    }
  }
  types = [
    {value: 'Категория A', viewValue: 'Категория A'},
    {value: 'Категория B', viewValue: 'Категория B'},
    {value: 'Категория C', viewValue: 'Категория C'},
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



  /*
  displayedColumns = ['name', 'address', 'tel', 'workTime'];
  dataSource  = new AgroupData();
  dataSourceM  = new MedCentrData();
  dataSourceH  = new HospitalData();
}

export interface GroupA {
  name: string;
  address: string;
  tel: string;
  workTime: string;
}
export interface GroupB {
  name: string;
  address: string;
  tel: string;
}
export interface GroupC {
  name: string;
  address: string;
  tel: string;
}
const data: GroupA[] = [
  { name: 'Неман 1',   	 address: "Проспект Манаса, 8",            	 tel: '315 634', workTime: 'круглосуточно'},
  { name: 'Неман 2',   	 address: "ул. Московская, 130",             tel: '625 665', workTime: 'круглосуточно'},
  { name: 'Неман 3',   	 address: "ул. Бейшеналиева, 19",            tel: '657 350', workTime: 'круглосуточно'},
  { name: 'Неман 4',   	 address: "ул. Байтик-Баатыра, 57",          tel: '542 814', workTime: 'круглосуточно'},
  { name: 'Неман 5',   	 address: "ул. Фучика, 18",            		 tel: '654 210', workTime: 'круглосуточно'},
  { name: 'Неман 6',   	 address: "Проспект Чуй, 194",            	 tel: '342 021', workTime: 'круглосуточно'},
  { name: 'Неман 7',   	 address: "ул. Киевская, 38",            	 tel: '680 580', workTime: 'круглосуточно'},
  { name: 'Неман 8',   	 address: "ул. Саратовская, 27",             tel: '367 637', workTime: 'круглосуточно'},
  { name: 'Неман 9',   	 address: "Проспект Чуй, 113",            	 tel: '364 439', workTime: 'круглосуточно'},
  { name: 'Неман 10',    address: "3-микрорайон, дом 24",            tel: '511 945', workTime: 'круглосуточно'},
  { name: 'Неман 13',    address: "ул. 3-линия, 58/1",            	 tel: '218 703', workTime: 'круглосуточно'},
  { name: 'Неман 14',    address: "ул. Ден Сяо Пина, 173",           tel: '883 018', workTime: 'круглосуточно'},
  { name: 'Неман 19',    address: "ул. Ахунбаева, 100",            	 tel: '546 712', workTime: 'круглосуточно'},
  { name: 'Неман 20',    address: "ул. Льва Толстого, 59",           tel: '351 690', workTime: 'круглосуточно'},
  { name: 'Неман 21',    address: "микрорайон Асанбай, 52",          tel: '527 271', workTime: 'круглосуточно'},
  { name: 'Неман 22',    address: "Проспект Чуй, 4а",            	 tel: '360 496', workTime: 'круглосуточно'},
  { name: 'Неман 24',    address: "Проспект Чуй, 125",            	 tel: '437 526', workTime: 'круглосуточно'},
  { name: 'Неман 25',    address: "ул. Тоголок-Молдо, 14",           tel: '663 350', workTime: 'круглосуточно'},
  { name: 'Неман 26',    address: "ул. Ден Сяо Пина, 6/4",           tel: '644 824', workTime: 'круглосуточно'},
  { name: 'Неман 27',    address: "ул. Кольбаева, 36",            	 tel: '635 402', workTime: 'круглосуточно'},
  { name: 'Неман 28',    address: "ул. Токтогула, 208",            	 tel: '317 535', workTime: 'круглосуточно'},
  { name: 'Неман 29',    address: "Проспект Мира, 49",            	 tel: '564 252', workTime: 'круглосуточно'},
  { name: 'Неман 30',    address: "ул. Байтик Баатыра, 5б",          tel: '542 841', workTime: 'круглосуточно'},
  { name: 'Неман 32',    address: "Проспект Мира, 97/4",             tel: '597 211', workTime: 'круглосуточно'},
  { name: 'Неман 33',    address: "микрорайон Тунгуч, 6-77",         tel: '448 243', workTime: 'круглосуточно'},
  { name: 'Неман 34',    address: "микрорайон Джал 23, 90-1",        tel: '257 156', workTime: 'круглосуточно'},
  { name: 'Неман 35',    address: "ул. Жукеев-Пудовкин, 79",         tel: '574 551', workTime: 'круглосуточно'},
  { name: 'Неман 36',    address: "ул. Жукеев-Пудовкин, 75",         tel: '930 393', workTime: 'круглосуточно'},
  { name: 'Неман 42',    address: "ул. Жибек-Жолу, 174",             tel: '368 761', workTime: 'круглосуточно'},
  { name: 'Неман 48',    address: "ул. Жибек-Жолу, 407а",            tel: '304 539', workTime: 'круглосуточно'},
  { name: 'Неман 52',    address: "ул. Жибек-Жолу, 223",             tel: '483 075', workTime: 'круглосуточно'},
  { name: 'Неман 55',    address: "ул. Павлова, 99",            	 tel: '883 019', workTime: 'круглосуточно'},
  { name: 'Неман 58',    address: "Проспект Чуй, 32а",            	 tel: '681 121', workTime: 'круглосуточно'},
  { name: 'Неман 61',    address: "микрорайон Тунгуч, 64/6,",        tel: '447 179', workTime: 'круглосуточно'},
  { name: 'Неман 62',    address: "Проспект Эркиндик, 58",           tel: '662 402', workTime: 'круглосуточно'},
  { name: 'Неман 68',    address: "ул. Гоголя, 113/2",            	 tel: '434 569', workTime: 'круглосуточно'},
  { name: 'Неман АП-2',  address: "Проспект Чуй, 2/9",            	 tel: '883 021', workTime: '08:00 - 24:00'},
  { name: 'Неман АП-3',  address: "ул. Ахунбаева, 90 А",             tel: '883 548', workTime: '08:00 - 20:00'},
  { name: 'Неман АП-5',  address: "микрорайон Кок-Жар, 3",           tel: '883 551', workTime: '08:00 - 18:00'},
  { name: 'Неман АП-7',  address: "ул. Тыныстанова, 2",            	 tel: '		 ',  workTime: '08:00 - 18:00'},
  { name: 'Неман АП-10', address: "ул. Тоголок Молдо, 1",            tel: '621 012', workTime: 'круглосуточно'},
  { name: 'Неман АП-11', address: "ул. Байтик Батыра, 1",            tel: '570 946', workTime: '08:00 - 18:00'},
  { name: 'Неман АП-12', address: "Проспект Чуй, 40",            	 tel: '433 912', workTime: '08:00 - 18:00'},
  { name: 'Неман АП-30', address: "ул. Панфилова, 4",            	 tel: '541 311', workTime: '08:00 - 18:00'},
  { name: 'Неман АП-52', address: "ж/м Арча-Бешик, ул. Термечикова", tel: '883 552', workTime: '08:00 - 20:00'},
  { name: 'Неман АП-56', address: "ж/м Ак-Орго, ул.Огуз-Ата-Ашар",   tel: '883 550', workTime: '08:00 - 18:00'},
  { name: 'Неман 69',    address: "ул. Ауэзова, 3В",            	 tel: '884 492', workTime: 'круглосуточно'},
];

const dataTwo: GroupB[] = [
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

const dataThree: GroupC[] = [
  { name: 'Городская клиническая больница № 1       ',  address: "ул. Фучика, 15           ", tel: '64-45-09'},
  { name: 'Детская противотуберкулезная больница № 2',  address: "пр. Молодой Гвардии, 71 А", tel: '34-04-18'},
  { name: 'Городская детская больница № 2           ',  address: "ул. Московская, 151      ", tel: '21-37-57'},
  { name: 'Городская противотуберкулезная больница  ',  address: "ул. Элебесова, 211       ", tel: '67-90-08'},
  { name: 'Национальный хирургический центр         ',  address: "ул. 2-я линия, 25        ", tel: '21-03-09'},
  { name: 'Республиканская больница № 2             ',  address: "ул. Киевская, 110        ", tel: '26-35-23'},
  { name: 'Чуйская областная больница               ',  address: "ул. Саратовская, 10      ", tel: '36-71-50'},
  { name: 'Клинический родильный дом № 2            ',  address: "ул. Московская, 225      ", tel: '65-73-38'},
  ];

export class AgroupData extends DataSource<any> {
  connect(): Observable<GroupA[]> {
    return Observable.of(data);
  }
  disconnect() {}
}
export class MedCentrData extends DataSource<any> {
  connect(): Observable<GroupB[]> {
    return Observable.of(dataTwo);
  }
  disconnect() {}
}
export class HospitalData extends DataSource<any> {
  connect(): Observable<GroupC[]> {
    return Observable.of(dataThree);
  }
  disconnect() {}
}
*/





