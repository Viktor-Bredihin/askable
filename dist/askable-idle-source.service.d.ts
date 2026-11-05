import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateIdleSourceOptions, AskableIdleSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableIdleSourceSnapshot };
export interface AskableIdleSourceServiceOptions extends Omit<AskableCreateIdleSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "idle". */
    id?: string;
    /** Milliseconds of inactivity before idle. @default 300000 (5 min) */
    idleAfterMs?: number;
    /** DOM events that reset the idle timer. */
    activityEvents?: string[];
    /** Automatically listen to activity events. @default true */
    autoTrack?: boolean;
}
/**
 * Angular service that detects user idleness and exposes the state to AI
 * assistants so they can understand session inactivity.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableIdleSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly idleSource = inject(AskableIdleSourceService);
 *   ngOnInit() { this.idleSource.init({ idleAfterMs: 5 * 60 * 1000 }); }
 * }
 * ```
 */
export declare class AskableIdleSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _lastActive;
    private _idleAfterMs;
    private _cleanup;
    private _timer;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableIdleSourceSnapshot | null;
    init(options?: AskableIdleSourceServiceOptions): void;
    private _update;
    markActive(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableIdleSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableIdleSourceService>;
}
//# sourceMappingURL=askable-idle-source.service.d.ts.map