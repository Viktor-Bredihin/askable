import { Injectable, inject, signal, } from '@angular/core';
import { createAskableMediaSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
const TRACK_EVENTS = ['play', 'pause', 'ended', 'timeupdate', 'volumechange', 'ratechange', 'seeking', 'waiting', 'canplay'];
/**
 * Angular service that exposes audio/video player state — current time, duration,
 * playback status, and track metadata — so AI assistants can reference what
 * the user is watching or listening to.
 *
 * Works with any HTML5 media element (video, audio).
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableMediaSourceService] })
 * export class VideoPlayerComponent implements OnInit, OnDestroy {
 *   private readonly mediaSource = inject(AskableMediaSourceService);
 *   private videoEl: HTMLVideoElement | null = null;
 *
 *   ngOnInit() {
 *     this.mediaSource.init({
 *       getMedia: () => this.videoEl,
 *       getTitle: () => this.currentEpisode?.title ?? null,
 *       getArtist: () => this.currentEpisode?.speaker ?? null,
 *     });
 *   }
 *
 *   setVideoElement(el: HTMLVideoElement) {
 *     this.videoEl = el;
 *     this.mediaSource.attachListeners(el);
 *   }
 * }
 * ```
 */
export class AskableMediaSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'media';
        this._cleanupListeners = null;
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
        const { id = 'media', getMedia, ...sourceOptions } = options;
        this._sourceId = id;
        const source = createAskableMediaSource({
            ...sourceOptions,
            getMedia: getMedia ?? (() => null),
        });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
    }
    /**
     * Attaches native media event listeners to the given element so the source
     * auto-notifies on play, pause, seek, and other state changes.
     *
     * Returns a cleanup function; call it (or use `ngOnDestroy`) to remove listeners.
     */
    attachListeners(el) {
        this._cleanupListeners?.();
        const notify = () => this.notifyChanged();
        for (const evt of TRACK_EVENTS)
            el.addEventListener(evt, notify);
        const cleanup = () => {
            for (const evt of TRACK_EVENTS)
                el.removeEventListener(evt, notify);
        };
        this._cleanupListeners = cleanup;
        return cleanup;
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
        this._cleanupListeners?.();
        this._cleanupListeners = null;
        this.handle?.unregister();
        this.handle = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() {
        this.unregister();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableMediaSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableMediaSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableMediaSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-media-source.service.js.map