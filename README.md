# Problems with TypeScript #

My modified template for Electron/Svelte/Typescript base on *Samuele de Tomasi's* work. 

Currently I am facing two problems that are a result of switching to typescript:
1.  Using `Types` from other classes requires me to import these in order to use them (see `src/electron/libs/Bar.ts`, where an import of `Foo` is required: `import { Foo } from "./Foo"`). This creates quite a bit of overhead. A possible solutions, i.e. using `global.d.ts` seems to be strongly discouraged. 

**-> So is there a way to avoid importing `Types` (`classes`, `interfaces`, etc.) each time?**

2. The compiled files have some overhead and are not *"clean"* (e.g. `src/electron/libs/Foo.ts` compiles to `dist/libs/Foo.js` which has additional lines regarding the export:

```
// Foo.ts (input)

export class Foo {
    bar: number;
    constructor() { this.bar = 42; }
}
```

is compiled to

```
// Foo.js (output)

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
    constructor() { this.bar = 42; }
}
exports.Foo = Foo;
```

Modifiying the compiler options in `tsconfig.json` from `"module": "commonjs"` to `"module": "esnext"` produces clean `*.js` files.

So I'm wondering if there is a way to compile the `TS` files to `esnext` or is this (still) a limitation of using Node/Electron?

...

### Template Source: https://blog.stranianelli.com/svelte-et-electron-et-typescript-english/ 

