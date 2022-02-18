---
labels: ["angular", "typescript", "search"]
description: "A `search` component."
---

# Search documentation

Import `SearchModule` into your application:

```ts
import { SearchModule } from "./search.module";

// add it to your module imports
@NgModule({
  imports: [SearchModule],
})
export class AppModule {}
```

Use `SearchComponent` in your templates:

```html
<ode-search-input></ode-search-input>
```
