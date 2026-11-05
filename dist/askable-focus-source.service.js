import { Injectable, inject, signal } from '@angular/core';
import { createAskableFocusSource, elementToFocusSnapshot } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that tracks which element currently has keyboard focus and
 * exposes it to AI assistants so they can provide field-specific assistance.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableFocusSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly focusSource = inject(AskableFocusSourceService);
 *   ngOnInit() { this.focusSource.init(); }
 * }
 * ```
 */
export class AskableFocusSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'focus';
        this._snapshot = null;
        this._changeCount = 0;
        this._cleanup = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'focus', describe, kind } = options;
        this._sourceId = id;
        this._changeCount = 0;
        this._snapshot = { focused: null, hasFocus: false, focusChangeCount: 0, lastChangedAt: null };
        const source = createAskableFocusSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (typeof document !== 'undefined') {
            const handleFocusIn = (e) => {
                const el = e.target;
                this._changeCount += 1;
                this._snapshot = { focused: el ? elementToFocusSnapshot(el) : null, hasFocus: el != null, focusChangeCount: this._changeCount, lastChangedAt: new Date().toISOString() };
                this.notifyChanged();
            };
            const handleFocusOut = () => {
                setTimeout(() => {
                    const active = document.activeElement;
                    if (!active || active === document.body) {
                        this._snapshot = { ...this._snapshot, focused: null, hasFocus: false, lastChangedAt: new Date().toISOString() };
                        this.notifyChanged();
                    }
                }, 0);
            };
            document.addEventListener('focusin', handleFocusIn);
            document.addEventListener('focusout', handleFocusOut);
            this._cleanup = () => {
                document.removeEventListener('focusin', handleFocusIn);
                document.removeEventListener('focusout', handleFocusOut);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableFocusSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableFocusSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableFocusSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-focus-source.service.js.map