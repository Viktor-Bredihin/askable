import { computed } from '@angular/core';
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
export function useAskableCompose(sections, options) {
    const { separator = '\n\n', emptyFallback = 'No UI context available.' } = options ?? {};
    const promptContext = computed(() => {
        const active = sections()
            .filter((s) => s.value != null && s.value.trim() !== '')
            .map((s) => `${s.label}:\n${s.value.trim()}`);
        return active.length > 0 ? active.join(separator) : emptyFallback;
    }, ...(ngDevMode ? [{ debugName: "promptContext" }] : /* istanbul ignore next */ []));
    return { promptContext };
}
//# sourceMappingURL=use-askable-compose.js.map