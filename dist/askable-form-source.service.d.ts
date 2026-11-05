import { ElementRef, OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateFormSourceOptions, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export interface AskableFormSourceServiceOptions extends Omit<AskableCreateFormSourceOptions, 'form'> {
    /** Source registration id. Defaults to "form". */
    id?: string;
    /** Angular ElementRef for a form element. Takes precedence over selector. */
    formRef?: ElementRef<HTMLFormElement>;
    /** CSS selector to locate the form. Defaults to the first form in the document. */
    selector?: string;
    /** When true, notifyChanged is called automatically on input/change events. Defaults to true. */
    autoTrack?: boolean;
}
/**
 * Angular service that registers a form source capturing field names, values,
 * types, labels, and HTML5 validation errors so an AI assistant can provide
 * contextual help, suggest corrections, and guide users through multi-step forms.
 *
 * Passwords are masked by default. Use `omitFields` to exclude sensitive fields.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableFormSourceService] })
 * export class CheckoutComponent implements OnInit, OnDestroy {
 *   \@ViewChild('checkoutForm') formRef!: ElementRef<HTMLFormElement>;
 *   private readonly formSource = inject(AskableFormSourceService);
 *   private readonly agent = inject(AskableAgentService);
 *
 *   ngAfterViewInit() {
 *     this.formSource.init({ formRef: this.formRef, omitFields: ['csrf'] });
 *   }
 *
 *   async getHelp() {
 *     const result = await this.agent.send('Help me fill in this form', async (req) => {
 *       const res = await fetch('/api/form-help', {
 *         method: 'POST',
 *         body: JSON.stringify(req),
 *       });
 *       return res.json();
 *     });
 *   }
 * }
 * ```
 */
export declare class AskableFormSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _cleanup;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableFormSourceServiceOptions): void;
    private _setupAutoTrack;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableFormSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableFormSourceService>;
}
//# sourceMappingURL=askable-form-source.service.d.ts.map