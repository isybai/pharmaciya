import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';



import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';

import { MedicService } from './services/medic.service';
import { DrugstoreService } from './services/drugstore.service';
import { IndividualService } from './services/individual.service';
import { RenterService } from './services/renter.service';
import { LpuService } from './services/lpu.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
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
import { SalesComponent } from './sales/sales.component';
import { MedicsComponent } from './contragency/medics/medics.component';
import { LpuComponent } from './contragency/lpu/lpu.component';
import { DrugstoresComponent } from './contragency/drugstores/drugstores.component';
import { IndividualsComponent } from './contragency/individuals/individuals.component';
import { CoworkersComponent } from './coworkers/coworkers.component';
import { RentersComponent } from './accomodation-db/renters/renters.component';
import { DrugListComponent } from './nomenclature/drug-list/drug-list.component';
import { PricesComponent } from './nomenclature/prices/prices.component';
import { RemainsComponent } from './nomenclature/remains/remains.component';
import { PjvlsComponent } from './nomenclature/pjvls/pjvls.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
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
    RoutingModule,
    SharedModule,
    BrowserModule,
    // Material
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    CdkTableModule,
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    MedicService,
    IndividualService,
    RenterService,
    UserService,
    LpuService,
    DrugstoreService

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
