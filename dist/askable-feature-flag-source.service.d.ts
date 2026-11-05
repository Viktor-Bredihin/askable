import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateFeatureFlagSourceOptions, AskableFeatureFlagValue, AskableFeatureFlagSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableFeatureFlagValue, AskableFeatureFlagSourceSnapshot };
export interface AskableFeatureFlagSourceServiceOptions extends Omit<AskableCreateFeatureFlagSourceOptions, 'getFlags'> {
    /** Source registration id. Defaults to "feature-flags". */
    id?: string;
}
/**
 * Angular service that exposes feature flag state to AI assistants so they can
 * explain why features are or aren't available.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableFeatureFlagSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly flagSource = inject(AskableFeatureFlagSourceService);
 *
 *   ngOnInit() {
 *     this.flagSource.init({ getFlags: () => this.ldClient.allFlags() });
 *   }
 * }
 * ```
 */
export declare class AskableFeatureFlagSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options: AskableFeatureFlagSourceServiceOptions & {
        getFlags: () => Record<string, AskableFeatureFlagValue> | null | undefined;
    }): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableFeatureFlagSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableFeatureFlagSourceService>;
}
//# sourceMappingURL=askable-feature-flag-source.service.d.ts.map