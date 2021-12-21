import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static maxLengthText(max: Number) {
    return (controls: AbstractControl) => {
      if (controls.value.length > max) {
        const newValue = controls.value.substring(0, max);
        controls.setValue(newValue);
      }
      return null;
    };
  }

  static numberRange(min: Number, max: Number) {
    return (controls: AbstractControl) => {
      if (min < max) {
        const value = controls.value;

        if (value < min) {
          controls.setValue(min);
        }

        if (value > max) {
          controls.setValue(max);
        }
      } else {
        console.error('El minimo no debe ser menor al maximo');
      }

      return null;
    };
  }

  static trueEmail(Controls: AbstractControl) {
    const regrex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9-.]+$'
    );
    const value = Controls.value;

    const valid = regrex.test(value);

    if (!valid && value.length > 0) {
      return { email_error: true };
    }

    return null;
  }

  static confirmEmail(controls: AbstractControl) {
    const emailField = controls.get('email');
    const confirmEmailField = controls.get('confirmEmail');

    if (
      confirmEmailField?.value !== emailField?.value &&
      confirmEmailField?.value.length > 0
    ) {
      return { confirmEmai_error: true };
    } else {
      return null;
    }
  }
}
