import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent {
  @Input()
  for: AbstractControl | any;

  @Input()
  validationError!: ValidationError;

  @Input() isCrossField: boolean = false;

  get isInvalid(): boolean {
    if (this.for.invalid && this.for.touched) {
      return true;
    }

    for (const error in this.validationError) {
      if (this.for.hasError(error) && this.for.touched) {
        return true;
      }
    }

    return false;
  }

  get errorMessage(): string {
    for (const error in this.validationError) {
      if (this.for.hasError(error)) {
        return this.validationError[error];
      }
    }

    return this.isCrossField ? '' : 'Unknown Error.';
  }
}

/**
 * Key Value pair of the error and error message
 */
export class ValidationError {
  [key: string]: string;
}
