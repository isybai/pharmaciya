import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
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
import { SalesComponent } from './nomenclature/sales/sales.component';
import { MedicsComponent } from './contragency/medics/medics.component';
import { LpuComponent } from './contragency/lpu/lpu.component';
import { DrugstoresComponent } from './contragency/drugstores/drugstores.component';
import { IndividualsComponent } from './contragency/individuals/individuals.component';
import { CoworkersComponent } from './coworkers/coworkers.component';
import { RentersComponent } from './accomodation-db/renters/renters.component';
import { JapanComponent } from './nomenclature/japan/japan.component';
import { RpoComponent } from './nomenclature/rpo/rpo.component';
import { HandbooksComponent } from './contragency/handbooks/handbooks.component';
import { OrdersComponent } from './orders/orders.component';
import { TenderComponent } from './tender/tender.component';
import { DocsComponent } from './docs/docs.component';
import { DismissalComponent } from './docs/dismissal/dismissal.component';
import { IncomeComponent } from './docs/income/income.component';
import { LicenseComponent } from './docs/license/license.component';
import { PriceComponent } from './docs/price/price.component';
import { RekvisitComponent } from './docs/rekvisit/rekvisit.component';
import { RentdocComponent } from './docs/rentdoc/rentdoc.component';
import { UstavComponent } from './docs/ustav/ustav.component';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'docs', component: DocsComponent,
    children: [{ path: 'component', component: AppComponent },
    { path: 'dismissal', component: DismissalComponent },
    { path: 'income', component: IncomeComponent },
    { path: 'license', component: LicenseComponent },
    { path: 'price', component: PriceComponent },
    { path: 'rekvisit', component: RekvisitComponent },
    { path: 'rentdoc', component: RentdocComponent },
    { path: 'ustav', component: UstavComponent }]
    },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'accomodation-db',
    component: AccomodationDbComponent,
    children: [{path: 'renters', component: RentersComponent}]
  },
  { path: 'finance', component: FinanceComponent },
  { path: 'order', component: OrdersComponent },
  { path: 'tender', component: TenderComponent },
  { path: 'coworkers',  component: CoworkersComponent },
  {
    path: 'nomenclature',
    component: NomenclatureComponent,
    children:
    [{path: 'japan', component: JapanComponent },
     {path: 'sales', component: SalesComponent },
     {path: 'rpo', component: RpoComponent }]
  },
  {
    path: 'contragency',
    component: ContragencyComponent,
    children:
    [{
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
      path: 'handbooks',
      component: HandbooksComponent
    }
    ]
  },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
