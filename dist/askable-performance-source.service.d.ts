import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreatePerformanceSourceOptions, AskablePerformanceMetric, AskablePerformanceSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskablePerformanceMetric, AskablePerformanceSourceSnapshot };
export interface AskablePerformanceSourceServiceOptions extends Omit<AskableCreatePerformanceSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "performance". */
    id?: string;
    /**
     * Automatically collect navigation timing on init.
     * @default true
     */
    autoCollect?: boolean;
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
export declare class AskablePerformanceSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskablePerformanceSourceSnapshot | null;
    init(options?: AskablePerformanceSourceServiceOptions): void;
    addMetric(metricName: string, value: number, rating?: AskablePerformanceMetric['rating']): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskablePerformanceSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskablePerformanceSourceService>;
}
//# sourceMappingURL=askable-performance-source.service.d.ts.map