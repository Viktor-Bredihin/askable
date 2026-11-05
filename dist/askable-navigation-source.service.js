import { Injectable, inject, signal, } from '@angular/core';
import { createAskableNavigationSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that registers a navigation context source so AI assistants
 * can understand where the user is in the application — current route, page title,
 * route parameters, query string, and navigation history.
 *
 * Integrates with Angular Router by calling `notifyChanged()` in a navigation
 * event subscription.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableNavigationSourceService] })
 * export class AppComponent implements OnInit, OnDestroy {
 *   private readonly navSource = inject(AskableNavigationSourceService);
 *   private readonly router = inject(Router);
 *   private readonly route = inject(ActivatedRoute);
 *   private sub!: Subscription;
 *
 *   ngOnInit() {
 *     this.navSource.init({
 *       getPath: () => this.router.url,
 *       getTitle: () => document.title,
 *     });
 *
 *     this.sub = this.router.events.pipe(
 *       filter(e => e instanceof NavigationEnd)
 *     ).subscribe(() => this.navSource.notifyChanged());
 *   }
 *
 *   ngOnDestroy() { this.sub.unsubscribe(); }
 * }
 * ```
 */
export class AskableNavigationSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'navigation';
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
        const { id = 'navigation', ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableNavigationSource(sourceOptions);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableNavigationSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableNavigationSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableNavigationSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-navigation-source.service.js.map