import { OnDestroy } from '@angular/core';
import type { AskableAgentRequest, AskableAgentRequestOptions } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type AskableAgentStatus = 'idle' | 'pending' | 'success' | 'error';
export interface AskableAgentServiceOptions {
    onRequest?: (request: AskableAgentRequest) => AskableAgentRequest | void | undefined;
    onSuccess?: (response: unknown, request: AskableAgentRequest) => void;
    onError?: (error: unknown, request: AskableAgentRequest) => void;
    requestOptions?: AskableAgentRequestOptions;
}
/**
 * Angular service that packages the current UI context into an agent request
 * and hands it to your send handler.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableAgentService] })
 * export class AskButtonComponent {
 *   private readonly agent = inject(AskableAgentService);
 *
 *   askAI() {
 *     this.agent.send('What am I looking at?', async (req) =>
 *       fetch('/api/ai', { method: 'POST', body: JSON.stringify(req) }).then(r => r.json())
 *     );
 *   }
 * }
 * ```
 */
export declare class AskableAgentService<T = unknown> implements OnDestroy {
    private readonly askable;
    private options;
    readonly status: import("@angular/core").WritableSignal<AskableAgentStatus>;
    readonly data: import("@angular/core").WritableSignal<T | null>;
    readonly error: import("@angular/core").WritableSignal<unknown>;
    readonly lastRequest: import("@angular/core").WritableSignal<AskableAgentRequest | null>;
    readonly isLoading: import("@angular/core").Signal<boolean>;
    configure(options: AskableAgentServiceOptions): void;
    send(question: string, handler: (request: AskableAgentRequest) => T | Promise<T>): Promise<T | undefined>;
    reset(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableAgentService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableAgentService<any>>;
}
//# sourceMappingURL=askable-agent.service.d.ts.map