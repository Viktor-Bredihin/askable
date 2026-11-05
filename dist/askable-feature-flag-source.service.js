import { Injectable, inject, signal } from '@angular/core';
import { createAskableFeatureFlagSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that exposes feature flag state to AI assistants so they can
 * explain why features are or aren't available.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableFeatureFlagSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly flagSource = inject(AskableFeatureFlagSourceService);
 *
 *   ngOnInit() {
 *     this.flagSource.init({ getFlags: () => this.ldClient.allFlags() });
 *   }
 * }
 * ```
 */
export class AskableFeatureFlagSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'feature-flags';
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    init(options) {
        this.unregister();
        const { id = 'feature-flags', getFlags, ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableFeatureFlagSource({ ...sourceOptions, getFlags });
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableFeatureFlagSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableFeatureFlagSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableFeatureFlagSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-feature-flag-source.service.js.map