import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalkPage } from './walk.page';

const routes: Routes = [
  {
    path: '',
    component: WalkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalkPageRoutingModule {}
