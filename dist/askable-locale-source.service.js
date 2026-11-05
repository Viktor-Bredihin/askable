import { Injectable, inject, signal } from '@angular/core';
import { createAskableLocaleSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that exposes the user's locale, timezone, date format, and
 * currency to AI assistants.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableLocaleSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly localeSource = inject(AskableLocaleSourceService);
 *   ngOnInit() { this.localeSource.init(); }
 * }
 * ```
 */
export class AskableLocaleSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'locale';
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    init(options = {}) {
        this.unregister();
        const { id = 'locale', ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableLocaleSource(sourceOptions);
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableLocaleSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableLocaleSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableLocaleSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-locale-source.service.js.map