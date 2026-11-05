import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreatePageSourceOptions, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export interface AskablePageSourceServiceOptions extends AskableCreatePageSourceOptions {
    /** Source registration id. Defaults to "page". */
    id?: string;
}
/**
 * Angular service that registers a page source capturing the current
 * document title, URL, headings, selected text, and optional links.
 *
 * Automatically uses the root AskableService context. Call init() in
 * ngOnInit to activate, or inject with a config to auto-activate.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskablePageSourceService] })
 * export class MyComponent implements OnInit {
 *   private readonly pageSource = inject(AskablePageSourceService);
 *
 *   ngOnInit() {
 *     this.pageSource.init({ includeLinks: true });
 *   }
 *
 *   async askAI() {
 *     const prompt = await this.pageSource.toPromptContext();
 *   }
 * }
 * ```
 */
export declare class AskablePageSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    readonly kind: import("@angular/core").Signal<"page" | null>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskablePageSourceServiceOptions): void;
    resolve(request?: {
        mode?: string;
        maxItems?: number;
    }): Promise<AskableResolvedContextSource>;
    toPromptContext(options?: {
        mode?: string;
        maxTokens?: number;
    }): Promise<string>;
    notifyChanged(): void;
    unregister(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AskablePageSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskablePageSourceService>;
}
//# sourceMappingURL=askable-page-source.service.d.ts.map