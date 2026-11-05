import { Injectable, inject, signal, } from '@angular/core';
import { createAskableSelectionSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that exposes what text the user has currently selected
 * to AI assistants — so the AI can reference exactly what the user is highlighting.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableSelectionSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly selectionSource = inject(AskableSelectionSourceService);
 *
 *   ngOnInit() {
 *     this.selectionSource.init();
 *   }
 * }
 * ```
 */
export class AskableSelectionSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'selection';
        this._cleanupListener = null;
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
        const { id = 'selection', autoTrack = true, ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableSelectionSource(sourceOptions);
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (autoTrack) {
            const notify = () => this.notifyChanged();
            document.addEventListener('selectionchange', notify);
            this._cleanupListener = () => document.removeEventListener('selectionchange', notify);
        }
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
        this._cleanupListener?.();
        this._cleanupListener = null;
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() {
        this.unregister();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableSelectionSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableSelectionSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableSelectionSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-selection-source.service.js.map