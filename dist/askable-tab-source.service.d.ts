import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateTabSourceOptions, AskableTabSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableTabSourceSnapshot };
export interface AskableTabSourceServiceOptions extends Omit<AskableCreateTabSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "tab". */
    id?: string;
}
/**
 * Angular service that tracks browser tab visibility using the Page Visibility
 * API and exposes it to AI assistants so they understand when users switch away.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableTabSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly tabSource = inject(AskableTabSourceService);
 *   ngOnInit() { this.tabSource.init(); }
 * }
 * ```
 */
export declare class AskableTabSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _hideCount;
    private _hiddenSince;
    private _visibleSince;
    private _cleanup;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableTabSourceSnapshot | null;
    init(options?: AskableTabSourceServiceOptions): void;
    private _onVisibilityChange;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableTabSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableTabSourceService>;
}
//# sourceMappingURL=askable-tab-source.service.d.ts.map