import { Injectable, inject, signal } from '@angular/core';
import { createAskableTabSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
function getVisibility() {
    if (typeof document === 'undefined')
        return 'visible';
    return document.visibilityState ?? 'visible';
}
/**
 * Angular service that tracks browser tab visibility using the Page Visibility
 * API and exposes it to AI assistants so they understand when users switch away.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableTabSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly tabSource = inject(AskableTabSourceService);
 *   ngOnInit() { this.tabSource.init(); }
 * }
 * ```
 */
export class AskableTabSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'tab';
        this._snapshot = null;
        this._hideCount = 0;
        this._hiddenSince = null;
        this._visibleSince = null;
        this._cleanup = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'tab', describe, kind } = options;
        this._sourceId = id;
        const vis = getVisibility();
        this._visibleSince = vis === 'visible' ? new Date().toISOString() : null;
        this._hiddenSince = vis === 'hidden' ? new Date().toISOString() : null;
        this._hideCount = 0;
        this._snapshot = {
            visibility: vis,
            isVisible: vis === 'visible',
            isHidden: vis === 'hidden',
            visibleSince: this._visibleSince,
            hiddenSince: this._hiddenSince,
            hideCount: 0,
            hiddenSeconds: 0,
        };
        const source = createAskableTabSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (typeof document !== 'undefined') {
            const handler = () => this._onVisibilityChange();
            document.addEventListener('visibilitychange', handler);
            this._cleanup = () => document.removeEventListener('visibilitychange', handler);
        }
    }
    _onVisibilityChange() {
        const v = getVisibility();
        const now = new Date().toISOString();
        if (v === 'hidden') {
            this._hideCount += 1;
            this._hiddenSince = now;
            this._visibleSince = null;
        }
        else {
            this._hiddenSince = null;
            this._visibleSince = now;
        }
        const hiddenSeconds = this._hiddenSince
            ? Math.floor((Date.now() - new Date(this._hiddenSince).getTime()) / 1000)
            : 0;
        this._snapshot = {
            visibility: v,
            isVisible: v === 'visible',
            isHidden: v === 'hidden',
            visibleSince: this._visibleSince,
            hiddenSince: this._hiddenSince,
            hideCount: this._hideCount,
            hiddenSeconds,
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
        this._cleanup?.();
        this._cleanup = null;
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() { this.unregister(); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableTabSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableTabSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableTabSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-tab-source.service.js.map