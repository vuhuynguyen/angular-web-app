import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddChemicalComponent } from './add-chemical/add-chemical.component';
import { ChemicalOverviewComponent } from './chemical-overview/chemical-overview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'overview',
        component: ChemicalOverviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChemicalRoutingModule {}
