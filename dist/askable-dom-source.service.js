import { Injectable, inject, signal, ElementRef } from '@angular/core';
import { createAskableDOMSource } from '@askable-ui/core';
import { AskableService } from './askable.service.js';
import * as i0 from "@angular/core";
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
export class AskableDOMSourceService {
    constructor() {
        this.askable = inject(AskableService);
        this.handle = null;
        this._sourceId = 'dom';
        this._getElement = null;
        this.isRegistered = signal(false, ...(ngDevMode ? [{ debugName: "isRegistered" }] : /* istanbul ignore next */ []));
    }
    get ctx() { return this.askable.context; }
    get sourceId() { return this._sourceId; }
    init(options) {
        this.unregister();
        const { id = 'dom', element, describe, kind, includeAttributes, includeHTML, maxTextLength } = options;
        this._sourceId = id;
        if (element instanceof ElementRef) {
            this._getElement = () => element.nativeElement;
        }
        else if (typeof element === 'function') {
            this._getElement = element;
        }
        else {
            this._getElement = () => element;
        }
        const source = createAskableDOMSource({
            getElement: () => this._getElement?.() ?? null,
            describe,
            kind,
            includeAttributes,
            includeHTML,
            maxTextLength,
        });
        this.handle = this.ctx.registerSource(id, source);
        this.isRegistered.set(true);
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
        this._getElement = null;
        this.isRegistered.set(false);
    }
    ngOnDestroy() { this.unregister(); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableDOMSourceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableDOMSourceService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.23", ngImport: i0, type: AskableDOMSourceService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=askable-dom-source.service.js.map