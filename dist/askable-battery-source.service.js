import { Injectable, inject, signal } from '@angular/core';
import { createAskableBatterySource, getBatteryStatus, formatDuration } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that subscribes to the Battery Status API and exposes device
 * battery level and charging state to AI assistants so they can warn users
 * before starting long tasks when battery is low.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableBatterySourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly batterySource = inject(AskableBatterySourceService);
 *   ngOnInit() { this.batterySource.init(); }
 * }
 * ```
 */
export class AskableBatterySourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'battery';
        this._snapshot = null;
        this._battery = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'battery', describe, kind } = options;
        this._sourceId = id;
        const source = createAskableBatterySource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        const nav = (typeof navigator !== 'undefined' ? navigator : null);
        if (nav?.getBattery) {
            nav.getBattery().then((battery) => {
                this._battery = battery;
                this._update();
                battery.addEventListener('levelchange', () => this._update());
                battery.addEventListener('chargingchange', () => this._update());
                battery.addEventListener('chargingtimechange', () => this._update());
                battery.addEventListener('dischargingtimechange', () => this._update());
            }).catch(() => undefined);
        }
    }
    _update() {
        const b = this._battery;
        if (!b)
            return;
        const level = Math.round(b.level * 100);
        const chargingTime = isFinite(b.chargingTime) ? b.chargingTime : null;
        const dischargingTime = isFinite(b.dischargingTime) ? b.dischargingTime : null;
        this._snapshot = {
            level,
            charging: b.charging,
            chargingTime,
            dischargingTime,
            chargingTimeLabel: formatDuration(chargingTime),
            dischargingTimeLabel: formatDuration(dischargingTime),
            status: getBatteryStatus(level),
        };
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableBatterySourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableBatterySourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableBatterySourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-battery-source.service.js.map