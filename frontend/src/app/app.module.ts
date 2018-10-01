import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
//import { NgMatSearchBarModule } from 'ng-mat-search-bar';

import {MatToolbarModule,MatFormFieldModule,
         MatInputModule,
         MatOptionModule,
         MatSelectModule,
         MatIconModule,
         MatButtonModule,
         MatCardModule,
         MatTableModule,
         MatDividerModule,
         MatSnackBarModule} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import { IssueService } from './issue.service';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'edit', component: EditComponent },
  { path: 'list', component: ListComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    ChatComponent
  ],

  imports: [
    BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'}),
  ReactiveFormsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule,
  FormsModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
