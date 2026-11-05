import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateMediaSourceOptions, AskableMediaState, AskableMediaSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableMediaState, AskableMediaSourceSnapshot };
export interface AskableMediaSourceServiceOptions extends Omit<AskableCreateMediaSourceOptions, 'getMedia'> {
    /** Source registration id. Defaults to "media". */
    id?: string;
}
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
export declare class AskableMediaSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _cleanupListeners;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableMediaSourceServiceOptions & {
        getMedia?: () => HTMLMediaElement | null | undefined;
    }): void;
    /**
     * Attaches native media event listeners to the given element so the source
     * auto-notifies on play, pause, seek, and other state changes.
     *
     * Returns a cleanup function; call it (or use `ngOnDestroy`) to remove listeners.
     */
    attachListeners(el: HTMLMediaElement): () => void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableMediaSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableMediaSourceService>;
}
//# sourceMappingURL=askable-media-source.service.d.ts.map