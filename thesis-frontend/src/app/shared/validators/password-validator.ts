import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const comparePasswordsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  // get controls from formgroup
  const password: AbstractControl = control.get('password');
  const passwordRepeat: AbstractControl = control.get('passwordRepeat');
  // compare passwords
  return password && passwordRepeat && password.value === passwordRepeat.value ? null : {
    passwordNotEqual: true
  };
};
