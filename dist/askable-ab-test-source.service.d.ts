import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateAbTestSourceOptions, AskableAbTestVariant, AskableAbTestSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableAbTestVariant, AskableAbTestSourceSnapshot };
export interface AskableAbTestSourceServiceOptions extends Omit<AskableCreateAbTestSourceOptions, 'getExperiments'> {
    /** Source registration id. Defaults to "ab-tests". */
    id?: string;
}
/**
 * Angular service that exposes A/B test variant assignments to AI assistants
 * so they can explain why a user sees a different UI.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableAbTestSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly abSource = inject(AskableAbTestSourceService);
 *
 *   ngOnInit() {
 *     this.abSource.init({
 *       getExperiments: () => [{ experiment: 'checkout_flow', variant: this.variant, isControl: this.variant === 'control' }],
 *     });
 *   }
 * }
 * ```
 */
export declare class AskableAbTestSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options: AskableAbTestSourceServiceOptions & {
        getExperiments: () => AskableAbTestVariant[] | null | undefined;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableAbTestSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableAbTestSourceService>;
}
//# sourceMappingURL=askable-ab-test-source.service.d.ts.map