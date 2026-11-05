import { Injectable, inject, signal } from '@angular/core';
import { createAskableWindowSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that exposes viewport dimensions, breakpoint, orientation,
 * and device category to AI assistants.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableWindowSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly windowSource = inject(AskableWindowSourceService);
 *   ngOnInit() { this.windowSource.init(); }
 * }
 * ```
 */
export class AskableWindowSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'window';
        this._cleanup = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    init(options = {}) {
        this.unregister();
        const { id = 'window', autoTrack = true, throttleMs = 150, ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableWindowSource(sourceOptions);
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (autoTrack && typeof window !== 'undefined') {
            let timeoutId = null;
            const notify = () => {
                if (timeoutId)
                    return;
                timeoutId = setTimeout(() => { timeoutId = null; this.notifyChanged(); }, throttleMs);
            };
            window.addEventListener('resize', notify, { passive: true });
            window.addEventListener('orientationchange', notify);
            document.addEventListener('fullscreenchange', notify);
            this._cleanup = () => {
                window.removeEventListener('resize', notify);
                window.removeEventListener('orientationchange', notify);
                document.removeEventListener('fullscreenchange', notify);
                if (timeoutId)
                    clearTimeout(timeoutId);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableWindowSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableWindowSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableWindowSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-window-source.service.js.map