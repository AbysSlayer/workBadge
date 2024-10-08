import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { RequestManagementComponent } from './components/request-management/request-management.component';
import { BadgesManagementComponent } from './components/badges-management/badges-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MatDialogModule } from '@angular/material/dialog';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { BadgeGenComponent } from './components/badge-gen/badge-gen.component';



@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, SignupComponent, UserRequestComponent, RequestManagementComponent, BadgesManagementComponent, UserManagementComponent, ReportsComponent, QrCodeComponent, BadgeGenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelect,
    ReactiveFormsModule,
    MatDialogModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}