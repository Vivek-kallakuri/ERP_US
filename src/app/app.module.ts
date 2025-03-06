import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // ✅ Import RouterModule

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './services/chat.service';
import { AppRoutingModule } from './app-routing.module'; // ✅ Import Routing Module

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,  // ✅ Add this
    RouterModule  // ✅ Add RouterModule here
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
