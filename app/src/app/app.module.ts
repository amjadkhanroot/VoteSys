import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './project-list/service';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
