---
labels: ["angular", "typescript", "list"]
description: "A `list` component."
---

# List documentation

Import `ListModule` into your application:

```ts
import { ListModule } from "./list.module";

// add it to your module imports
@NgModule({
  imports: [ListModule],
})
export class AppModule {}
```

Use `ListComponent` in your templates:

```html
<ode-list></ode-list>
```
