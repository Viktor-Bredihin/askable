import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateThemeSourceOptions, AskableColorScheme, AskableContrastPreference, AskableMotionPreference, AskableThemeSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableColorScheme, AskableContrastPreference, AskableMotionPreference, AskableThemeSourceSnapshot };
export interface AskableThemeSourceServiceOptions extends AskableCreateThemeSourceOptions {
    /** Source registration id. Defaults to "theme". */
    id?: string;
    /** Automatically listen to prefers-color-scheme and related media query changes. @default true */
    autoTrack?: boolean;
}
/**
 * Angular service that exposes the user's OS theme preferences and CSS variable
 * values to AI assistants.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableThemeSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly themeSource = inject(AskableThemeSourceService);
 *   ngOnInit() { this.themeSource.init({ cssVars: ['--primary-color'] }); }
 * }
 * ```
 */
export declare class AskableThemeSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _cleanup;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableThemeSourceServiceOptions): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableThemeSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableThemeSourceService>;
}
//# sourceMappingURL=askable-theme-source.service.d.ts.map