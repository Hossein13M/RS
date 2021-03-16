import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appUsualButton]',
})
export class UsualButtonDirective implements AfterViewInit {
    @Input() isReverse;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
        if (this.isReverse) {
            this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#c1bbbb');
        } else {
            this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#3a8e3a');
        }
    }
}
