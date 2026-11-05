import { Injectable, inject, signal, } from '@angular/core';
import { createAskableScrollSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
const SCROLL_EVENTS = ['scroll'];
/**
 * Angular service that exposes scroll position, reading depth, and active section
 * heading to AI assistants — so they know what content the user is looking at.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableScrollSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly scrollSource = inject(AskableScrollSourceService);
 *
 *   ngOnInit() {
 *     this.scrollSource.init({
 *       getActiveSection: () => this.currentHeading,
 *     });
 *     this.scrollSource.attachListeners(window);
 *   }
 * }
 * ```
 */
export class AskableScrollSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'scroll';
        this._cleanupListeners = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() {
        return this.askable.context;
    }
    get sourceId() {
        return this._sourceId;
    }
    init(options = {}) {
        this.unregister();
        const { id = 'scroll', throttleMs = 100, ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableScrollSource(sourceOptions);
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
    }
    /**
     * Attaches a throttled scroll listener to the given target.
     * Returns a cleanup function to remove the listener.
     */
    attachListeners(target = window, throttleMs = 100) {
        this._cleanupListeners?.();
        let timeoutId = null;
        const notify = () => {
            if (timeoutId)
                return;
            timeoutId = setTimeout(() => {
                timeoutId = null;
                this.notifyChanged();
            }, throttleMs);
        };
        target.addEventListener('scroll', notify, { passive: true });
        const cleanup = () => {
            target.removeEventListener('scroll', notify);
            if (timeoutId)
                clearTimeout(timeoutId);
        };
        this._cleanupListeners = cleanup;
        return cleanup;
    }
    resolve(request) {
        return this.ctx.resolveSource(this._sourceId, request);
    }
    async toPromptContext(options) {
        return this.ctx.toPromptContextAsync({
            sources: [{ id: this._sourceId, ...options }],
        });
    }
    notifyChanged() {
        this.handle?.notifyChanged();
    }
    unregister() {
        this._cleanupListeners?.();
        this._cleanupListeners = null;
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() {
        this.unregister();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableScrollSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableScrollSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableScrollSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-scroll-source.service.js.map