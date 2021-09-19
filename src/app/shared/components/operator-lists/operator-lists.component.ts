import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OperatorService } from 'app/services/API/services';

@Component({
    selector: 'app-operator-lists',
    templateUrl: './operator-lists.component.html',
    styleUrls: ['./operator-lists.component.scss'],
})
export class OperatorListsComponent implements OnInit {
    operatorsList: any[] = [];
    operators = new FormControl();
    @Output() operatorsID = new EventEmitter<any>();

    constructor(private service: OperatorService) {}

    comboChange(event) {
        if (!event) {
            this.operatorsID.emit(this.operators.value);
        }
    }

    ngOnInit() {
        this.service.operatorControllerGetOperators().subscribe((r) => {
            this.operatorsList = r.items;
        });
    }
}
