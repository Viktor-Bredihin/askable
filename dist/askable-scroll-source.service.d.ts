import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateScrollSourceOptions, AskableScrollState, AskableScrollSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableScrollState, AskableScrollSourceSnapshot };
export interface AskableScrollSourceServiceOptions extends AskableCreateScrollSourceOptions {
    /** Source registration id. Defaults to "scroll". */
    id?: string;
    /**
     * Throttle scroll events (milliseconds).
     * @default 100
     */
    throttleMs?: number;
}
/**
 * Angular service that exposes scroll position, reading depth, and active section
 * heading to AI assistants — so they know what content the user is looking at.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableScrollSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly scrollSource = inject(AskableScrollSourceService);
 *
 *   ngOnInit() {
 *     this.scrollSource.init({
 *       getActiveSection: () => this.currentHeading,
 *     });
 *     this.scrollSource.attachListeners(window);
 *   }
 * }
 * ```
 */
export declare class AskableScrollSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _cleanupListeners;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableScrollSourceServiceOptions): void;
    /**
     * Attaches a throttled scroll listener to the given target.
     * Returns a cleanup function to remove the listener.
     */
    attachListeners(target?: EventTarget, throttleMs?: number): () => void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableScrollSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableScrollSourceService>;
}
//# sourceMappingURL=askable-scroll-source.service.d.ts.map