import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateStorageSourceOptions, AskableStorageSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableStorageSourceSnapshot };
export interface AskableStorageSourceServiceOptions extends AskableCreateStorageSourceOptions {
    /** Source registration id. Defaults to "storage". */
    id?: string;
}
/**
 * Angular service that exposes localStorage or sessionStorage items to AI
 * assistants so they can see user preferences, cart contents, and session flags.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableStorageSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly storageSource = inject(AskableStorageSourceService);
 *   ngOnInit() {
 *     this.storageSource.init({ keys: ['cart', 'user_prefs'], omitKeys: ['authToken'] });
 *   }
 * }
 * ```
 */
export declare class AskableStorageSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableStorageSourceServiceOptions): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableStorageSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableStorageSourceService>;
}
//# sourceMappingURL=askable-storage-source.service.d.ts.map