import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';

// Material Modules

import { BreadCumbMenuComponent } from './bread-cumb-menu/bread-cumb-menu.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [AppComponent, BreadCumbMenuComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
