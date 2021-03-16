import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDialogHeader]',
})
export class DialogHeaderDirective implements OnInit {
    @Input() title;

    titleValue;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer['addClass'](el.nativeElement, 'accent');
        renderer.setStyle(el.nativeElement, 'direction', 'rtl');
        renderer.setStyle(el.nativeElement, 'width', 'calc(100% + 1px)');
        renderer.setStyle(el.nativeElement, 'height', '45px');
        renderer.setStyle(el.nativeElement, 'margin-bottom', '20px');
        renderer.setStyle(el.nativeElement, 'display', 'flex');
        renderer.setStyle(el.nativeElement, 'flex-direction', 'row-reverse');
        renderer.setStyle(el.nativeElement, 'justify-content', 'space-between');
        renderer.setStyle(el.nativeElement, 'align-items', 'center');
        renderer.setStyle(el.nativeElement, 'position', 'relative');
        renderer.setStyle(el.nativeElement, 'top', ' -1px');
    }

    titleFunctionality(): void {
        const title = this.renderer.createElement('strong');
        const text = this.renderer.createText(this.titleValue);
        this.renderer.appendChild(title, text);
        this.renderer.appendChild(this.el.nativeElement, title);
        this.renderer.setStyle(title, 'margin-right', '10px');
        this.renderer.setStyle(title, 'color', 'white');
        this.renderer.setStyle(title, 'font-size', '18px');
        this.renderer.setStyle(title, 'font-weight', '550');
    }

    ngOnInit(): void {
        this.titleValue = this.title;
        this.titleFunctionality();
    }
}
