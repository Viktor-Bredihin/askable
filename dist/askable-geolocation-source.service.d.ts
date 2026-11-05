import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateGeolocationSourceOptions, AskableGeolocationCoords, AskableGeolocationSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableGeolocationCoords, AskableGeolocationSourceSnapshot };
export interface AskableGeolocationSourceServiceOptions extends Omit<AskableCreateGeolocationSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "geolocation". */
    id?: string;
    /**
     * Automatically request the user's location on init.
     * @default false
     */
    autoRequest?: boolean;
    /**
     * Watch for position changes (continuous tracking).
     * @default false
     */
    watch?: boolean;
    /** Geolocation API options. */
    positionOptions?: PositionOptions;
}
/**
 * Angular service that tracks the user's geolocation using the Geolocation API
 * and exposes it to AI assistants for location-aware assistance.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableGeolocationSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly geoSource = inject(AskableGeolocationSourceService);
 *   ngOnInit() { this.geoSource.init({ autoRequest: true }); }
 * }
 * ```
 */
export declare class AskableGeolocationSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _watchId;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableGeolocationSourceSnapshot | null;
    init(options?: AskableGeolocationSourceServiceOptions): void;
    private _onSuccess;
    private _onError;
    requestPosition(options?: PositionOptions): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableGeolocationSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableGeolocationSourceService>;
}
//# sourceMappingURL=askable-geolocation-source.service.d.ts.map