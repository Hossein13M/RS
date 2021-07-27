import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-bpmn',
    templateUrl: './bpmn.component.html',
    styleUrls: ['./bpmn.component.scss'],
})
export class BpmnComponent implements OnInit {
    private flowId: string;
    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.getFlowIdFromURL();
    }

    private getFlowIdFromURL(): void {
        this.flowId = this.activatedRoute.snapshot.paramMap.get('id');
    }
}
