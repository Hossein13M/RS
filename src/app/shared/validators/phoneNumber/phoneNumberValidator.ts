import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const phoneNumberValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const phoneNumberRegex = new RegExp('[0][9]\\w+'); // (\\+98|0)?9\\d{9}
        const value: string = control.value;
        if (!phoneNumberRegex.test(value)) {
            return {
                phoneNumber: {
                    value: value,
                    startsWith: `${value[0]}${value[1]}`,
                    length: value.length,
                    message: 'value should start with 09 and should be 11 characters long',
                },
            };
        }
        if (value.length !== 11) {
            return {
                phoneNumber: {
                    value: value,
                    startsWith: `${value[0]}${value[1]}`,
                    length: value.length,
                    message: 'value should be 11 digits long',
                },
            };
        }
        return null;
    };
};
