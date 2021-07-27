import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import { from, Observable } from 'rxjs';
import { defaultBpmn } from '../default.bpmn';

@Component({
    selector: 'app-bpmn-diagram',
    templateUrl: './bpmn-diagram.component.html',
    styleUrls: ['./bpmn-diagram.component.scss'],
})
export class BpmnDiagramComponent implements AfterContentInit, OnChanges, OnDestroy {
    private bpmnJS: BpmnJS;

    @ViewChild('ref', { static: true }) private el: ElementRef;
    @Output() private importDone: EventEmitter<any> = new EventEmitter();

    @Input() private url: string;

    constructor(private http: HttpClient) {
        this.bpmnJS = new BpmnJS();

        this.bpmnJS.on('import.done', ({ error }) => {
            if (!error) {
                this.bpmnJS.get('canvas').zoom('fit-viewport');
            }
        });
    }

    ngAfterContentInit(): void {
        this.bpmnJS.attachTo(this.el.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges) {
        // re-import whenever the url changes
        if (changes.url) {
            this.loadUrl(changes.url.currentValue);
        }
    }

    ngOnDestroy(): void {
        this.bpmnJS.destroy();
    }

    /**
     * Load diagram from URL and emit completion event
     */
    loadUrl(url: string): void {
        this.importDiagram(defaultBpmn);
        // return this.http
        //     .get(url, { responseType: 'text' })
        //     .pipe(
        //         switchMap((xml: string) => this.importDiagram(xml)),
        //         map((result) => result.warnings)
        //     )
        //     .subscribe(
        //         (warnings) => {
        //             console.log(warnings);
        //             this.importDone.emit({
        //                 type: 'success',
        //                 warnings,
        //             });
        //         },
        //         (err) => {
        //             this.importDone.emit({
        //                 type: 'error',
        //                 error: err,
        //             });
        //         }
        //     );
    }

    /**
     * Creates a Promise to import the given XML into the current
     * BpmnJS instance, then returns it as an Observable.
     *
     * @see https://github.com/bpmn-io/bpmn-js-callbacks-to-promises#importxml
     */
    private importDiagram(xml: string): Observable<{ warnings: Array<any> }> {
        return from(this.bpmnJS.importXML(xml) as Promise<{ warnings: Array<any> }>);
    }
}
