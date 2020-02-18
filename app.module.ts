import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from './material.module';
import {MatSnackBarModule} from'@angular/material';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { HeaderComponent } from './boschHeader/boschHeader.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginService } from './login/login.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DashboardService } from "./dashboard/dashboard.service";
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './authentication/auth.service';
import { FooterComponent } from './footer/footer.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { InstanceManagmentComponent } from './admin-settings/instance-managment/instance-managment.component';
import {InstanceManagmentService} from './admin-settings/instance-managment/instance-managment.service';
import { NotificationManagementComponent } from './admin-settings/notification-management/notification-management.component';
import {NotificationManagementService} from './admin-settings/notification-management/notification-management.service';
import { LdapConfigComponent } from './admin-settings/ldap-config/ldap-config.component';
import { LdapConfigService } from './admin-settings/ldap-config/ldap-config.service';
import { InstanceConfigurationComponent , CategoryUpdateDialog, StateUpdateDialog, TagUpdateDialog, OwnerUpdateDialog, PriorityUpdateDialog, WIUpdateDialog, WIAddDialog, WIAddConfigDialog, WIValueAddDialog } from './configuration/instance-configuration/instance-configuration.component';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {InstanceConfiguration} from './configuration/instance-configuration/instance-configuration.service';
import { MailBoxService } from './configuration/instance-configuration/mailbox-configuration.service';
import { WorkitemAttributeService } from './configuration/instance-configuration/workitem-attribute-configuration.service';
import { WorkItemService } from './configuration/instance-configuration/workitem-config.service';
import {MatTabsModule} from '@angular/material/tabs';
import {CategoryService} from './configuration/instance-configuration/category-config.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MappingService } from './configuration/instance-configuration/mapping.service';
//import { TemplateManagementComponent } from './admin-settings/template-management/template-management.component';
//import { FileUploadComponent } from './admin-settings/template-management/file-upload/file-upload.component';
//import { DialogFileUploadComponent } from './admin-settings/template-management/template-management.component';
//import { UploadService } from './admin-settings/template-management/template-management.service';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { SettingsManagementComponent } from './admin-settings/settings-management/settings-management.component';
import { SettingConfigService } from './admin-settings/settings-management/settings-management.service';
import { NewUserComponent } from './admin-settings/new-user/new-user.component';
import { NewUserReceipientService } from './admin-settings/new-user/new-user.service';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadComponent } from './admin-settings/upload.component/upload.component';
import { UploadService } from './admin-settings/upload.component/upload.service';
import { FileSelectDirective } from 'ng2-file-upload';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HomeLayoutComponent,
    FileSelectDirective,
    InstanceManagmentComponent,
    NotificationManagementComponent,
    LdapConfigComponent,
    InstanceConfigurationComponent,
    CategoryUpdateDialog,
    StateUpdateDialog,
    WIUpdateDialog,
    WIAddDialog,
    TagUpdateDialog,
    OwnerUpdateDialog,
    PriorityUpdateDialog,
    WIAddConfigDialog,
    WIValueAddDialog,
    //TemplateManagementComponent,
    FileUploadComponent,
    //DialogFileUploadComponent,
    SettingsManagementComponent,
    NewUserComponent
   // UserComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    CustomMaterialModule,
    FormsModule,
    MatCheckboxModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule, 
    MatFileUploadModule,
    MatPaginatorModule,
    NgxHmCarouselModule,
    
    //AuthService,
    //UserVariables,
   // BackEndAPI,
    BrowserAnimationsModule
  ],
  entryComponents: [InstanceManagmentComponent, CategoryUpdateDialog , StateUpdateDialog, TagUpdateDialog,
    OwnerUpdateDialog , PriorityUpdateDialog,  WIUpdateDialog, NewUserComponent, InstanceConfigurationComponent, WIValueAddDialog, WIAddDialog, WIAddConfigDialog],
  providers: [LoginService,AuthService,DashboardService,InstanceManagmentService,NotificationManagementService,LdapConfigService,
    InstanceConfiguration , MailBoxService, WorkitemAttributeService, WorkItemService, CookieService, CategoryService, 
    MappingService, UploadService, SettingConfigService, NewUserReceipientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
