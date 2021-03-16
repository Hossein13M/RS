import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appBadge]',
})
export class BadgeDirective implements AfterViewInit {
    @Input() type;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'padding', '5px 10px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'border-radius', '10px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '12px');
    }

    ngAfterViewInit(): void {
        switch (this.type) {
            case 'Unread':
                this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '#ea2a2a');
                this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
                break;
            case 'Read':
                this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '#20b62f');
                this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
                break;
            case 'Critical':
                this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '#20b62f');
                this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
                break;
            case 'Normal':
                this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '#efcf4d');
                this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
                break;
        }
    }
}
