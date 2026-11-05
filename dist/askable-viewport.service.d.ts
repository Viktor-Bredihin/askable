import { OnDestroy } from '@angular/core';
import type { AskableFocus } from '@askable-ui/core';
import * as i0 from "@angular/core";
export interface AskableViewportServiceOptions {
    threshold?: number;
    root?: Element | null;
    scope?: string;
}
export declare class AskableViewportService implements OnDestroy {
    readonly visibleItems: import("@angular/core").WritableSignal<AskableFocus[]>;
    readonly promptContext: import("@angular/core").Signal<string>;
    private observer;
    private mutationObserver;
    /** Call from ngOnInit or ngAfterViewInit to start observing */
    observe(options?: AskableViewportServiceOptions): void;
    private scan;
    /** Disconnect observers and clear state */
    disconnect(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableViewportService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableViewportService>;
}
//# sourceMappingURL=askable-viewport.service.d.ts.map