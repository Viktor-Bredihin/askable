import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateSearchSourceOptions, AskableSearchSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableSearchSourceSnapshot };
export interface AskableSearchSourceServiceOptions extends Omit<AskableCreateSearchSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "search". */
    id?: string;
    /** Initial query string. */
    initialQuery?: string;
}
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
export declare class AskableSearchSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableSearchSourceSnapshot | null;
    init(options?: AskableSearchSourceServiceOptions): void;
    private _patch;
    setQuery(query: string): void;
    setResults(count: number): void;
    setSearching(searching: boolean): void;
    setFilters(filters: Record<string, string | string[]>): void;
    setSort(sort: AskableSearchSourceSnapshot['sort']): void;
    reset(): void;
    resolve(request?: {
        mode?: string;
    }): Promise<AskableResolvedContextSource>;
    toPromptContext(options?: {
        mode?: string;
        maxTokens?: number;
    }): Promise<string>;
    notifyChanged(): void;
    unregister(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableSearchSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableSearchSourceService>;
}
//# sourceMappingURL=askable-search-source.service.d.ts.map