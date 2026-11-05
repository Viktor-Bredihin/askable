import { Injectable, inject, signal } from '@angular/core';
import { createAskablePermissionSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
const DEFAULT_PERMISSIONS = ['camera', 'microphone', 'notifications', 'geolocation'];
async function queryAll(names) {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
        return names.map((n) => ({ name: n, state: 'unavailable' }));
    }
    return Promise.all(names.map(async (name) => {
        try {
            const s = await navigator.permissions.query({ name: name });
            return { name, state: s.state };
        }
        catch {
            return { name, state: 'unavailable' };
        }
    }));
}
function toSnapshot(entries) {
    const granted = [];
    const denied = [];
    const prompt = [];
    const unavailable = [];
    for (const e of entries) {
        if (e.state === 'granted')
            granted.push(e.name);
        else if (e.state === 'denied')
            denied.push(e.name);
        else if (e.state === 'prompt')
            prompt.push(e.name);
        else
            unavailable.push(e.name);
    }
    return { permissions: entries, granted, denied, prompt, unavailable };
}
/**
 * Angular service that queries browser permission states and exposes them to
 * AI assistants so they can explain why features aren't working.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskablePermissionSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly permSource = inject(AskablePermissionSourceService);
 *   ngOnInit() { this.permSource.init({ permissions: ['camera', 'microphone'] }); }
 * }
 * ```
 */
export class AskablePermissionSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'permissions';
        this._snapshot = null;
        this._permissions = DEFAULT_PERMISSIONS;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'permissions', permissions = DEFAULT_PERMISSIONS, autoQuery = true, describe, kind } = options;
        this._sourceId = id;
        this._permissions = permissions;
        const source = createAskablePermissionSource({
            getSnapshot: () => this._snapshot,
            describe,
            kind,
        });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (autoQuery) {
            void this.refresh();
        }
    }
    async refresh() {
        const entries = await queryAll(this._permissions);
        this._snapshot = toSnapshot(entries);
        this.notifyChanged();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskablePermissionSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskablePermissionSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskablePermissionSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-permission-source.service.js.map