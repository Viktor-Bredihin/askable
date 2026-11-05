import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableBusinessHoursConfig, AskableCreateTimeSourceOptions, AskableTimeSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableBusinessHoursConfig, AskableTimeSourceSnapshot };
export interface AskableTimeSourceServiceOptions extends Omit<AskableCreateTimeSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "time". */
    id?: string;
    /**
     * How often to update the snapshot in milliseconds.
     * @default 60000 (1 minute)
     */
    intervalMs?: number;
    /** Custom business hours configuration. */
    businessHours?: AskableBusinessHoursConfig;
}
/**
 * Angular service that tracks the current local time, timezone, and business
 * hours status and exposes it to AI assistants so they can give time-aware assistance.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableTimeSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly timeSource = inject(AskableTimeSourceService);
 *   ngOnInit() {
 *     this.timeSource.init({ businessHours: { startHour: 8, endHour: 18 } });
 *   }
 * }
 * ```
 */
export declare class AskableTimeSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _timer;
    private _sessionStart;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableTimeSourceSnapshot | null;
    init(options?: AskableTimeSourceServiceOptions): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableTimeSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableTimeSourceService>;
}
//# sourceMappingURL=askable-time-source.service.d.ts.map