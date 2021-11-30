import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationStructureService } from '../organization-structure.service';
import { OrganizationRole, OrganizationStructureModel, OrganizationUnit, Role, Unit } from '../organization-structure.model';

@Component({
    selector: 'app-role',
    templateUrl: './roles-list.component.html',
    styleUrls: ['./roles-list.component.scss'],
})
export class RolesListComponent implements OnInit {
    loading: boolean = true;
    selectedTreeChartName: string = 'org-unit';
    headerList: Array<{ title: string; icon: string; englishTitle: string }> = [
        { title: 'ساختار سازمانی', icon: 'account_balance', englishTitle: 'org-unit' },
        { title: 'نقش سازمانی', icon: 'supervisor_account', englishTitle: 'org-role' },
    ];
    organizationId: number;
    organizationTitle: string = '';
    organizationInfo: OrganizationStructureModel;
    trees: Array<{ name: string; id: string; show: boolean; zIndex: number; data?: OrganizationRole<Role> | OrganizationUnit<Unit> }> = [
        { name: 'ساختار سازمانی', id: 'unit', show: false, zIndex: 20 },
        { name: 'نقش سازمانی', id: 'role', show: false, zIndex: 19 },
    ];

    constructor(private route: ActivatedRoute, private organizationStructureService: OrganizationStructureService) {}

    ngOnInit(): void {
        this.getOrganizationIdFromURL();
        this.getOrganizationInfo();
        setTimeout(() => (this.loading = false), 1000);
    }

    public detectSectionChanges(event: { selectedSection: 'org-role' | 'org-unit' }): void {
        this.selectedTreeChartName = event.selectedSection;
        event.selectedSection === 'org-role' ? this.getOrganizationRoleByOrgCode() : this.getOrganizationUnitsByOrgCode();
    }

    public selectProperData(): OrganizationRole<Role> | OrganizationUnit<Unit> {
        const mode: string = this.route.snapshot.paramMap.get('orgInfo');
        return mode === 'org-role' ? this.trees[1].data : this.trees[0].data;
    }

    private getOrganizationIdFromURL(): void {
        this.organizationId = +this.route.snapshot.paramMap.get('id');
    }

    private getOrganizationInfo(): void {
        this.organizationStructureService
            .getOrganizationsList({
                skip: 0,
                limit: 0,
                id: this.organizationId,
            })
            .subscribe((response) => {
                this.organizationInfo = response.items[0];
                this.organizationTitle = response.items[0].name;
            });
    }

    private getOrganizationRoleByOrgCode(): void {
        this.organizationStructureService.getOrganizationRoleByOrgCode().subscribe((response) => {
            this.trees[1].data = response;
            this.selectProperData();
        });
    }

    private getOrganizationUnitsByOrgCode(): void {
        this.organizationStructureService.getOrganizationUnits().subscribe((response: any) => {
            response.titleEN = 'unit';
            this.trees[0].data = response;
            this.selectProperData();
        });
    }
}
