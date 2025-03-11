import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AuditLogComponent } from './audit-log/audit-log.component';
import { LogAuditComponent } from './log-audit/log-audit.component'; // ✅ Import LogAuditComponent
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AuditLogComponent,
    LogAuditComponent, // ✅ Add LogAuditComponent to declarations
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
