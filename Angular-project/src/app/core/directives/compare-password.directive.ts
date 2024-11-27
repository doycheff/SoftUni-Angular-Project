import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[appComparePassword]',
    standalone: true,
    providers: [
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: ComparePasswordDirective,
        },
    ]
})
export class ComparePasswordDirective implements Validator {
    @Input() appComparePassword: string = '';

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;

        if (value && value !== this.appComparePassword) {
            return { passwordMismatch: true };
        }

        return null;

    }
}
