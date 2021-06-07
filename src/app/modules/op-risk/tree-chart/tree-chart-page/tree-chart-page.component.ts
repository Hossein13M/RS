import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeMappingService } from '../tree-mapping.service';

@Component({
    selector: 'app-tree-chart-page',
    templateUrl: './tree-chart-page.component.html',
    styleUrls: ['./tree-chart-page.component.scss'],
})
export class TreeChartPageComponent implements OnInit {
    selectedChartName: string;

    constructor(private route: ActivatedRoute, private tms: TreeMappingService) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            if (!params) return;
            this.selectedChartName = params.get('name');
        });
        this.tms.getMappingCategory().subscribe((res) => console.log(res));
    }
}
