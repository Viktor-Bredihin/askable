import { NgModule } from '@angular/core';
import { AskableDirective } from './askable.directive.js';
import * as i0 from "@angular/core";
/** NgModule for non-standalone Angular apps. Standalone apps can import AskableDirective directly. */
export class AskableModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "21.2.23", ngImport: i0, type: AskableModule, imports: [AskableDirective], exports: [AskableDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AskableDirective],
                    exports: [AskableDirective],
                }]
        }] });
//# sourceMappingURL=askable.module.js.map