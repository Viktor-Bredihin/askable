import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateFocusSourceOptions, AskableFocusedElementSnapshot, AskableFocusSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableFocusedElementSnapshot, AskableFocusSourceSnapshot };
export interface AskableFocusSourceServiceOptions extends Omit<AskableCreateFocusSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "focus". */
    id?: string;
}
/**
 * Angular service that tracks which element currently has keyboard focus and
 * exposes it to AI assistants so they can provide field-specific assistance.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableFocusSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly focusSource = inject(AskableFocusSourceService);
 *   ngOnInit() { this.focusSource.init(); }
 * }
 * ```
 */
export declare class AskableFocusSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _changeCount;
    private _cleanup;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableFocusSourceSnapshot | null;
    init(options?: AskableFocusSourceServiceOptions): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableFocusSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableFocusSourceService>;
}
//# sourceMappingURL=askable-focus-source.service.d.ts.map