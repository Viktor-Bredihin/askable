import { Injectable, inject, signal } from '@angular/core';
import { createAskableIdleSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
const DEFAULT_EVENTS = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
/**
 * Angular service that detects user idleness and exposes the state to AI
 * assistants so they can understand session inactivity.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableIdleSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly idleSource = inject(AskableIdleSourceService);
 *   ngOnInit() { this.idleSource.init({ idleAfterMs: 5 * 60 * 1000 }); }
 * }
 * ```
 */
export class AskableIdleSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'idle';
        this._snapshot = null;
        this._lastActive = Date.now();
        this._idleAfterMs = 5 * 60 * 1000;
        this._cleanup = null;
        this._timer = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'idle', idleAfterMs = 5 * 60 * 1000, activityEvents = DEFAULT_EVENTS, autoTrack = true, describe, kind } = options;
        this._sourceId = id;
        this._idleAfterMs = idleAfterMs;
        this._lastActive = Date.now();
        this._snapshot = { isIdle: false, isActive: true, lastActiveAt: new Date().toISOString(), idleSeconds: 0, secondsSinceActive: 0 };
        const source = createAskableIdleSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (autoTrack && typeof window !== 'undefined') {
            const handler = () => this.markActive();
            activityEvents.forEach((ev) => window.addEventListener(ev, handler, { passive: true }));
            this._timer = setInterval(() => this._update(), 5000);
            this._cleanup = () => {
                activityEvents.forEach((ev) => window.removeEventListener(ev, handler));
                if (this._timer)
                    clearInterval(this._timer);
            };
        }
    }
    _update() {
        const now = Date.now();
        const msSince = now - this._lastActive;
        const isIdle = msSince >= this._idleAfterMs;
        const secondsSinceActive = Math.floor(msSince / 1000);
        this._snapshot = { isIdle, isActive: !isIdle, lastActiveAt: new Date(this._lastActive).toISOString(), idleSeconds: isIdle ? secondsSinceActive : 0, secondsSinceActive };
        this.notifyChanged();
    }
    markActive() {
        this._lastActive = Date.now();
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
        this._cleanup?.();
        this._cleanup = null;
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() { this.unregister(); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableIdleSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableIdleSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableIdleSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-idle-source.service.js.map