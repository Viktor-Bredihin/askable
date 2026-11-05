# Askable Angular — prebuilt AOT distribution

Temporary, unofficial distribution of `@askable-ui/angular` for TaxTank while
upstream's npm 0.17.3 packaging is fixed. No directive or service behavior has
been rewritten. The original adapter is compiled with Angular's compiler in
partial compilation mode. The published core dependency stays at npm 0.17.3.

## Install

From the application's package.json directory:

```sh
npm install "git+https://github.com/Viktor-Bredihin/askable.git#angular-dist"
```

For a deployment, use a reviewed full commit SHA instead of the moving branch.
Commit package.json and package-lock.json, and use npm ci on CI. This branch
contains the compiled dist, with no install/build/prepare lifecycle scripts or
build-time devDependencies. Installation does not build the monorepo or require
an npm account. Existing imports from @askable-ui/angular remain unchanged.

Keep AOT enabled. Remove the temporary explicit @angular/compiler runtime import,
local replacement directive and useFactory workarounds if they were added only
to work around the broken package. Do not remove your application's normal
Angular build dependencies or bootstrap setup.

## Source and reproducibility

Source commit: 08b847270cdef52c895d7a2f522dcf3c16fdf461

Source branch: https://github.com/Viktor-Bredihin/askable/tree/fix/angular-aot-packaging

The source monorepo and its history remain intact on main and the fix branch.
This angular-dist branch is solely the installable package. src/ contains the
original adapter TypeScript files, and BUILD_INFO.json records the compiler,
source revision and SHA-256 hashes of all dist files.

To reproduce compilation in a separate source checkout:

```sh
git clone --branch fix/angular-aot-packaging https://github.com/Viktor-Bredihin/askable.git askable-source
cd askable-source
git checkout 08b847270cdef52c895d7a2f522dcf3c16fdf461
npm ci
npm run build -w @askable-ui/angular
npm test -w @askable-ui/angular
```

## Compatibility and limitations

Built using Angular compiler 21.2.23 and TypeScript 5.9.3. The temporary peer
range is restricted to the Angular 21 and 22 families used in validation; it is
not a claim that every minor version or every service has been tested.

The packaging fix has passed all 58 adapter unit tests, a packed-package Angular
21 production AOT build and an Angular 22 AOT consumer check. Browser smoke
testing remains blocked by the local execution environment; the source branch
retains the browser CI check. This is not a security audit or a verification of
TaxTank's actual production application. Existing upstream dependency audit
findings are not addressed by the AOT fix. Test your application before deploying.

Once a verified official release includes the packaging fix, switch back to the
official npm package. The original MIT license and copyright are preserved.
