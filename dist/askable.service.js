import { Injectable, signal } from '@angular/core';
import { createAskableContext } from '@askable-ui/core';
import * as i0 from "@angular/core";
export class AskableService {
    constructor() {
        this.focusHandler = (f) => this.focus.set(f);
        this.clearHandler = (_) => {
            this.focus.set(null);
            this.promptContext.set('');
        };
        this.focus = signal(null, ...(ngDevMode ? [{ debugName: "focus" }] : /* istanbul ignore next */ []));
        this.promptContext = signal('', ...(ngDevMode ? [{ debugName: "promptContext" }] : /* istanbul ignore next */ []));
        this.ctx = createAskableContext();
        if (typeof document !== 'undefined') {
            this.ctx.observe(document);
        }
        this.ctx.on('focus', this.focusHandler);
        this.ctx.on('clear', this.clearHandler);
        this.ctx.on('focus', () => {
            this.promptContext.set(this.ctx.toPromptContext());
        });
    }
    /** Access the raw AskableContext for advanced usage (sources, region capture, etc.) */
    get context() {
        return this.ctx;
    }
    ngOnDestroy() {
        this.ctx.off('focus', this.focusHandler);
        this.ctx.off('clear', this.clearHandler);
        this.ctx.destroy();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=askable.service.js.map