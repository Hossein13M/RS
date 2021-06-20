import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const matchValidator = (matchValue: string | number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value !== matchValue) {
            return{
                match: { value: control.value, expectedValue: matchValue },
            };
        }
        return null;
    };
};
