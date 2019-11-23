import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrogLakeComponent } from './frog-lake/frog-lake.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'froglake',
    pathMatch: 'full'
  },
  { path: 'froglake', component: FrogLakeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
