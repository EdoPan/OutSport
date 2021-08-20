import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BikePage } from './bike.page';

const routes: Routes = [
  {
    path: '',
    component: BikePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BikePageRoutingModule {}
