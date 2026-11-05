import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateClipboardSourceOptions, AskableClipboardEntry, AskableClipboardSourceSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableClipboardEntry, AskableClipboardSourceSnapshot };
export interface AskableClipboardSourceServiceOptions extends Omit<AskableCreateClipboardSourceOptions, 'getSnapshot'> {
    /** Source registration id. Defaults to "clipboard". */
    id?: string;
    /**
     * Maximum number of history entries to retain.
     * @default 10
     */
    maxHistory?: number;
    /**
     * Maximum characters to store per clipboard entry.
     * @default 5000
     */
    maxLength?: number;
    /**
     * Automatically listen to the copy event to capture clipboard contents.
     * @default true
     */
    autoTrack?: boolean;
}
/**
 * Angular service that tracks clipboard copy events and exposes the contents
 * to AI assistants so they can reference what the user has copied.
 *
 * @example
 * ```ts
 * \@Component({ providers: [AskableClipboardSourceService] })
 * export class AppComponent implements OnInit {
 *   private readonly clipboardSource = inject(AskableClipboardSourceService);
 *   ngOnInit() { this.clipboardSource.init(); }
 * }
 * ```
 */
export declare class AskableClipboardSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _snapshot;
    private _maxHistory;
    private _maxLength;
    private _cleanup;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    get snapshot(): AskableClipboardSourceSnapshot | null;
    init(options?: AskableClipboardSourceServiceOptions): void;
    private _addEntry;
    addEntry(text: string): void;
    clear(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableClipboardSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableClipboardSourceService>;
}
//# sourceMappingURL=askable-clipboard-source.service.d.ts.map