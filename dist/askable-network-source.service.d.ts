import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateNetworkSourceOptions, AskableNetworkConnectionType, AskableNetworkEffectiveType, AskableNetworkSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableNetworkConnectionType, AskableNetworkEffectiveType, AskableNetworkSourceSnapshot };
export interface AskableNetworkSourceServiceOptions extends AskableCreateNetworkSourceOptions {
    /** Source registration id. Defaults to "network". */
    id?: string;
    /** Automatically listen to online/offline and connection change events. @default true */
    autoTrack?: boolean;
}
/**
 * Angular service that exposes the device's network status to AI assistants —
 * online/offline, connection type, bandwidth, and latency.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableNetworkSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly networkSource = inject(AskableNetworkSourceService);
 *   ngOnInit() { this.networkSource.init(); }
 * }
 * ```
 */
export declare class AskableNetworkSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _cleanup;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableNetworkSourceServiceOptions): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableNetworkSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableNetworkSourceService>;
}
//# sourceMappingURL=askable-network-source.service.d.ts.map