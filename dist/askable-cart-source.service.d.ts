import { OnDestroy } from '@angular/core';
import type { AskableCreateCartSourceOptions, AskableCartItem, AskableCartSourceSnapshot, AskableCartTotals, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableCartItem, AskableCartSourceSnapshot, AskableCartTotals };
export interface AskableCartSourceServiceOptions extends Omit<AskableCreateCartSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "cart". */
    id?: string;
    /** Initial cart items. */
    items?: AskableCartItem[];
    /** Initial totals (discount, tax, shipping, currency, couponCode). */
    totals?: AskableCartTotals;
}
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
export declare class AskableCartSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get snapshot(): AskableCartSourceSnapshot | null;
    get sourceId(): string;
    init(options?: AskableCartSourceServiceOptions): void;
    private _getTotals;
    addItem(item: AskableCartItem): void;
    removeItem(id: string): void;
    updateQuantity(id: string, quantity: number): void;
    setItems(items: AskableCartItem[]): void;
    setTotals(totals: AskableCartTotals): void;
    clearCart(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableCartSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableCartSourceService>;
}
//# sourceMappingURL=askable-cart-source.service.d.ts.map