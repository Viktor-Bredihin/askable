import { Injectable, inject, signal } from '@angular/core';
import { createAskableSearchSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that tracks active search state and exposes it to AI
 * assistants so they can explain empty results and suggest alternatives.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableSearchSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly searchSource = inject(AskableSearchSourceService);
 *   ngOnInit() { this.searchSource.init(); }
 *   onSearch(q: string) {
 *     this.searchSource.setQuery(q);
 *     this.searchSource.setSearching(true);
 *     this.api.search(q).subscribe((results) => {
 *       this.searchSource.setResults(results.total);
 *     });
 *   }
 * }
 * ```
 */
export class AskableSearchSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'search';
        this._snapshot = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'search', initialQuery = '', describe, kind } = options;
        this._sourceId = id;
        this._snapshot = { query: initialQuery, isSearching: false, resultCount: null, hasNoResults: false, filters: {}, sort: null, page: null, searchedAt: null };
        const source = createAskableSearchSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
    }
    _patch(update) {
        this._snapshot = { ...this._snapshot, ...update };
        this.notifyChanged();
    }
    setQuery(query) { this._patch({ query, resultCount: null, hasNoResults: false, searchedAt: null }); }
    setResults(count) { this._patch({ resultCount: count, hasNoResults: count === 0, isSearching: false, searchedAt: new Date().toISOString() }); }
    setSearching(searching) { this._patch({ isSearching: searching }); }
    setFilters(filters) { this._patch({ filters, resultCount: null, hasNoResults: false }); }
    setSort(sort) { this._patch({ sort, resultCount: null, hasNoResults: false }); }
    reset() { this._snapshot = { query: '', isSearching: false, resultCount: null, hasNoResults: false, filters: {}, sort: null, page: null, searchedAt: null }; this.notifyChanged(); }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableSearchSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableSearchSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableSearchSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-search-source.service.js.map