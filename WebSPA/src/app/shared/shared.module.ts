import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectChemicalTypeComponent } from './controls/select-chemical-type/select-chemical-type.component';
import { ValidationMessageComponent } from './validations/validation-message/validation-message.component';

const CUSTOM_CONTROLS = [
  SelectChemicalTypeComponent,
  ValidationMessageComponent,
];

const LIBRARIES = [NgbModule, NgSelectModule];

const CUSTOM_PIPES: any[] = [];

@NgModule({
  declarations: [CUSTOM_CONTROLS, CUSTOM_PIPES],
  imports: [LIBRARIES, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    LIBRARIES,
    CUSTOM_CONTROLS,
    CUSTOM_PIPES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CUSTOM_PIPES],
})
export class SharedModule {}
