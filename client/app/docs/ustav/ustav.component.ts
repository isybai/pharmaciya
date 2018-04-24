import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/observable/of';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { NgClass, NgStyle } from '@angular/common';


// const URL = '/api/';
const URL = 'https://pharmaciya-isybai.c9users.i/api/';
import { DocService } from '../../services/doc.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-ustav',
  templateUrl: './ustav.component.html',
  styleUrls: ['./ustav.component.scss']
})

export class UstavComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver  = false;


  doc: any = {};
  docs: any [];
  isLoading = true;
  isEditing = false;

  addDocForm: FormGroup;
  name = new FormControl('', Validators.required);
  url = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);


  constructor(private ustavService: DocService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) {}

  ngOnInit() {
    this.getDocs();
    this.addDocForm = this.formBuilder.group({
     name: this.name,
     url: this.url,
     type: this.type,
    });
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  getDocs() {
    this.ustavService.getDocs().subscribe(
      data => this.docs = data,
      error => console.log(error),
      () => this.isLoading = false

    );
  }

  addDoc() {
    this.ustavService.addDoc(this.addDocForm.value).subscribe(
      res => {
        const newUstav = res.json();
        this.docs.push(newUstav);
        this.addDocForm.reset();
        this.toast.setMessage('Документ успешно добавлен.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(doc) {
    this.isEditing = true;
    this.doc = doc;
  }

  cancelEditing() {
    this.isEditing = false;
    this.doc = {};
    this.toast.setMessage('Редактирование документ отменена.', 'warning');
    // reload the ustavs to reset the editing
    this.getDocs();
  }

  editDoc(doc) {
    this.ustavService.editDoc(doc).subscribe(
      res => {
        this.isEditing = false;
        this.doc = doc;
        this.toast.setMessage('Документ успешно отредактирован.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteDoc(doc) {
    if (window.confirm('Вы уверенны что хотите удалить этого документ?')) {
      this.ustavService.deleteDoc(doc).subscribe(
        res => {
          const pos = this.docs.map(elem => elem._id).indexOf(doc._id);
          this.docs.splice(pos, 1);
          this.toast.setMessage('Документ успешно удален.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}


