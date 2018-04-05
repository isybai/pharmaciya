import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accomodation-db',
  templateUrl: './accomodation-db.component.html',
  styleUrls: ['./accomodation-db.component.css']
})
export class AccomodationDbComponent implements OnInit {
  rooms: any = [{
    'link': '../../assets/1.jpg', 'title': 'room', 'id': 'r1',
    'coords': '94.25, 25, 149, 24.25, 133, 96.25, 75.75, 96.5'
    }, {
    'link': '../../assets/2.jpg', 'title': 'room', 'id': 'r2',
    'coords': '183.75, 97.25, 199, 25, 149.5, 24.75, 134, 96.5'
    }, {
    'link': '../../assets/3.jpg', 'title': 'room', 'id': 'r3',
    'coords': '200.25, 24.75, 289.5, 24, 276.75, 96, 185.25, 96.75'
    }, {
    'link': '../../assets/4.jpg', 'title': 'room', 'id': 'r4',
    'coords': '290.75, 24.25, 389, 24.25, 380, 95.5, 277.75, 96.25'
  }, {
    'link': '../../assets/5.jpg', 'title': 'room', 'id': 'r5',
    'coords': '390, 24, 431.25, 23.75, 422.75, 95.5, 380.75, 95.5'
  }, {
    'link': '../../assets/6.jpg', 'title': 'room', 'id': 'r6',
    'coords': '432, 23.75, 475.75, 23.75, 468.75, 95.5, 423.75, 95.5'
  }, {
    'link': '../../assets/7.jpg', 'title': 'room', 'id': 'r7',
    'coords': '477, 23.75, 521.25, 23.5, 515.5, 95.5, 469.5, 95.5'
  }, {
    'link': '../../assets/8.jpg', 'title': 'room', 'id': 'r8',
    'coords': '522, 23.75, 568.25, 23.5, 564, 95.25, 516.25, 96'
  }, {
    'link': '../../assets/9.jpg', 'title': 'room', 'id': 'r9',
    'coords': '569.5, 23.75, 708.25, 23, 709.25, 95.25, 565.5, 95.25'
  }, {
    'link': '../../assets/10.jpg', 'title': 'room', 'id': 'r10',
    'coords': '710.75, 95, 807.75, 94, 804.25, 22.5, 709.25, 22.75'
  }, {
    'link': '../../assets/11.jpg', 'title': 'room', 'id': 'r11',
    'coords': '805.25, 22.75, 850.25, 22.75, 855.25, 94.25, 809, 94.25'
  }, {
    'link': '../../assets/12.jpg', 'title': 'room', 'id': 'r12',
    'coords': '852, 22.75, 902.5, 22.25, 910, 94, 856.75, 94'
  }, {
    'link': '../../assets/13.jpg', 'title': 'room', 'id': 'r13',
    'coords': '904.25, 22.25, 993.25, 21.75, 1002.75, 94, 911.5, 94'
  }, {
    'link': '../../assets/14.jpg', 'title': 'room', 'id': 'r14',
    'coords': '1003.75, 93.75, 1156.25, 92.75, 1141.75, 21.25, 994.5, 22.25'
  }, {
    'link': '../../assets/15.jpg', 'title': 'room', 'id': 'r15',
    'coords': '1143.25, 21.5, 1237.75, 21, 1255, 93.5, 1158, 93'
  }, {
    'link': '../../assets/16.jpg', 'title': 'room', 'id': 'r16',
    'coords': '1239, 21.5, 1280.25, 21, 1298.75, 93, 1256.5, 93'
  }, {
    'link': '../../assets/17.jpg', 'title': 'room', 'id': 'r17',
    'coords': '1281.75, 21.25, 1325.25, 21, 1344.5, 91.75, 1300.5, 92.5'
  }, {
    'link': '../../assets/18.jpg', 'title': 'room', 'id': 'r18',
    'coords': '1375.25, 201.75, 1279.5, 201.25, 1260.5, 121.75, 1352.5, 122.25'
  }, {
    'link': '../../assets/19.jpg', 'title': 'room', 'id': 'r19',
    'coords': '1278.25, 201.5, 1258.75, 121.75, 1159.5, 122.25, 1175.25, 201.5'
  }, {
    'link': '../../assets/20.jpg', 'title': 'room', 'id': 'r20',
    'coords': '1126.25, 202.25, 1174.25, 202.25, 1158.25, 122.5, 1111.75, 122.75'
  }, {
    'link': '../../assets/21.jpg', 'title': 'room', 'id': 'r21',
    'coords': '1027, 203, 1021.25, 160, 1029.5, 159.75, 1024.5, 124.75, 1015, 122.75, 860, 123, 865.25, 202.75'
  }, {
    'link': '../../assets/22.jpg', 'title': 'room', 'id': 'r22',
    'coords': '814.25, 203, 810.5, 123.5, 858, 123.5, 864, 203.5'
  }, {
    'link': '../../assets/23.jpg', 'title': 'room', 'id': 'r23',
    'coords': '764.25, 203.5, 762, 123.5, 809, 123.5, 813.25, 203'
  }, {
    'link': '../../assets/24.jpg', 'title': 'room', 'id': 'r24',
    'coords': '654, 204, 763.25, 203, 761.5, 124, 655.25, 124.75'
  }, {
    'link': '../../assets/25.jpg', 'title': 'room', 'id': 'r25',
    'coords': '556.75, 204.25, 561.25, 124.25, 654.25, 124, 653, 203.5'
  }, {
    'link': '../../assets/26.jpg', 'title': 'room', 'id': 'r26',
    'coords': '555.75, 204.25, 560.5, 123.75, 508.25, 124.25, 501.75, 204.75'
  }, {
    'link': '../../assets/27.jpg', 'title': 'room', 'id': 'r27',
    'coords': '299.5, 205.25, 311.5, 124.25, 410, 124.75, 400.75, 203.75'
  }, {
    'link': '../../assets/28.jpg', 'title': 'room', 'id': 'r28',
    'coords': '193, 205.5, 210, 125, 310.25, 125, 298, 206'
  }, {
    'link': '../../assets/29.jpg', 'title': 'room', 'id': 'r29',
    'coords': '148.25, 205.5, 165.5, 125.25, 208, 125.25, 191.75, 205.5'
  }, {
    'link': '../../assets/30.jpg', 'title': 'room', 'id': 'r30',
    'coords': '46.75, 206.25, 57.5, 167.25, 154.5, 166.5, 147.5, 205.25'}];
  imglink = '../../assets/floor_one.jpg';
  constructor() { }

  ngOnInit() {
  }
  mouseEnter(id) {
    for (let i = 0; i < this.rooms.length; i++)  {
      if (id === this.rooms[i].id) {
        this.imglink = this.rooms[i].link;
      }else {
      }
    }
  }
  mouseLeave() {
    this.imglink = '../../assets/floor_one.jpg';
  }
  roomClicked() {
    console.log('clicked');
  }
  // test () {
  // let a1 = [377,100,596,97,532,385,303,386];
  // let a2 = [735,389,796,100,598,99,536,386];
  // let a3 = [801,99,1158,96,1107,384,741,387];

  // let b1 = [];
  // let b2 = [];
  // let b3 = [];

  // for (let i = 0; i < a1.length; i++)  { b1.push(a1[i] /  4);} console.log(b1);
  // for (let i = 0; i < a2.length; i++)  { b2.push(a2[i] /  4);} console.log(b2);
  // for (let i = 0; i < a3.length; i++)  { b3.push(a3[i] /  4);} console.log(b3);
  // }
}































