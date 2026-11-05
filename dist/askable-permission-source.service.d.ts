import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreatePermissionSourceOptions, AskablePermissionEntry, AskablePermissionName, AskablePermissionState, AskablePermissionSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskablePermissionEntry, AskablePermissionName, AskablePermissionState, AskablePermissionSourceSnapshot };
export interface AskablePermissionSourceServiceOptions extends Omit<AskableCreatePermissionSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "permissions". */
    id?: string;
    /** Query permissions on init. @default true */
    autoQuery?: boolean;
}
/**
 * Angular service that queries browser permission states and exposes them to
 * AI assistants so they can explain why features aren't working.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskablePermissionSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly permSource = inject(AskablePermissionSourceService);
 *   ngOnInit() { this.permSource.init({ permissions: ['camera', 'microphone'] }); }
 * }
 * ```
 */
export declare class AskablePermissionSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _permissions;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskablePermissionSourceSnapshot | null;
    init(options?: AskablePermissionSourceServiceOptions): void;
    refresh(): Promise<void>;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskablePermissionSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskablePermissionSourceService>;
}
//# sourceMappingURL=askable-permission-source.service.d.ts.map