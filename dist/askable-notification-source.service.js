import { Injectable, inject, signal } from '@angular/core';
import { createAskableNotificationSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that tracks active toast messages, banners, and alerts and
 * exposes them to AI assistants so they can acknowledge errors and explain warnings.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableNotificationSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly notifSource = inject(AskableNotificationSourceService);
 *   ngOnInit() { this.notifSource.init(); }
 *   showError(msg: string) {
 *     this.notifSource.add({ id: Date.now().toString(), message: msg, severity: 'error' });
 *   }
 * }
 * ```
 */
export class AskableNotificationSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'notifications';
        this._notifications = [];
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get notifications() { return this._notifications; }
    init(options = {}) {
        this.unregister();
        const { id = 'notifications', maxNotifications = 20, describe, kind } = options;
        this._sourceId = id;
        this._notifications = [];
        const source = createAskableNotificationSource({
            describe,
            kind,
            maxNotifications,
            getNotifications: () => this._notifications,
        });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
    }
    add(notification) {
        this._notifications = [notification, ...this._notifications];
        this.notifyChanged();
    }
    remove(id) {
        this._notifications = this._notifications.filter((n) => n.id !== id);
        this.notifyChanged();
    }
    clear() {
        this._notifications = [];
        this.notifyChanged();
    }
    setNotifications(notifications) {
        this._notifications = [...notifications];
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableNotificationSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableNotificationSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableNotificationSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-notification-source.service.js.map