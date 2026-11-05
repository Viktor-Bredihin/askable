import { Injectable, inject, signal } from '@angular/core';
import { createAskableAnalyticsSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that exposes recent analytics events to AI assistants so they
 * understand the user's journey before asking for help.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableAnalyticsSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly analyticsSource = inject(AskableAnalyticsSourceService);
 *   ngOnInit() { this.analyticsSource.init(); }
 *   onCheckout() { this.analyticsSource.track('checkout_started', { items: 3 }); }
 * }
 * ```
 */
export class AskableAnalyticsSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'analytics';
        this._snapshot = null;
        this._maxEvents = 50;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'analytics', maxEvents = 50, describe, kind } = options;
        this._sourceId = id;
        this._maxEvents = maxEvents;
        const source = createAskableAnalyticsSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
    }
    track(eventName, properties) {
        const entry = { name: eventName, properties, recordedAt: new Date().toISOString() };
        const existing = this._snapshot?.events ?? [];
        const updated = [entry, ...existing].slice(0, this._maxEvents);
        this._snapshot = { events: updated, total: (this._snapshot?.total ?? 0) + 1, latestEvent: eventName };
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableAnalyticsSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableAnalyticsSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableAnalyticsSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-analytics-source.service.js.map