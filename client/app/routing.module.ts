import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { ContragencyComponent } from './contragency/contragency.component';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';
import { AccomodationDbComponent } from './accomodation-db/accomodation-db.component';
import { FinanceComponent } from './finance/finance.component';
import { SalesComponent } from './sales/sales.component';
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

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'accomodation-db', component: AccomodationDbComponent },
  { path: 'component', component: AppComponent },
  { path: 'finance', component: FinanceComponent },
  { 
    path: 'nomenclature', 
    component: NomenclatureComponent,
    children:[
    {
      path: 'drug-list',
      component: DrugListComponent
    },
    {
      path: 'prices',
      component: PricesComponent
    },
    {
      path: 'remains',
      component: RemainsComponent
    },
    {
      path: 'pjvls',
      component: PjvlsComponent
    }
    ] 
  },
  { 
    path: 'contragency', 
    component: ContragencyComponent,
    children:[
    {
      path: 'medics',
      component: MedicsComponent
    },
    {
      path: 'lpu',
      component: LpuComponent
    },
    {
      path: 'drugstores',
      component: DrugstoresComponent
    },
    {
      path: 'individuals',
      component: IndividualsComponent
    },
    {
      path: 'coworkers',
      component: CoworkersComponent
    },
    {
      path: 'renters',
      component: RentersComponent
    }
    ]
  },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
