import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableFocus } from '@askable-ui/core';
import * as i0 from "@angular/core";
export interface AskableHistoryServiceOptions {
    maxEntries?: number;
    dedupe?: boolean;
}
export declare class AskableHistoryService implements OnDestroy {
    private readonly _history;
    readonly history: import("@angular/core").Signal<AskableFocus[]>;
    readonly current: import("@angular/core").Signal<AskableFocus>;
    readonly promptContext: import("@angular/core").Signal<string>;
    private maxEntries;
    private dedupe;
    private offHandler;
    /** Wire to an AskableContext to start tracking focus changes */
    init(ctx: AskableContext, options?: AskableHistoryServiceOptions): void;
    /** Manually push a focus entry */
    push(focus: AskableFocus): void;
    clear(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableHistoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableHistoryService>;
}
//# sourceMappingURL=askable-history.service.d.ts.map