import { Injectable, inject, signal, computed } from '@angular/core';
import { createAskablePageSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that registers a page source capturing the current
 * document title, URL, headings, selected text, and optional links.
 *
 * Automatically uses the root AskableService context. Call init() in
 * ngOnInit to activate, or inject with a config to auto-activate.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskablePageSourceService] })
 * export class MyComponent implements OnInit {
 *   private readonly pageSource = inject(AskablePageSourceService);
 *
 *   ngOnInit() {
 *     this.pageSource.init({ includeLinks: true });
 *   }
 *
 *   async askAI() {
 *     const prompt = await this.pageSource.toPromptContext();
 *   }
 * }
 * ```
 */
export class AskablePageSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'page';
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
        this.kind = computed(() => this.isRegistered() ? 'page' : null, ...(ngDevMode ? [{ debugName: "kind" }] : /* istanbul ignore next */ []));
    }
    get ctx() {
        return this.askable.context;
    }
    get sourceId() {
        return this._sourceId;
    }
    init(options = {}) {
        if (this.handle) {
            this.handle.unregister();
            this.handle = null;
        }
        const { id = 'page', ...pageOptions } = options;
        this._sourceId = id;
        const source = createAskablePageSource(pageOptions);
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
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
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() {
        this.unregister();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskablePageSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskablePageSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskablePageSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-page-source.service.js.map