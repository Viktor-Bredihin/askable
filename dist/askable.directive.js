import { Directive, Input, HostBinding } from '@angular/core';
import * as i0 from "@angular/core";
export class AskableDirective {
    constructor() {
        this.meta = '';
    }
    get dataAskable() {
        if (!this.meta)
            return '';
        return typeof this.meta === 'string' ? this.meta : JSON.stringify(this.meta);
    }
    get dataAskableScope() {
        return this.scope;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.23", type: AskableDirective, isStandalone: true, selector: "[askable]", inputs: { meta: ["askable", "meta"], scope: ["askableScope", "scope"] }, host: { properties: { "attr.data-askable": "this.dataAskable", "attr.data-askable-scope": "this.dataAskableScope" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[askable]',
                    standalone: true,
                }]
        }], propDecorators: { meta: [{
                type: Input,
                args: ['askable']
            }], scope: [{
                type: Input,
                args: ['askableScope']
            }], dataAskable: [{
                type: HostBinding,
                args: ['attr.data-askable']
            }], dataAskableScope: [{
                type: HostBinding,
                args: ['attr.data-askable-scope']
            }] } });
//# sourceMappingURL=askable.directive.js.map