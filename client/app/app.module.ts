import { FileUploadModule } from 'ng2-file-upload';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

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

import { HandbookService } from './services/handbook.service';
import { OrderService } from './services/order.service';
import { MedicService } from './services/medic.service';
import { CoworkerService } from './services/coworker.service';
import { TaskService } from './services/task.service';
import { DrugstoreService } from './services/drugstore.service';
import { IndividualService } from './services/individual.service';
import { RenterService } from './services/renter.service';
import { LpuService } from './services/lpu.service';
import { SaleClientService } from './services/saleClient.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JapanService } from './services/japan.service';
import { RpoService } from './services/rpo.service';

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
import { SalesComponent } from './nomenclature/sales/sales.component';
import { MedicsComponent } from './contragency/medics/medics.component';
import { LpuComponent } from './contragency/lpu/lpu.component';
import { DrugstoresComponent } from './contragency/drugstores/drugstores.component';
import { IndividualsComponent } from './contragency/individuals/individuals.component';
import { CoworkersComponent } from './coworkers/coworkers.component';
import { RentersComponent } from './accomodation-db/renters/renters.component';
import { JapanComponent } from './nomenclature/japan/japan.component';
import { RpoComponent } from './nomenclature/rpo/rpo.component';
import { TasksComponent } from './about/tasks/tasks.component';
import { HandbooksComponent } from './contragency/handbooks/handbooks.component';
import { OrdersComponent } from './orders/orders.component';

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
    JapanComponent,
    RpoComponent,
    TasksComponent,
    HandbooksComponent,
    OrdersComponent,
  ],
  imports: [
    FileUploadModule,
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
    BrowserModule,
    CommonModule,
    FormsModule,
    DndModule.forRoot()
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
    DrugstoreService,
    TaskService,
    CoworkerService,
    HandbookService,
    OrderService,
    SaleClientService,
    JapanService,
    RpoService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
