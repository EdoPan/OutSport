import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunPageRoutingModule } from './run-routing.module';

import { RunPage } from './run.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunPageRoutingModule
  ],
  declarations: [RunPage]
})
export class RunPageModule {}
