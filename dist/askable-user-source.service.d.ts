import { OnDestroy } from '@angular/core';
import type { AskableContext, AskableCreateUserSourceOptions, AskableUserProfile, AskableResolvedContextSource } from '@askable-ui/core';
import * as i0 from "@angular/core";
export type { AskableUserProfile };
export interface AskableUserSourceServiceOptions extends Omit<AskableCreateUserSourceOptions, 'getUser'> {
    /** Source registration id. Defaults to "user". */
    id?: string;
}
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
export declare class AskableUserSourceService implements OnDestroy {
    private readonly askable;
    private handle;
    private _sourceId;
    readonly isRegistered: import("@angular/core").WritableSignal<boolean>;
    get ctx(): AskableContext;
    get sourceId(): string;
    init(options?: AskableUserSourceServiceOptions & {
        getUser?: () => AskableUserProfile | null;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AskableUserSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AskableUserSourceService>;
}
//# sourceMappingURL=askable-user-source.service.d.ts.map