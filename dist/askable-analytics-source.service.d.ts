import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateAnalyticsSourceOptions, AskableAnalyticsEvent, AskableAnalyticsSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableAnalyticsEvent, AskableAnalyticsSourceSnapshot };
export interface AskableAnalyticsSourceServiceOptions extends Omit<AskableCreateAnalyticsSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "analytics". */
    id?: string;
    /** Maximum events to retain in history. @default 50 */
    maxEvents?: number;
}
/**
 * Angular service that exposes recent analytics events to AI assistants so they
 * understand the user's journey before asking for help.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableAnalyticsSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly analyticsSource = inject(AskableAnalyticsSourceService);
 *   ngOnInit() { this.analyticsSource.init(); }
 *   onCheckout() { this.analyticsSource.track('checkout_started', { items: 3 }); }
 * }
 * ```
 */
export declare class AskableAnalyticsSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _maxEvents;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableAnalyticsSourceSnapshot | null;
    init(options?: AskableAnalyticsSourceServiceOptions): void;
    track(eventName: string, properties?: Record<string, unknown>): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableAnalyticsSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableAnalyticsSourceService>;
}
//# sourceMappingURL=askable-analytics-source.service.d.ts.map