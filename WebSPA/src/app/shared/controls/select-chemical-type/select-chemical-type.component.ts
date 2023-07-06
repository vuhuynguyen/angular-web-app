import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  concat,
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import {
  ChemicalApiClient,
  GetDropdownsRequest,
} from 'src/app/core/api-clients/_index';
import { SelectChemicalViewModel } from './@model/select-chemical-type.model';

@UntilDestroy()
@Component({
  selector: 'app-select-chemical-type',
  templateUrl: './select-chemical-type.component.html',
  styleUrls: ['./select-chemical-type.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectChemicalTypeComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => SelectChemicalTypeComponent),
    },
  ],
})
export class SelectChemicalTypeComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() disabled: boolean = false;
  @Input() clearable = false;
  @Input() control = {} as AbstractControl as any;
  @Output() onChange = new EventEmitter<SelectChemicalViewModel>();
  @Output() onLoadSoData = new EventEmitter<SelectChemicalViewModel>();

  list$!: Observable<SelectChemicalViewModel[]>;
  loading = false;
  selected!: SelectChemicalViewModel;
  input$ = new Subject<string>();

  constructor(private chemicalApiClient: ChemicalApiClient) {}

  ngOnInit(): void {
    this.typingToSearch();
  }

  writeValue(id: number): void {
    if (!!id) {
    }
  }

  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  registerOnValidatorChange?(fn: () => void): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    return null;
  }

  private getEntities(keyword?: string): Observable<SelectChemicalViewModel[]> {
    return this.chemicalApiClient
      .getChemicalTypeDropdown({
        keyword: keyword ?? '',
      } as GetDropdownsRequest)
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.loading = false;
        })
      );
  }

  private typingToSearch() {
    this.list$ = concat(
      of([]), // default items
      this.getEntities(),
      this.input$.pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap((term: any) => this.getEntities(term))
      )
    );
  }

  onChangeDropdown(selectedItem: SelectChemicalViewModel) {
    this.selected = selectedItem;
    this.onChange.emit(this.selected);
  }

  trackByFn(item: SelectChemicalViewModel) {
    return item.id;
  }

  onBlurSelect() {
    this.control?.markAllAsTouched();
  }
}
