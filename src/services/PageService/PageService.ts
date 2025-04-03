import {Service} from "laravel-jstools-di";

import {PageServiceContract} from "./contracts/PageServiceContract";

export class PageService extends Service implements PageServiceContract {
    protected pageList: Array<any>;

    constructor() {
        super();
        this.pageList = [];
    }

    public init(): void {
        $(() => {
            this.pageList.forEach((page, i, arr) => {
                const pageObj = new page;
                if (document.getElementsByClassName(pageObj.pageId).length) {
                    pageObj.init();
                }
            });

            if (typeof window.notyData !== 'undefined') {
                window.noty(window.notyData);
            }
        });
    }

    public registerPageList(pageList: Array<any>): void {
        this.pageList = [...this.pageList, ...pageList];
    }
}
