import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
// import * as URL from 'URL';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  URL = 'path_to_api';
  constructor() { }
  // public uploader: FileUploader = new FileUploader({url: URL});
  ngOnInit() {
  }

}
