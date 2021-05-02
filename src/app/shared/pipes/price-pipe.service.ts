import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PricePipeService {
    decimalInfo = '1.0-0';
    downScaleOrder = 9; // 10 ^^ x

    constructor() {
        const unitPrice = JSON.parse(localStorage.getItem('priceUnit')) ?? { unit: 'rial', scale: 9 };
        if (unitPrice.unit === 'toman') unitPrice.scale += 1;
        this.downScaleOrder = parseInt(unitPrice.scale, 10);
        if (unitPrice.scale > 6) this.decimalInfo = '1.0-4';
    }
}
