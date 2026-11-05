import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateBatterySourceOptions, AskableBatterySourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableBatterySourceSnapshot };
export interface AskableBatterySourceServiceOptions extends Omit<AskableCreateBatterySourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "battery". */
    id?: string;
}
/**
 * Angular service that subscribes to the Battery Status API and exposes device
 * battery level and charging state to AI assistants so they can warn users
 * before starting long tasks when battery is low.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableBatterySourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly batterySource = inject(AskableBatterySourceService);
 *   ngOnInit() { this.batterySource.init(); }
 * }
 * ```
 */
export declare class AskableBatterySourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _battery;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableBatterySourceSnapshot | null;
    init(options?: AskableBatterySourceServiceOptions): void;
    private _update;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableBatterySourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableBatterySourceService>;
}
//# sourceMappingURL=askable-battery-source.service.d.ts.map