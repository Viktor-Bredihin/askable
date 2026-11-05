import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateSelectionSourceOptions, AskableSelectionSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableSelectionSourceSnapshot };
export interface AskableSelectionSourceServiceOptions extends AskableCreateSelectionSourceOptions {
    /** Source registration id. Defaults to "selection". */
    id?: string;
    /**
     * Automatically register a selectionchange listener.
     * @default true
     */
    autoTrack?: boolean;
}
/**
 * Angular service that exposes what text the user has currently selected
 * to AI assistants — so the AI can reference exactly what the user is highlighting.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableSelectionSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly selectionSource = inject(AskableSelectionSourceService);
 *
 *   ngOnInit() {
 *     this.selectionSource.init();
 *   }
 * }
 * ```
 */
export declare class AskableSelectionSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _cleanupListener;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableSelectionSourceServiceOptions): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableSelectionSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableSelectionSourceService>;
}
//# sourceMappingURL=askable-selection-source.service.d.ts.map