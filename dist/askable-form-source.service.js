import { Injectable, inject, signal, } from '@angular/core';
import { createAskableFormSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that registers a form source capturing field names, values,
 * types, labels, and HTML5 validation errors so an AI assistant can provide
 * contextual help, suggest corrections, and guide users through multi-step forms.
 *
 * Passwords are masked by default. Use `omitFields` to exclude sensitive fields.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableFormSourceService] })
 * export class CheckoutComponent implements OnInit, OnDestroy {
 *   \@ViewChild('checkoutForm') formRef!: ElementRef<HTMLFormElement>;
 *   private readonly formSource = inject(AskableFormSourceService);
 *   private readonly agent = inject(AskableAgentService);
 *
 *   ngAfterViewInit() {
 *     this.formSource.init({ formRef: this.formRef, omitFields: ['csrf'] });
 *   }
 *
 *   async getHelp() {
 *     const result = await this.agent.send('Help me fill in this form', async (req) => {
 *       const res = await fetch('/api/form-help', {
 *         method: 'POST',
 *         body: JSON.stringify(req),
 *       });
 *       return res.json();
 *     });
 *   }
 * }
 * ```
 */
export class AskableFormSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'form';
        this._cleanup = null;
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
        const { id = 'form', formRef, selector, autoTrack = true, ...formOptions } = options;
        this._sourceId = id;
        const source = createAskableFormSource({
            ...formOptions,
            form: formRef ? () => formRef.nativeElement : selector,
        });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
        if (autoTrack) {
            this._setupAutoTrack(formRef, selector);
        }
    }
    _setupAutoTrack(formRef, selector) {
        const resolveEl = () => formRef?.nativeElement ??
            (selector
                ? document.querySelector(selector)
                : document.querySelector('form'));
        const form = resolveEl();
        if (!form)
            return;
        const handleChange = () => this.notifyChanged();
        form.addEventListener('input', handleChange);
        form.addEventListener('change', handleChange);
        this._cleanup = () => {
            form.removeEventListener('input', handleChange);
            form.removeEventListener('change', handleChange);
        };
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
        this._cleanup?.();
        this._cleanup = null;
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() {
        this.unregister();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableFormSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableFormSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableFormSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-form-source.service.js.map