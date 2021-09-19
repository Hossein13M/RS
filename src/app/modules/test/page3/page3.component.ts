import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-page3',
    templateUrl: './page3.component.html',
    styleUrls: ['./page3.component.scss'],
})
export class Page3Component {
    data = {
        id: 3,
        titleFA: 'فرآیندها',
        titleEN: 'pr',
        icon: 'settings',
        deletedAt: null,
        parentId: null,
        children: [
            {
                id: 21,
                titleFA: 'خدمات تامین مالی',
                titleEN: null,
                icon: '',
                deletedAt: null,
                parentId: 3,
                children: [
                    {
                        id: 22,
                        titleFA: 'تامین مالی',
                        titleEN: null,
                        icon: '',
                        deletedAt: null,
                        parentId: 21,
                        children: [],
                        mappings: [
                            {
                                id: 2,
                                mapParentId: 22,
                                mapChildId: 12,
                                childTitleFa: 'هیات مدیره',
                                childTitleEN: null,
                                childParentId: 1,
                                childIcon: '',
                            },
                        ],
                    },
                    {
                        id: 23,
                        titleFA: 'مشاوره تامین مالی',
                        titleEN: null,
                        icon: '',
                        deletedAt: null,
                        parentId: 21,
                        children: [],
                        mappings: [],
                    },
                ],
                mappings: [],
            },
            {
                id: 24,
                titleFA: 'معامله گری',
                titleEN: null,
                icon: '',
                deletedAt: null,
                parentId: 3,
                children: [],
                mappings: [
                    {
                        id: 1,
                        mapParentId: 24,
                        mapChildId: 14,
                        childTitleFa: 'رئیس حوزه مدیریت',
                        childTitleEN: null,
                        childParentId: 13,
                        childIcon: '',
                    },
                ],
            },
            {
                id: 25,
                titleFA: 'مدیریت دارایی',
                titleEN: null,
                icon: '',
                deletedAt: null,
                parentId: 3,
                children: [],
                mappings: [],
            },
            {
                id: 26,
                titleFA: 'بانکداری تجاری',
                titleEN: null,
                icon: '',
                deletedAt: null,
                parentId: 3,
                children: [],
                mappings: [],
            },
            {
                id: 27,
                titleFA: 'خدمات عاملیت',
                titleEN: null,
                icon: '',
                deletedAt: null,
                parentId: 3,
                children: [],
                mappings: [],
            },
            {
                id: 28,
                titleFA: 'کارگزاری خرد',
                titleEN: null,
                icon: '',
                deletedAt: null,
                parentId: 3,
                children: [],
                mappings: [],
            },
            {
                id: 29,
                titleFA: 'پشتیبانی',
                titleEN: null,
                icon: '',
                deletedAt: null,
                parentId: 3,
                children: [],
                mappings: [],
            },
        ],
        mappings: [],
    };
    fg: FormGroup = this.fb.group({ tree1: ['', []] });

    constructor(private fb: FormBuilder) {}
}
