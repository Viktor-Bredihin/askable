import { Injectable, inject, signal } from '@angular/core';
import { createAskableCartSource, buildCartSnapshot } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that tracks shopping cart state and exposes it to AI
 * assistants so they can answer questions about cart contents and totals.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableCartSourceService] })
 * export class CartComponent implements OnInit {
 *   private readonly cart = inject(AskableCartSourceService);
 *   ngOnInit() {
 *     this.cart.init({ items: [], totals: { currency: 'USD' } });
 *   }
 *   addToCart(item: AskableCartItem) { this.cart.addItem(item); }
 * }
 * ```
 */
export class AskableCartSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'cart';
        this._snapshot = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get snapshot() { return this._snapshot; }
    get sourceId() { return this._sourceId; }
    init(options = {}) {
        this.unregister();
        const { id = 'cart', items = [], totals = {}, describe, kind } = options;
        this._sourceId = id;
        this._snapshot = buildCartSnapshot(items, totals, new Date().toISOString());
        const source = createAskableCartSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.askable.context.registerSource(id, source);
        this.isRegistered.set(true);
    }
    _getTotals() {
        const s = this._snapshot;
        return s ? { discount: s.discount, tax: s.tax, shipping: s.shipping, currency: s.currency, couponCode: s.couponCode } : {};
    }
    addItem(item) {
        if (!this._snapshot)
            return;
        const idx = this._snapshot.items.findIndex((i) => i.id === item.id);
        const items = idx >= 0
            ? this._snapshot.items.map((i, k) => (k === idx ? item : i))
            : [...this._snapshot.items, item];
        this._snapshot = buildCartSnapshot(items, this._getTotals(), new Date().toISOString());
        this.notifyChanged();
    }
    removeItem(id) {
        if (!this._snapshot)
            return;
        this._snapshot = buildCartSnapshot(this._snapshot.items.filter((i) => i.id !== id), this._getTotals(), new Date().toISOString());
        this.notifyChanged();
    }
    updateQuantity(id, quantity) {
        if (!this._snapshot)
            return;
        const items = quantity <= 0
            ? this._snapshot.items.filter((i) => i.id !== id)
            : this._snapshot.items.map((i) => (i.id === id ? { ...i, quantity } : i));
        this._snapshot = buildCartSnapshot(items, this._getTotals(), new Date().toISOString());
        this.notifyChanged();
    }
    setItems(items) {
        if (!this._snapshot)
            return;
        this._snapshot = buildCartSnapshot(items, this._getTotals(), new Date().toISOString());
        this.notifyChanged();
    }
    setTotals(totals) {
        if (!this._snapshot)
            return;
        this._snapshot = buildCartSnapshot(this._snapshot.items, totals, new Date().toISOString());
        this.notifyChanged();
    }
    clearCart() {
        const currency = this._snapshot?.currency ?? 'USD';
        this._snapshot = buildCartSnapshot([], { discount: 0, tax: 0, shipping: 0, currency, couponCode: null }, new Date().toISOString());
        this.notifyChanged();
    }
    resolve(request) {
        return this.askable.context.resolveSource(this._sourceId, request);
    }
    async toPromptContext(options) {
        return this.askable.context.toPromptContextAsync({ sources: [{ id: this._sourceId, ...options }] });
    }
    notifyChanged() { this.handle?.notifyChanged(); }
    unregister() {
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() { this.unregister(); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableCartSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableCartSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableCartSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-cart-source.service.js.map