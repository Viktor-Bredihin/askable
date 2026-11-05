import { Injectable, inject, signal } from '@angular/core';
import { createAskableMultistepSource, buildMultistepSnapshot } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that tracks wizard, stepper, and checkout flow state and
 * exposes it to AI assistants so they can guide users through multi-step processes.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableMultistepSourceService] })
 * export class CheckoutComponent implements OnInit {
 *   private readonly wizard = inject(AskableMultistepSourceService);
 *   ngOnInit() {
 *     this.wizard.init({
 *       steps: [
 *         { id: 'cart', label: 'Cart' },
 *         { id: 'shipping', label: 'Shipping' },
 *         { id: 'payment', label: 'Payment' },
 *       ],
 *     });
 *   }
 * }
 * ```
 */
export class AskableMultistepSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'multistep';
        this._snapshot = null;
        this._startedAt = new Date().toISOString();
        this._initialStepDefs = [];
        this._initialStep = 0;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'multistep', steps = [], initialStep = 0, describe, kind } = options;
        this._sourceId = id;
        this._initialStepDefs = steps;
        this._initialStep = initialStep;
        this._startedAt = new Date().toISOString();
        this._snapshot = buildMultistepSnapshot(steps.map((s, i) => ({ ...s, completed: false, active: i === initialStep, error: null })), { startedAt: this._startedAt });
        const source = createAskableMultistepSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
    }
    _updateSteps(updater) {
        if (!this._snapshot)
            return;
        const steps = updater([...this._snapshot.steps]);
        this._snapshot = buildMultistepSnapshot(steps, { startedAt: this._snapshot.startedAt });
        this.notifyChanged();
    }
    next() {
        this._updateSteps((steps) => {
            const idx = steps.findIndex((s) => s.active);
            if (idx < 0 || idx >= steps.length - 1)
                return steps;
            steps[idx] = { ...steps[idx], active: false };
            steps[idx + 1] = { ...steps[idx + 1], active: true };
            return steps;
        });
    }
    prev() {
        this._updateSteps((steps) => {
            const idx = steps.findIndex((s) => s.active);
            if (idx <= 0)
                return steps;
            steps[idx] = { ...steps[idx], active: false };
            steps[idx - 1] = { ...steps[idx - 1], active: true };
            return steps;
        });
    }
    goTo(index) {
        this._updateSteps((steps) => steps.map((s, i) => ({ ...s, active: i === index })));
    }
    complete() {
        this._updateSteps((steps) => {
            const idx = steps.findIndex((s) => s.active);
            if (idx < 0)
                return steps;
            steps[idx] = { ...steps[idx], completed: true, active: false, error: null };
            if (idx < steps.length - 1)
                steps[idx + 1] = { ...steps[idx + 1], active: true };
            return steps;
        });
    }
    setError(error) {
        this._updateSteps((steps) => {
            const idx = steps.findIndex((s) => s.active);
            if (idx < 0)
                return steps;
            steps[idx] = { ...steps[idx], error };
            return steps;
        });
    }
    reset() {
        this._startedAt = new Date().toISOString();
        this._snapshot = buildMultistepSnapshot(this._initialStepDefs.map((s, i) => ({ ...s, completed: false, active: i === this._initialStep, error: null })), { startedAt: this._startedAt });
        this.notifyChanged();
    }
    resolve(request) {
        return this.ctx.resolveSource(this._sourceId, request);
    }
    async toPromptContext(options) {
        return this.ctx.toPromptContextAsync({ sources: [{ id: this._sourceId, ...options }] });
    }
    notifyChanged() { this.handle?.notifyChanged(); }
    unregister() {
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() { this.unregister(); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableMultistepSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableMultistepSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableMultistepSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-multistep-source.service.js.map