import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunPage } from './run.page';

const routes: Routes = [
  {
    path: '',
    component: RunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunPageRoutingModule {}
