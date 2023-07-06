import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddChemicalComponent } from './add-chemical/add-chemical.component';
import { ChemicalOverviewComponent } from './chemical-overview/chemical-overview.component';
import { ChemicalRoutingModule } from './chemical-routing.module';

@NgModule({
  declarations: [ChemicalOverviewComponent, AddChemicalComponent],
  imports: [SharedModule, ChemicalRoutingModule, CommonModule],
})
export class ChemicalModule {}
