import { Component, OnInit } from '@angular/core';

export interface Operator{
    pref:number;
    price:number;
}

@Component({
  selector: 'app-coworkers',
  templateUrl: './coworkers.component.html',
  styleUrls: ['./coworkers.component.css']
})
export class CoworkersComponent implements OnInit {

 public resultA: { pref: number, price: number};
 public resultB: { pref: number, price: number};

 public operatorA: Operator[] = [
	{pref: 1,	 	price: 0.9  },
	{pref: 268,	 	price: 5.1  },
	{pref: 46,	 	price: 0.17 },
	{pref: 4620, 	price: 0.0  },
	{pref: 468,	 	price: 0.15 },
	{pref: 4631, 	price: 0.15 },
	{pref: 4673, 	price: 0.9  },
	{pref: 46732,	price: 1.1  },
  ];
  public operatorB: Operator[] = [
	{pref: 1,		price: 0.92 },
	{pref: 44,		price: 0.5  }, 
	{pref: 46,		price: 0.2  },
	{pref: 467,		price: 1.0  },
	{pref: 48,		price: 1.2  },
  ];

  price: number =  0;

  constructor() { }

  ngOnInit() { }  

  change(e){
  	let finalA: number = 0;
  	let finalB: number = 0;

    this.resultA = ({pref: 0, price: 0});
    this.resultB = ({pref: 0, price: 0});

  	for (let key of this.operatorA) {
  		if(e.startsWith(key.pref)){
  			this.resultA = ({pref: key.pref, price: key.price});
        console.log(this.resultA);
	  	}
	  	else{
	  		this.price = 0;
        console.log(this.resultA);
  		}
  	}
  	if(typeof this.resultA !== "undefined"){
  		finalA = this.resultA['price'];
  	}
  	else{
  		this.price = 0;
      finalA = 0;
  	}

  	for (let key of this.operatorB) {
  		if(e.startsWith(key.pref)){
  			this.resultB = ({pref: key.pref, price: key.price});
	  	}
	  	else{
	  		this.price = 0;
  		}
  	}
  	if(typeof this.resultB !== "undefined"){
  		finalB = this.resultB['price'];
  	}
  	else{
  		this.price = 0;
      finalB = 0;
  	}
    console.log('finalA = ' + finalA + ' finalB = ' + finalB);
  	if( finalA <= finalB ){
  		this.price = finalA;
  	}
  	else{
      	this.price = finalB;
  	}
  }
}

