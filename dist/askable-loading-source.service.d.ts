import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateLoadingSourceOptions, AskableLoadingStatus, AskableLoadingEntry, AskableLoadingSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableLoadingStatus, AskableLoadingEntry, AskableLoadingSourceSnapshot };
export interface AskableLoadingSourceServiceOptions extends Omit<AskableCreateLoadingSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "loading". */
    id?: string;
}
/**
 * Angular service that tracks named loading operations and exposes them to AI
 * assistants so they can explain why the UI is loading and diagnose slow requests.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableLoadingSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly loadingSource = inject(AskableLoadingSourceService);
 *   ngOnInit() { this.loadingSource.init(); }
 *   async fetchData() {
 *     this.loadingSource.start('users');
 *     try { await api.getUsers(); this.loadingSource.finish('users'); }
 *     catch (e) { this.loadingSource.error('users', e.message); }
 *   }
 * }
 * ```
 */
export declare class AskableLoadingSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _ops;
    private _snapshot;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableLoadingSourceSnapshot | null;
    init(options?: AskableLoadingSourceServiceOptions): void;
    private _update;
    start(key: string): void;
    finish(key: string): void;
    error(key: string, message?: string): void;
    clear(key: string): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableLoadingSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableLoadingSourceService>;
}
//# sourceMappingURL=askable-loading-source.service.d.ts.map