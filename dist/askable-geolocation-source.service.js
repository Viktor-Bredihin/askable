import { Injectable, inject, signal } from '@angular/core';
import { createAskableGeolocationSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that tracks the user's geolocation using the Geolocation API
 * and exposes it to AI assistants for location-aware assistance.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableGeolocationSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly geoSource = inject(AskableGeolocationSourceService);
 *   ngOnInit() { this.geoSource.init({ autoRequest: true }); }
 * }
 * ```
 */
export class AskableGeolocationSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'geolocation';
        this._snapshot = null;
        this._watchId = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'geolocation', autoRequest = false, watch = false, positionOptions, describe, kind } = options;
        this._sourceId = id;
        this._snapshot = { coords: null, timestamp: null, hasPosition: false, isLoading: false, error: null, permissionState: 'unknown' };
        const source = createAskableGeolocationSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (typeof navigator === 'undefined' || !navigator.geolocation)
            return;
        if (watch) {
            this._snapshot = { ...this._snapshot, isLoading: true };
            this._watchId = navigator.geolocation.watchPosition((pos) => this._onSuccess(pos), (err) => this._onError(err), positionOptions);
        }
        else if (autoRequest) {
            this.requestPosition(positionOptions);
        }
    }
    _onSuccess(pos) {
        this._snapshot = {
            coords: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                altitude: pos.coords.altitude,
                accuracy: pos.coords.accuracy,
                altitudeAccuracy: pos.coords.altitudeAccuracy,
                heading: pos.coords.heading,
                speed: pos.coords.speed,
            },
            timestamp: new Date(pos.timestamp).toISOString(),
            hasPosition: true,
            isLoading: false,
            error: null,
            permissionState: 'granted',
        };
        this.notifyChanged();
    }
    _onError(err) {
        this._snapshot = {
            ...this._snapshot,
            isLoading: false,
            error: err.message,
            permissionState: err.code === err.PERMISSION_DENIED ? 'denied' : 'unknown',
        };
        this.notifyChanged();
    }
    requestPosition(options) {
        if (typeof navigator === 'undefined' || !navigator.geolocation)
            return;
        this._snapshot = { ...this._snapshot, isLoading: true };
        navigator.geolocation.getCurrentPosition((pos) => this._onSuccess(pos), (err) => this._onError(err), options);
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
        if (this._watchId != null && typeof navigator !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.clearWatch(this._watchId);
            this._watchId = null;
        }
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() { this.unregister(); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableGeolocationSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableGeolocationSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableGeolocationSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-geolocation-source.service.js.map