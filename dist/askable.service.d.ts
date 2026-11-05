import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableContextOptions, AskableEvent, AskableFocus } from '@askable-ui/core';
import * as i0 from "@angular/core";
export interface AskableServiceOptions extends AskableContextOptions {
    events?: AskableEvent[];
}
export declare class AskableService implements OnDestroy {
    private readonly ctx;
    private readonly focusHandler;
    private readonly clearHandler;
    readonly focus: import("@angular/core").WritableSignal<AskableFocus | null>;
    readonly promptContext: import("@angular/core").WritableSignal<string>;
    constructor();
    /** Access the raw AskableContext for advanced usage (sources, region capture, etc.) */
    get context(): AskableContext;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableService>;
}
//# sourceMappingURL=askable.service.d.ts.map