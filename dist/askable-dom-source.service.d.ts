import { OnDestroy, ElementRef } from '@angular/core';
import type { AskableContext, AskableCreateDOMSourceOptions, AskableDOMSnapshot, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableDOMSnapshot };
export interface AskableDOMSourceServiceOptions extends Omit<AskableCreateDOMSourceOptions, 'getElement'> {
    /** Source registration id. Defaults to "dom". */
    id?: string;
}
/**
 * Angular service that extracts text content, labels, roles, and attributes
 * from a DOM element and exposes them to AI assistants as structured context.
 *
 * @example
 * ```ts
 * \@Component({
 *   providers: [AskableDOMSourceService],
 *   template: '<div #editor contenteditable>...</div>',
 * })
 * export class AppComponent implements AfterViewInit {
 *   \@ViewChild('editor') editorRef!: ElementRef<HTMLElement>;
 *   private readonly domSource = inject(AskableDOMSourceService);
 *   ngAfterViewInit() {
 *     this.domSource.init({ element: this.editorRef, maxTextLength: 5000 });
 *   }
 * }
 * ```
 */
export declare class AskableDOMSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    private _getElement;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options: AskableDOMSourceServiceOptions & {
        /** ElementRef, DOM element, or getter function. */
        element: ElementRef<Element> | Element | (() => Element | null | undefined);
    }): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableDOMSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableDOMSourceService>;
}
//# sourceMappingURL=askable-dom-source.service.d.ts.map