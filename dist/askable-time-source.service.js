import { Injectable, inject, signal } from '@angular/core';
import { createAskableTimeSource, buildTimeSnapshot } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that tracks the current local time, timezone, and business
 * hours status and exposes it to AI assistants so they can give time-aware assistance.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableTimeSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly timeSource = inject(AskableTimeSourceService);
 *   ngOnInit() {
 *     this.timeSource.init({ businessHours: { startHour: 8, endHour: 18 } });
 *   }
 * }
 * ```
 */
export class AskableTimeSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'time';
        this._snapshot = null;
        this._timer = null;
        this._sessionStart = Date.now();
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'time', intervalMs = 60000, businessHours = {}, describe, kind } = options;
        this._sourceId = id;
        this._sessionStart = Date.now();
        this._snapshot = buildTimeSnapshot(businessHours, this._sessionStart);
        const source = createAskableTimeSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        this._timer = setInterval(() => {
            this._snapshot = buildTimeSnapshot(businessHours, this._sessionStart);
            this.notifyChanged();
        }, intervalMs);
    }
    resolve(request) {
        return this.ctx.resolveSource(this._sourceId, request);
    }
    async toPromptContext(options) {
        return this.ctx.toPromptContextAsync({ sources: [{ id: this._sourceId, ...options }] });
    }
    notifyChanged() { this.handle?.notifyChanged(); }
    unregister() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() { this.unregister(); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableTimeSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableTimeSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableTimeSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-time-source.service.js.map