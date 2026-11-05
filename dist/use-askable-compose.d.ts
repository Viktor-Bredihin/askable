import { Signal } from '@angular/core';
export interface AskableContextSection {
    label: string;
    value: string | null | undefined;
}
export interface UseAskableComposeOptions {
    separator?: string;
    emptyFallback?: string;
}
export interface UseAskableComposeResult {
    promptContext: Signal<string>;
}
/**
 * Compose multiple askable context streams into a single prompt string.
 *
 * Accepts a `Signal<AskableContextSection[]>` so Angular tracks signal reads
 * reactively inside `computed`.
 *
 * ```ts
 * @Component({ ... })
 * export class ChatComponent {
 *   private askable = inject(AskableService);
 *
 *   sections = computed(() => [
 *     { label: 'Focused element', value: this.askable.promptContext() },
 *   ]);
 *
 *   promptContext = useAskableCompose(this.sections).promptContext;
 * }
 * ```
 */
export declare function useAskableCompose(sections: Signal<AskableContextSection[]>, options?: UseAskableComposeOptions): UseAskableComposeResult;
//# sourceMappingURL=use-askable-compose.d.ts.map