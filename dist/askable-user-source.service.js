import { Injectable, inject, signal, } from '@angular/core';
import { createAskableUserSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that registers a user profile source so AI assistants can
 * personalise responses — addressing users by name, respecting their role
 * and plan, and adapting to their locale.
 *
 * Works with any auth provider: Angular Auth OIDC Client, Auth.js, Clerk, Firebase Auth, etc.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableUserSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly userSource = inject(AskableUserSourceService);
 *   private readonly authService = inject(AuthService);
 *
 *   ngOnInit() {
 *     this.userSource.init({
 *       getUser: () => this.authService.currentUser
 *         ? { name: this.authService.currentUser.displayName, role: this.authService.currentUser.role }
 *         : null,
 *     });
 *   }
 *
 *   onAuthChange() {
 *     this.userSource.notifyChanged();
 *   }
 * }
 * ```
 */
export class AskableUserSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'user';
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
        const { id = 'user', getUser, ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableUserSource({
            ...sourceOptions,
            getUser: getUser ?? (() => null),
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableUserSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableUserSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableUserSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-user-source.service.js.map