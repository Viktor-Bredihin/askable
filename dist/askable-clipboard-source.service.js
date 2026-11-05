import { Injectable, inject, signal } from '@angular/core';
import { createAskableClipboardSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that tracks clipboard copy events and exposes the contents
 * to AI assistants so they can reference what the user has copied.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableClipboardSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly clipboardSource = inject(AskableClipboardSourceService);
 *   ngOnInit() { this.clipboardSource.init(); }
 * }
 * ```
 */
export class AskableClipboardSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'clipboard';
        this._snapshot = null;
        this._maxHistory = 10;
        this._maxLength = 5000;
        this._cleanup = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'clipboard', maxHistory = 10, maxLength = 5000, autoTrack = true, describe, kind } = options;
        this._sourceId = id;
        this._maxHistory = maxHistory;
        this._maxLength = maxLength;
        const source = createAskableClipboardSource({ describe, kind, maxHistory, maxLength, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (autoTrack && typeof document !== 'undefined') {
            const handler = (e) => {
                const text = (e.clipboardData?.getData('text/plain') ?? '').slice(0, this._maxLength);
                if (!text)
                    return;
                this._addEntry({ text, copiedAt: new Date().toISOString(), source: 'copy-event' });
            };
            document.addEventListener('copy', handler);
            this._cleanup = () => document.removeEventListener('copy', handler);
        }
    }
    _addEntry(entry) {
        const history = [entry, ...(this._snapshot?.history ?? [])].slice(0, this._maxHistory);
        this._snapshot = { current: entry, history, total: (this._snapshot?.total ?? 0) + 1 };
        this.notifyChanged();
    }
    addEntry(text) {
        this._addEntry({ text: text.slice(0, this._maxLength), copiedAt: new Date().toISOString(), source: 'clipboard-api' });
    }
    clear() {
        this._snapshot = null;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableClipboardSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableClipboardSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableClipboardSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-clipboard-source.service.js.map