import { Injectable, inject, signal } from '@angular/core';
import { createAskableConnectionSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
/**
 * Angular service that exposes WebSocket / SSE / polling connection state to AI
 * assistants so they can explain why real-time features aren't updating.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableConnectionSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly connSource = inject(AskableConnectionSourceService);
 *   ngOnInit() {
 *     this.connSource.init({ protocol: 'websocket', label: 'chat' });
 *     this.socket.on('connect', () => this.connSource.setStatus('connected'));
 *     this.socket.on('disconnect', () => this.connSource.setStatus('disconnected'));
 *   }
 * }
 * ```
 */
export class AskableConnectionSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'connection';
        this._snapshot = null;
        this._protocol = 'websocket';
        this._label = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    get snapshot() { return this._snapshot; }
    init(options = {}) {
        this.unregister();
        const { id = 'connection', protocol = 'websocket', label = null, initialStatus = 'disconnected', describe, kind } = options;
        this._sourceId = id;
        this._protocol = protocol;
        this._label = label ?? null;
        this._snapshot = {
            status: initialStatus,
            isConnected: initialStatus === 'connected',
            isConnecting: initialStatus === 'connecting',
            isReconnecting: initialStatus === 'reconnecting',
            protocol,
            reconnectAttempts: 0,
            connectedAt: null,
            disconnectedAt: null,
            lastError: null,
            label: label ?? null,
        };
        const source = createAskableConnectionSource({ describe, kind, getSnapshot: () => this._snapshot });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
    }
    setStatus(status, extra = {}) {
        const now = new Date().toISOString();
        const prev = this._snapshot;
        this._snapshot = {
            status,
            isConnected: status === 'connected',
            isConnecting: status === 'connecting',
            isReconnecting: status === 'reconnecting',
            protocol: prev?.protocol ?? this._protocol,
            reconnectAttempts: extra.reconnectAttempts ?? (status === 'connected' ? 0 : (prev?.reconnectAttempts ?? 0)),
            connectedAt: status === 'connected' ? now : (prev?.connectedAt ?? null),
            disconnectedAt: status === 'disconnected' || status === 'error' ? now : (prev?.disconnectedAt ?? null),
            lastError: extra.lastError ?? (status === 'connected' ? null : (prev?.lastError ?? null)),
            label: prev?.label ?? this._label,
        };
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableConnectionSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableConnectionSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableConnectionSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-connection-source.service.js.map