import { Injectable, signal, computed } from '@angular/core';
import * as i0 from "@angular/core";
export class AskableViewportService {
    constructor() {
        this.visibleItems = signal([], ...(ngDevMode ? [{ debugName: "visibleItems" }] : /* istanbul ignore next */ []));
        this.promptContext = computed(() => {
            const items = this.visibleItems();
            if (items.length === 0)
                return 'No visible elements tracked.';
            const lines = items.map((f) => {
                const meta = typeof f.meta === 'object' ? JSON.stringify(f.meta) : f.meta;
                return meta ? `- ${meta}` : `- ${f.text}`;
            });
            return `Visible UI elements:\n${lines.join('\n')}`;
        }, ...(ngDevMode ? [{ debugName: "promptContext" }] : /* istanbul ignore next */ []));
        this.observer = null;
        this.mutationObserver = null;
    }
    /** Call from ngOnInit or ngAfterViewInit to start observing */
    observe(options) {
        const threshold = options?.threshold ?? 0.1;
        const root = options?.root ?? null;
        const scope = options?.scope;
        this.disconnect();
        this.scan(root, scope);
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const el = entry.target;
                const raw = el.dataset['askable'];
                if (!raw)
                    return;
                let meta = raw;
                try {
                    meta = JSON.parse(raw);
                }
                catch { /* literal string */ }
                const elScope = el.dataset['askableScope'] ?? scope;
                const focus = {
                    element: el,
                    meta,
                    text: el.textContent?.trim() ?? '',
                    source: 'dom',
                    scope: elScope,
                    timestamp: Date.now(),
                };
                this.visibleItems.update((prev) => {
                    const without = prev.filter((f) => f.element !== el);
                    return entry.isIntersecting ? [...without, focus] : without;
                });
            });
        }, { threshold, root });
        this.mutationObserver = new MutationObserver(() => this.scan(root, scope));
        this.mutationObserver.observe(document.body, { childList: true, subtree: true });
    }
    scan(root, scope) {
        const container = root ?? document;
        const selector = scope
            ? `[data-askable][data-askable-scope="${scope}"]`
            : '[data-askable]';
        container.querySelectorAll(selector).forEach((el) => {
            this.observer?.observe(el);
        });
    }
    /** Disconnect observers and clear state */
    disconnect() {
        this.observer?.disconnect();
        this.observer = null;
        this.mutationObserver?.disconnect();
        this.mutationObserver = null;
        this.visibleItems.set([]);
    }
    ngOnDestroy() {
        this.disconnect();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableViewportService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableViewportService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableViewportService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-viewport.service.js.map