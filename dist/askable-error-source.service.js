import { Injectable, inject, signal, } from '@angular/core';
import { createAskableErrorSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that registers an error source exposing application error state —
 * form validation errors, API failure messages, caught exceptions — so an AI assistant
 * can diagnose problems and guide the user to resolution.
 *
 * Compatible with Angular Reactive Forms, third-party validators, or any custom error structure.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableErrorSourceService] })
 * export class LoginComponent implements OnInit {
 *   private readonly errorSource = inject(AskableErrorSourceService);
 *   formErrors = signal<Record<string, string>>({});
 *
 *   ngOnInit() {
 *     this.errorSource.init({
 *       getErrors: () => Object.entries(this.formErrors()).map(([key, message]) => ({ key, message })),
 *     });
 *   }
 *
 *   onSubmit() {
 *     if (!valid) {
 *       this.formErrors.set({ email: 'Invalid email' });
 *       this.errorSource.notifyChanged();
 *     }
 *   }
 * }
 * ```
 */
export class AskableErrorSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'errors';
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() {
        return this.askable.context;
    }
    get sourceId() {
        return this._sourceId;
    }
    init(options = {}) {
        this.unregister();
        const { id = 'errors', getErrors, ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableErrorSource({
            ...sourceOptions,
            getErrors: getErrors ?? (() => []),
        });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
    }
    resolve(request) {
        return this.ctx.resolveSource(this._sourceId, request);
    }
    async toPromptContext(options) {
        return this.ctx.toPromptContextAsync({
            sources: [{ id: this._sourceId, ...options }],
        });
    }
    notifyChanged() {
        this.handle?.notifyChanged();
    }
    unregister() {
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() {
        this.unregister();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableErrorSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableErrorSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableErrorSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-error-source.service.js.map