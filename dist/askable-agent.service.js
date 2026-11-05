import { Injectable, inject, signal, computed } from '@angular/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
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
export class AskableAgentService {
    constructor() {
        this.askable = inject(AskableService);
        this.options = {};
        this.status = signal('idle', ...(ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []));
        this.data = signal(null, ...(ngDevMode ? [{ debugName: "data" }] : /* istanbul ignore next */ []));
        this.error = signal(null, ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
        this.lastRequest = signal(null, ...(ngDevMode ? [{ debugName: "lastRequest" }] : /* istanbul ignore next */ []));
        this.isLoading = computed(() => this.status() === 'pending', ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    }
    configure(options) {
        this.options = options;
    }
    async send(question, handler) {
        this.status.set('pending');
        this.error.set(null);
        let request = await this.askable.context.toAgentRequest(question, this.options.requestOptions);
        if (this.options.onRequest) {
            const modified = this.options.onRequest(request);
            if (modified != null)
                request = modified;
        }
        this.lastRequest.set(request);
        try {
            const result = await handler(request);
            this.data.set(result);
            this.status.set('success');
            this.options.onSuccess?.(result, request);
            return result;
        }
        catch (err) {
            this.error.set(err);
            this.status.set('error');
            this.options.onError?.(err, request);
            return undefined;
        }
    }
    reset() {
        this.status.set('idle');
        this.data.set(null);
        this.error.set(null);
        this.lastRequest.set(null);
    }
    ngOnDestroy() {
        this.reset();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableAgentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableAgentService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableAgentService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-agent.service.js.map