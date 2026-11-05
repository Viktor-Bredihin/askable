import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateNavigationSourceOptions, AskableNavigationEntry, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableNavigationEntry };
export interface AskableNavigationSourceServiceOptions extends AskableCreateNavigationSourceOptions {
    /** Source registration id. Defaults to "navigation". */
    id?: string;
}
/**
 * Angular service that registers a navigation context source so AI assistants
 * can understand where the user is in the application — current route, page title,
 * route parameters, query string, and navigation history.
 *
 * Integrates with Angular Router by calling `notifyChanged()` in a navigation
 * event subscription.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableNavigationSourceService] })
 * export class AppComponent implements OnInit, OnDestroy {
 *   private readonly navSource = inject(AskableNavigationSourceService);
 *   private readonly router = inject(Router);
 *   private readonly route = inject(ActivatedRoute);
 *   private sub!: Subscription;
 *
 *   ngOnInit() {
 *     this.navSource.init({
 *       getPath: () => this.router.url,
 *       getTitle: () => document.title,
 *     });
 *
 *     this.sub = this.router.events.pipe(
 *       filter(e => e instanceof NavigationEnd)
 *     ).subscribe(() => this.navSource.notifyChanged());
 *   }
 *
 *   ngOnDestroy() { this.sub.unsubscribe(); }
 * }
 * ```
 */
export declare class AskableNavigationSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableNavigationSourceServiceOptions): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableNavigationSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableNavigationSourceService>;
}
//# sourceMappingURL=askable-navigation-source.service.d.ts.map