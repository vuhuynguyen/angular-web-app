import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChemicalApiClient } from 'src/app/core/api-clients/chemical.client';
import { AddChemicalCommand } from 'src/app/core/api-clients/chemical.model';
import { SelectChemicalViewModel } from 'src/app/shared/controls/select-chemical-type/@model/select-chemical-type.model';
import { ValidationError } from 'src/app/shared/validations/validation-message/validation-message.component';

@Component({
  selector: 'app-add-chemical',
  templateUrl: './add-chemical.component.html',
  styleUrls: ['./add-chemical.component.scss'],
})
export class AddChemicalComponent implements OnInit {
  mainForm: FormGroup;

  validationError: ValidationError = {
    required: 'This field is required',
  };

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private chemicalApiClient: ChemicalApiClient,
    private toastr: ToastrService
  ) {
    this.mainForm = this.initialForm();
  }
  ngOnInit(): void {}

  private initialForm() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      chemicalTypeId: ['', [Validators.required]],
      activeIngredient: ['', []],
      preHarvestIntervalInDays: ['', []],
    });
  }

  addChemical() {
    if (this.mainForm.invalid) {
      this.mainForm.markAllAsTouched();
      return;
    }

    let command: AddChemicalCommand = new AddChemicalCommand(
      this.mainForm.getRawValue()
    );

    let save$ = this.chemicalApiClient.addChemical(command);

    save$.subscribe(() => {
      this.toastr.success('Added Sucessfully!');
      this.activeModal.close(true);
    });
  }

  onChemicalTypeChange(selectedType: SelectChemicalViewModel) {
    this.mainForm.controls['chemicalTypeId'].setValue(selectedType?.id);
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
