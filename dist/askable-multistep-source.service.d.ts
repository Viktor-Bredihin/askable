import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateMultistepSourceOptions, AskableMultistepStep, AskableMultistepSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableMultistepStep, AskableMultistepSourceSnapshot };
export interface AskableMultistepSourceServiceOptions extends Omit<AskableCreateMultistepSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "multistep". */
    id?: string;
    /** Initial step definitions. */
    steps?: Pick<AskableMultistepStep, 'id' | 'label' | 'description' | 'optional'>[];
    /** Index of the initially active step. @default 0 */
    initialStep?: number;
}
/**
 * Angular service that tracks wizard, stepper, and checkout flow state and
 * exposes it to AI assistants so they can guide users through multi-step processes.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableMultistepSourceService] })
 * export class CheckoutComponent implements OnInit {
 *   private readonly wizard = inject(AskableMultistepSourceService);
 *   ngOnInit() {
 *     this.wizard.init({
 *       steps: [
 *         { id: 'cart', label: 'Cart' },
 *         { id: 'shipping', label: 'Shipping' },
 *         { id: 'payment', label: 'Payment' },
 *       ],
 *     });
 *   }
 * }
 * ```
 */
export declare class AskableMultistepSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _startedAt;
    private _initialStepDefs;
    private _initialStep;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableMultistepSourceSnapshot | null;
    init(options?: AskableMultistepSourceServiceOptions): void;
    private _updateSteps;
    next(): void;
    prev(): void;
    goTo(index: number): void;
    complete(): void;
    setError(error: string | null): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableMultistepSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableMultistepSourceService>;
}
//# sourceMappingURL=askable-multistep-source.service.d.ts.map