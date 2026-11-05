import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateWindowSourceOptions, AskableDeviceCategory, AskableOrientation, AskableWindowSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableDeviceCategory, AskableOrientation, AskableWindowSourceSnapshot };
export interface AskableWindowSourceServiceOptions extends AskableCreateWindowSourceOptions {
    /** Source registration id. Defaults to "window". */
    id?: string;
    /** Throttle resize events (milliseconds). @default 150 */
    throttleMs?: number;
    /** Automatically listen to resize and orientation change events. @default true */
    autoTrack?: boolean;
}
/**
 * Angular service that exposes viewport dimensions, breakpoint, orientation,
 * and device category to AI assistants.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableWindowSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly windowSource = inject(AskableWindowSourceService);
 *   ngOnInit() { this.windowSource.init(); }
 * }
 * ```
 */
export declare class AskableWindowSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _cleanup;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableWindowSourceServiceOptions): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableWindowSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableWindowSourceService>;
}
//# sourceMappingURL=askable-window-source.service.d.ts.map