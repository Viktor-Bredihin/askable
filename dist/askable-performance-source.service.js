import { Injectable, inject, signal } from '@angular/core';
import { createAskablePerformanceSource, rateMetric } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
function readNavigationTiming() {
    if (typeof performance === 'undefined') {
        return { loadTime: null, ttfb: null, domContentLoaded: null, dnsTime: null, connectTime: null };
    }
    const entries = performance.getEntriesByType?.('navigation');
    const nav = entries?.[0];
    if (!nav) {
        return { loadTime: null, ttfb: null, domContentLoaded: null, dnsTime: null, connectTime: null };
    }
    return {
        loadTime: Math.round(nav.loadEventEnd - nav.startTime),
        ttfb: Math.round(nav.responseStart - nav.requestStart),
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
        dnsTime: Math.round(nav.domainLookupEnd - nav.domainLookupStart),
        connectTime: Math.round(nav.connectEnd - nav.connectStart),
    };
}
function readMemory() {
    const mem = performance.memory;
    if (!mem)
        return null;
    return {
        usedMB: Math.round(mem.usedJSHeapSize / 1024 / 1024),
        totalMB: Math.round(mem.totalJSHeapSize / 1024 / 1024),
        limitMB: Math.round(mem.jsHeapSizeLimit / 1024 / 1024),
    };
}
/**
 * Angular service that collects Core Web Vitals and navigation timing and exposes
 * them to AI assistants so they can proactively warn about performance issues.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskablePerformanceSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly perfSource = inject(AskablePerformanceSourceService);
 *   ngOnInit() { this.perfSource.init(); }
 *   // From web-vitals library:
 *   // onLCP(({ name, value, rating }) => this.perfSource.addMetric(name, value, rating));
 * }
 * ```
 */
export class AskablePerformanceSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'performance';
        this._snapshot = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'performance', autoCollect = true, describe, kind } = options;
        this._sourceId = id;
        const source = createAskablePerformanceSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (autoCollect) {
            const collect = () => {
                const nav = readNavigationTiming();
                const memory = readMemory();
                const metrics = this._snapshot?.metrics ?? [];
                this._snapshot = {
                    navigation: nav,
                    metrics,
                    hasPoorMetrics: metrics.some((m) => m.rating === 'poor'),
                    hasWarningMetrics: metrics.some((m) => m.rating === 'needs-improvement'),
                    memory,
                };
                this.notifyChanged();
            };
            if (typeof document !== 'undefined' && document.readyState === 'complete') {
                collect();
            }
            else if (typeof window !== 'undefined') {
                window.addEventListener('load', collect, { once: true });
            }
        }
    }
    addMetric(metricName, value, rating) {
        const r = rating ?? rateMetric(metricName, value);
        const entry = { name: metricName, value, rating: r, recordedAt: new Date().toISOString() };
        const metrics = [...(this._snapshot?.metrics ?? []).filter((m) => m.name !== metricName), entry];
        this._snapshot = {
            navigation: this._snapshot?.navigation ?? { loadTime: null, ttfb: null, domContentLoaded: null, dnsTime: null, connectTime: null },
            metrics,
            hasPoorMetrics: metrics.some((m) => m.rating === 'poor'),
            hasWarningMetrics: metrics.some((m) => m.rating === 'needs-improvement'),
            memory: this._snapshot?.memory ?? null,
        };
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
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() { this.unregister(); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskablePerformanceSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskablePerformanceSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskablePerformanceSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-performance-source.service.js.map