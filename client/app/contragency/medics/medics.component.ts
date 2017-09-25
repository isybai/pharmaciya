import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MedicService } from '../../services/medic.service';
import { LpuService } from '../../services/lpu.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit {

  medic = {};
  medics = [];
  lpu = {};
  lpus = [];
  isLoading = true;
  isEditing = false;

  addMedicForm: FormGroup;
  name = new FormControl('', Validators.required);
  sur = new FormControl('', Validators.required);
  spec = new FormControl(null, Validators.required);
  hos = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  local = new FormControl('', Validators.required);
  workTimeFrom = new FormControl('', Validators.required);
  workTimeTill = new FormControl('', Validators.required);
  tel = new FormControl('', Validators.required);

  constructor(private medicService: MedicService,
              private lpuService: LpuService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) {}

  ngOnInit() {
    this.getMedics();
    this.getLpus();
    this.addMedicForm = this.formBuilder.group({
      name: this.name,
      sur: this.sur,
      spec: this.spec,
      hos: this.hos,
      type: this.type,
      local: this.local,
      workTimeFrom: this.workTimeFrom,
      workTimeTill: this.workTimeTill,
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
  }

  enableEditing(medic) {
    this.isEditing = true;
    this.medic = medic;
  }

  cancelEditing() {
    this.isEditing = false;
    this.medic = {};
    this.toast.setMessage('Редактирование врача отменена.', 'warning');
    // reload the medics to reset the editing
    this.getMedics();
  }

  editMedic(medic) {
    this.medicService.editMedic(medic).subscribe(
      res => {
        this.isEditing = false;
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
    }
  }
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
}
