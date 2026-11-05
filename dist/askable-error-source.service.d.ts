import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateErrorSourceOptions, AskableErrorEntry, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableErrorEntry };
export interface AskableErrorSourceServiceOptions extends Omit<AskableCreateErrorSourceOptions, 'getErrors'> {
    /** Source registration id. Defaults to "errors". */
    id?: string;
}
/**
 * Angular service that registers an error source exposing application error state —
 * form validation errors, API failure messages, caught exceptions — so an AI assistant
 * can diagnose problems and guide the user to resolution.
 *
 * Compatible with Angular Reactive Forms, third-party validators, or any custom error structure.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableErrorSourceService] })
 * export class LoginComponent implements OnInit {
 *   private readonly errorSource = inject(AskableErrorSourceService);
 *   formErrors = signal<Record<string, string>>({});
 *
 *   ngOnInit() {
 *     this.errorSource.init({
 *       getErrors: () => Object.entries(this.formErrors()).map(([key, message]) => ({ key, message })),
 *     });
 *   }
 *
 *   onSubmit() {
 *     if (!valid) {
 *       this.formErrors.set({ email: 'Invalid email' });
 *       this.errorSource.notifyChanged();
 *     }
 *   }
 * }
 * ```
 */
export declare class AskableErrorSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableErrorSourceServiceOptions & {
        getErrors?: () => AskableErrorEntry[];
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableErrorSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableErrorSourceService>;
}
//# sourceMappingURL=askable-error-source.service.d.ts.map