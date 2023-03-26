# TRS component
This project uses LitElement and Tailwind.

No dependencies, based on [lit-element](https://lit.dev/docs/).

## How will you create a tailwind component?
Here is a sample code:

```typescript
import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {TailwindElement} from '../shared/tailwind.element';

import style from './test.component.scss?inline'; // #1

@customElement('test-component')
export class TestComponent extends TailwindElement(style) { // #2

  @property()
  name?: string = 'World';

  render() {
    return html`
      <p>
        Hello,
        <b>${this.name}</b>
        !
      </p>
      <button class="bg-blue-200 text-yellow-200 p-2 rounded-full text-2xl">Hello world!</button>
    `;
  }
}
```
It is based on the [lit element](https://lit.dev/docs/) technology: if you wrote a lit component before, you'll find it familiar.  

There are only two differences to a standard _LitElement_:
1) You must import your styles from a separate file. And this is good for two reasons:
   - it separates the CSS from the logic
   - you can decide to use CSS or SCSS
   - note the `?inline` at the end of the file path: if you don't add it, then vite will add the style to the head of the html. If you add it, the style is scoped into the component only  
2) the class extends a _TailwindElement_ rather than a LitElement

A _TailwindElement_ extends a _LitElmement_ (see below) and adds the logic to integrate tailwind and your styles.

## Get started

To run the project:
1) `pnpm install` (only the first time)
2) `pnpm start` to run the server
3) to develop the library, run `pnpm build` and copy the static assets where you need them.


## Show me the pieces
If you want to understand how it works, it's simple:

- the **package.json** integrates these technolgies:
```json
"autoprefixer": "^10.4.12",
"postcss": "^8.4.18",
"lit": "^2.4.0",
"tailwindcss": "^3.2.0",
"typescript": "^4.8.4",
"vite": "^3.1.8",
"sass": "^1.55.0"
```

- **vite** does almost all the work automatically
- to integrate tailwind, the most important file is in _src/shared/tailwind.element.ts_

```typescript
import {LitElement, unsafeCSS} from "lit";

import style from "./tailwind.global.css";

const tailwindElement = unsafeCSS(style);

export const TailwindElement = (style) =>
    class extends LitElement {

        static styles = [tailwindElement, unsafeCSS(style)];
    
    };

```

It extends a _LitElement_ class at runtime and adds the component tailwind classes.

The _style_ variable comes from your component, where it is imported from an external CSS (or SCSS) file.

Then it is combined with the default tailwind classes.

If you add more components, the common parts are reused.


