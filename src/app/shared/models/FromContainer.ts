import { HttpErrorResponse } from '@angular/common/http';

export interface FormContainer {
    model?: any;
    isWorking?: any;
    handleError?: (err: HttpErrorResponse) => boolean;
    errorMessage?: any;
}
