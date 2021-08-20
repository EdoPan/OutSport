import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BikePageRoutingModule } from './bike-routing.module';

import { BikePage } from './bike.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BikePageRoutingModule
  ],
  declarations: [BikePage]
})
export class BikePageModule {}
