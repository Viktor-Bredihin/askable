import { Injectable, inject, signal } from '@angular/core';
import { createAskableNetworkSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that exposes the device's network status to AI assistants —
 * online/offline, connection type, bandwidth, and latency.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableNetworkSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly networkSource = inject(AskableNetworkSourceService);
 *   ngOnInit() { this.networkSource.init(); }
 * }
 * ```
 */
export class AskableNetworkSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'network';
        this._cleanup = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    init(options = {}) {
        this.unregister();
        const { id = 'network', autoTrack = true, ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableNetworkSource(sourceOptions);
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (autoTrack && typeof window !== 'undefined') {
            const notify = () => this.notifyChanged();
            window.addEventListener('online', notify);
            window.addEventListener('offline', notify);
            const conn = navigator.connection;
            conn?.addEventListener('change', notify);
            this._cleanup = () => {
                window.removeEventListener('online', notify);
                window.removeEventListener('offline', notify);
                conn?.removeEventListener('change', notify);
            };
        }
    }
    resolve(request) {
        return this.ctx.resolveSource(this._sourceId, request);
    }
    async toPromptContext(options) {
        return this.ctx.toPromptContextAsync({ sources: [{ id: this._sourceId, ...options }] });
    }
    notifyChanged() { this.handle?.notifyChanged(); }
    unregister() {
        this._cleanup?.();
        this._cleanup = null;
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() { this.unregister(); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableNetworkSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableNetworkSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableNetworkSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-network-source.service.js.map