import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ContragencyComponent } from './contragency/contragency.component';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';
import { AccomodationDbComponent } from './accomodation-db/accomodation-db.component';
import { FinanceComponent } from './finance/finance.component';
import { SalesComponent } from './sales/sales.component';
import { RouterModule, Routes } from '@angular/router';
import { MedicsComponent } from './contragency/medics/medics.component';
import { LpuComponent } from './contragency/lpu/lpu.component';
import { DrugstoresComponent } from './contragency/drugstores/drugstores.component';
import { IndividualsComponent } from './contragency/individuals/individuals.component';
import { CoworkersComponent } from './contragency/coworkers/coworkers.component';
import { RentersComponent } from './contragency/renters/renters.component';
import { DrugListComponent } from './nomenclature/drug-list/drug-list.component';
import { PricesComponent } from './nomenclature/prices/prices.component';
import { RemainsComponent } from './nomenclature/remains/remains.component';
import { PjvlsComponent } from './nomenclature/pjvls/pjvls.component';

const appRoutes: Routes = [
  { 
    path: 'app-contragency', 
    component: ContragencyComponent,
    children:[
    {
      path: 'app-medics',
      component: MedicsComponent
    },
    {
      path: 'app-lpu',
      component: LpuComponent
    },
    {
      path: 'app-drugstores',
      component: DrugstoresComponent
    },
    {
      path: 'app-individuals',
      component: IndividualsComponent
    },
    {
      path: 'app-coworkers',
      component: CoworkersComponent
    },
    {
      path: 'app-renters',
      component: RentersComponent
    }
    ]
  },
  { path: 'app-accomodation-db', component: AccomodationDbComponent },
  { path: 'app-component', component: AppComponent },
  { path: 'app-finance', component: FinanceComponent },
  { 
    path: 'app-nomenclature', 
    component: NomenclatureComponent,
    children:[
    {
      path: 'app-drug-list',
      component: DrugListComponent
    },
    {
      path: 'app-prices',
      component: PricesComponent
    },
    {
      path: 'app-remains',
      component: RemainsComponent
    },
    {
      path: 'app-pjvls',
      component: PjvlsComponent
    }
    ] 
  },
  { path: 'app-sales', component: SalesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContragencyComponent,
    NomenclatureComponent,
    AccomodationDbComponent,
    FinanceComponent,
    SalesComponent,
    MedicsComponent,
    LpuComponent,
    DrugstoresComponent,
    IndividualsComponent,
    CoworkersComponent,
    RentersComponent,
    DrugListComponent,
    PricesComponent,
    RemainsComponent,
    PjvlsComponent
  ],
  imports: [
   RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),

    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
