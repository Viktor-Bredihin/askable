import { Injectable, inject, signal } from '@angular/core';
import { createAskableLoadingSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
function buildSnapshot(ops) {
    const operations = Array.from(ops.values());
    const loading = operations.filter((o) => o.status === 'loading').map((o) => o.key);
    const loaded = operations.filter((o) => o.status === 'loaded').map((o) => o.key);
    const errored = operations.filter((o) => o.status === 'error').map((o) => o.key);
    return { operations, loading, loaded, errored, isLoading: loading.length > 0, activeCount: loading.length };
}
/**
 * Angular service that tracks named loading operations and exposes them to AI
 * assistants so they can explain why the UI is loading and diagnose slow requests.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableLoadingSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly loadingSource = inject(AskableLoadingSourceService);
 *   ngOnInit() { this.loadingSource.init(); }
 *   async fetchData() {
 *     this.loadingSource.start('users');
 *     try { await api.getUsers(); this.loadingSource.finish('users'); }
 *     catch (e) { this.loadingSource.error('users', e.message); }
 *   }
 * }
 * ```
 */
export class AskableLoadingSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'loading';
        this._ops = new Map();
        this._snapshot = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'loading', describe, kind } = options;
        this._sourceId = id;
        const source = createAskableLoadingSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
    }
    _update() {
        this._snapshot = buildSnapshot(this._ops);
        this.notifyChanged();
    }
    start(key) {
        this._ops.set(key, { key, status: 'loading', startedAt: new Date().toISOString(), completedAt: null, durationMs: null, error: null });
        this._update();
    }
    finish(key) {
        const existing = this._ops.get(key);
        const now = new Date().toISOString();
        const startedAt = existing?.startedAt ?? now;
        this._ops.set(key, { key, status: 'loaded', startedAt, completedAt: now, durationMs: new Date(now).getTime() - new Date(startedAt).getTime(), error: null });
        this._update();
    }
    error(key, message) {
        const existing = this._ops.get(key);
        const now = new Date().toISOString();
        const startedAt = existing?.startedAt ?? now;
        this._ops.set(key, { key, status: 'error', startedAt, completedAt: now, durationMs: new Date(now).getTime() - new Date(startedAt).getTime(), error: message ?? 'Unknown error' });
        this._update();
    }
    clear(key) {
        this._ops.delete(key);
        this._update();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableLoadingSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableLoadingSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableLoadingSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-loading-source.service.js.map