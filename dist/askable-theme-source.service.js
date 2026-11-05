import { Injectable, inject, signal } from '@angular/core';
import { createAskableThemeSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
const THEME_QUERIES = [
    '(prefers-color-scheme: dark)',
    '(prefers-contrast: more)',
    '(prefers-contrast: less)',
    '(prefers-reduced-motion: reduce)',
];
/**
 * Angular service that exposes the user's OS theme preferences and CSS variable
 * values to AI assistants.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableThemeSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly themeSource = inject(AskableThemeSourceService);
 *   ngOnInit() { this.themeSource.init({ cssVars: ['--primary-color'] }); }
 * }
 * ```
 */
export class AskableThemeSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'theme';
        this._cleanup = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    init(options = {}) {
        this.unregister();
        const { id = 'theme', autoTrack = true, ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableThemeSource(sourceOptions);
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (autoTrack && typeof window !== 'undefined') {
            const notify = () => this.notifyChanged();
            const mqls = THEME_QUERIES.map((q) => {
                const mql = window.matchMedia(q);
                mql.addEventListener('change', notify);
                return mql;
            });
            this._cleanup = () => mqls.forEach((mql) => mql.removeEventListener('change', notify));
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableThemeSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableThemeSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableThemeSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-theme-source.service.js.map