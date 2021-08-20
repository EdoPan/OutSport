import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalkPageRoutingModule } from './walk-routing.module';

import { WalkPage } from './walk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalkPageRoutingModule
  ],
  declarations: [WalkPage]
})
export class WalkPageModule {}
