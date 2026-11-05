import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateLocaleSourceOptions, AskableLocaleSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableLocaleSourceSnapshot };
export interface AskableLocaleSourceServiceOptions extends AskableCreateLocaleSourceOptions {
    /** Source registration id. Defaults to "locale". */
    id?: string;
}
/**
 * Angular service that exposes the user's locale, timezone, date format, and
 * currency to AI assistants.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableLocaleSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly localeSource = inject(AskableLocaleSourceService);
 *   ngOnInit() { this.localeSource.init(); }
 * }
 * ```
 */
export declare class AskableLocaleSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableLocaleSourceServiceOptions): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableLocaleSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableLocaleSourceService>;
}
//# sourceMappingURL=askable-locale-source.service.d.ts.map