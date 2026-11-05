import { Injectable, inject, signal } from '@angular/core';
import { createAskableStorageSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that exposes localStorage or sessionStorage items to AI
 * assistants so they can see user preferences, cart contents, and session flags.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableStorageSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly storageSource = inject(AskableStorageSourceService);
 *   ngOnInit() {
 *     this.storageSource.init({ keys: ['cart', 'user_prefs'], omitKeys: ['authToken'] });
 *   }
 * }
 * ```
 */
export class AskableStorageSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'storage';
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    init(options = {}) {
        this.unregister();
        const { id = 'storage', ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableStorageSource(sourceOptions);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableStorageSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableStorageSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableStorageSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-storage-source.service.js.map