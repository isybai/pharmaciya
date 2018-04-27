import { Component,
  OnInit,
  AfterViewInit,
  ViewChild, ElementRef,
  Output, Input,
  EventEmitter } from '@angular/core';

import { Binary } from '../../model/binary';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ustav',
  templateUrl: './ustav.component.html',
  styleUrls: ['./ustav.component.scss']
})

export class UstavComponent implements OnInit {
  @Output() onUploadStarted = new EventEmitter<void>();
  @Output() onError = new EventEmitter<string>();
  @Output() onUploaded = new EventEmitter<File[]>();

  @Input() placeHolderText = 'Upload file...';
  @ViewChild('fileInputParent') fileInputParent: ElementRef;

  constructor(private http: HttpClient) {
   }

  ngOnInit() {
    this.addFileInput();
  }



  private addFileInput() {
    const fileInputParentNative = this.fileInputParent.nativeElement;
    const oldFileInput = fileInputParentNative.querySelector('input');
    const newFileInput = document.createElement('input');
    newFileInput.type = 'file';
    newFileInput.multiple = true;
    newFileInput.name = 'fileInput';
    const uploadfiles = this.uploadFiles.bind(this);
    newFileInput.onchange = uploadfiles;
    oldFileInput.parentNode.replaceChild(newFileInput, oldFileInput);
  }

  private uploadFiles() {
    this.onUploadStarted.emit();
    const fileInputParentNative = this.fileInputParent.nativeElement;
    const fileInput = fileInputParentNative.querySelector('input');
    if (fileInput.files && fileInput.files.length > 0) {
      const formData = new FormData();
      console.log({'file': fileInput.files[0]});
      this.http.post('/api/docs/upload', {'file': fileInput.files[0]});
      const onUploaded = this.onUploaded;
      const onError = this.onError;
      const addFileInput = this.addFileInput.bind(this);
      fetch('/api/docs/upload', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }).then((response: any) => {
        if (response.status !== 200) {
          const error = `An error occured. Status: ${response.status}`;
          throw new Error(error);
        }
        return response.json();
      }).then(files => {
        onUploaded.emit(files);
        addFileInput();
      }).catch((error) => {
        onError.emit(error);
      });
    }
}
}


