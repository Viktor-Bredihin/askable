import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateConnectionSourceOptions, AskableConnectionStatus, AskableConnectionProtocol, AskableConnectionSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableConnectionStatus, AskableConnectionProtocol, AskableConnectionSourceSnapshot };
export interface AskableConnectionSourceServiceOptions extends Omit<AskableCreateConnectionSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "connection". */
    id?: string;
    /** Underlying transport protocol. @default "websocket" */
    protocol?: AskableConnectionProtocol;
    /** Optional label. */
    label?: string;
    /** Initial status. @default "disconnected" */
    initialStatus?: AskableConnectionStatus;
}
/**
 * Angular service that exposes WebSocket / SSE / polling connection state to AI
 * assistants so they can explain why real-time features aren't updating.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableConnectionSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly connSource = inject(AskableConnectionSourceService);
 *   ngOnInit() {
 *     this.connSource.init({ protocol: 'websocket', label: 'chat' });
 *     this.socket.on('connect', () => this.connSource.setStatus('connected'));
 *     this.socket.on('disconnect', () => this.connSource.setStatus('disconnected'));
 *   }
 * }
 * ```
 */
export declare class AskableConnectionSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _protocol;
    private _label;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableConnectionSourceSnapshot | null;
    init(options?: AskableConnectionSourceServiceOptions): void;
    setStatus(status: AskableConnectionStatus, extra?: Partial<Pick<AskableConnectionSourceSnapshot, 'reconnectAttempts' | 'lastError'>>): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableConnectionSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableConnectionSourceService>;
}
//# sourceMappingURL=askable-connection-source.service.d.ts.map