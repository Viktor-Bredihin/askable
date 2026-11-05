import { Injectable, inject, signal } from '@angular/core';
import { createAskableAbTestSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that exposes A/B test variant assignments to AI assistants
 * so they can explain why a user sees a different UI.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableAbTestSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly abSource = inject(AskableAbTestSourceService);
 *
 *   ngOnInit() {
 *     this.abSource.init({
 *       getExperiments: () => [{ experiment: 'checkout_flow', variant: this.variant, isControl: this.variant === 'control' }],
 *     });
 *   }
 * }
 * ```
 */
export class AskableAbTestSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'ab-tests';
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    init(options) {
        this.unregister();
        const { id = 'ab-tests', getExperiments, ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableAbTestSource({ ...sourceOptions, getExperiments });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
    }
    resolve(request) {
        return this.ctx.resolveSource(this._sourceId, request);
    }
    async toPromptContext(options) {
        return this.ctx.toPromptContextAsync({ sources: [{ id: this._sourceId, ...options }] });
    }
    notifyChanged() { this.handle?.notifyChanged(); }
    unregister() {
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() { this.unregister(); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableAbTestSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableAbTestSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableAbTestSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-ab-test-source.service.js.map