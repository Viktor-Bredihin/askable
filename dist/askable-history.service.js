import { Injectable, signal, computed } from '@angular/core';
import * as i0 from "@angular/core";
export class AskableHistoryService {
    constructor() {
        this._history = signal([], ...(ngDevMode ? [{ debugName: "_history" }] : /* istanbul ignore next */ []));
        this.history = computed(() => this._history(), ...(ngDevMode ? [{ debugName: "history" }] : /* istanbul ignore next */ []));
        this.current = computed(() => this._history()[0] ?? null, ...(ngDevMode ? [{ debugName: "current" }] : /* istanbul ignore next */ []));
        this.promptContext = computed(() => {
            const entries = this._history();
            if (entries.length === 0)
                return 'No navigation history.';
            const lines = entries.map((f) => {
                const metaStr = typeof f.meta === 'string'
                    ? f.meta
                    : Object.keys(f.meta).length > 0
                        ? JSON.stringify(f.meta)
                        : null;
                return `→ ${metaStr ?? f.text}`;
            });
            return `User navigation trail (most recent first):\n${lines.join('\n')}`;
        }, ...(ngDevMode ? [{ debugName: "promptContext" }] : /* istanbul ignore next */ []));
        this.maxEntries = 10;
        this.dedupe = true;
        this.offHandler = null;
    }
    /** Wire to an AskableContext to start tracking focus changes */
    init(ctx, options) {
        this.maxEntries = options?.maxEntries ?? 10;
        this.dedupe = options?.dedupe ?? true;
        this.offHandler?.();
        const handler = (focus) => this.push(focus);
        ctx.on('focus', handler);
        this.offHandler = () => ctx.off('focus', handler);
    }
    /** Manually push a focus entry */
    push(focus) {
        const key = typeof focus.meta === 'string' ? focus.meta : focus.text;
        this._history.update((prev) => {
            const prevKey = prev[0]
                ? (typeof prev[0].meta === 'string' ? prev[0].meta : prev[0].text)
                : null;
            if (this.dedupe && prevKey === key)
                return prev;
            return [focus, ...prev].slice(0, this.maxEntries);
        });
    }
    clear() {
        this._history.set([]);
    }
    ngOnDestroy() {
        this.offHandler?.();
        this.offHandler = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableHistoryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableHistoryService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableHistoryService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-history.service.js.map