import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateNotificationSourceOptions, AskableNotification, AskableNotificationSeverity, AskableNotificationSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableNotification, AskableNotificationSeverity, AskableNotificationSourceSnapshot };
export interface AskableNotificationSourceServiceOptions extends Omit<AskableCreateNotificationSourceOptions, 'getNotifications'> {
    /** Source registration id. Defaults to "notifications". */
    id?: string;
    /**
     * Maximum number of notifications to include in the snapshot.
     * @default 20
     */
    maxNotifications?: number;
}
/**
 * Angular service that tracks active toast messages, banners, and alerts and
 * exposes them to AI assistants so they can acknowledge errors and explain warnings.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableNotificationSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly notifSource = inject(AskableNotificationSourceService);
 *   ngOnInit() { this.notifSource.init(); }
 *   showError(msg: string) {
 *     this.notifSource.add({ id: Date.now().toString(), message: msg, severity: 'error' });
 *   }
 * }
 * ```
 */
export declare class AskableNotificationSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _notifications;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get notifications(): readonly AskableNotification[];
    init(options?: AskableNotificationSourceServiceOptions): void;
    add(notification: AskableNotification): void;
    remove(id: string): void;
    clear(): void;
    setNotifications(notifications: AskableNotification[]): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableNotificationSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableNotificationSourceService>;
}
//# sourceMappingURL=askable-notification-source.service.d.ts.map