// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import {
  Story,
  Meta,
  moduleMetadata,
  componentWrapperDecorator,
} from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { DropdownComponent } from "./dropdown.component";
import { ListComponent } from "../list/list.component";

import * as ListComponentStories from "../list/list.stories";

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: "ngx-ode-ui/Dropdown",
  component: DropdownComponent,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#333" }],
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [DropdownComponent, ListComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="margin: 3em;">${story}</div>`
    ),
  ],
  args: {
    name: "Dropdown Text",
  },
  excludeStories: /.*Data$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
export const Default: Story<DropdownComponent> = (args: DropdownComponent) => ({
  props: { ...args },
  template: `
  <ode-dropdown 
  name="${args.name}"
  [isDropdownOpened]="${args.isDropdownOpened}">
    <ode-list
      [model]="model">
      <ng-template let-item>
        <div>{{ item.title }}</div>
      </ng-template>
    </ode-list>
  </ode-dropdown>
  `,
});
Default.args = {
  model: [
    { id: "1", title: "Task 1" },
    { id: "2", title: "Task 2" },
    { id: "3", title: "Task 3" },
    { id: "4", title: "Task 4" },
    { id: "5", title: "Task 5" },
    { id: "6", title: "Task 6" },
  ],
};

export const Open: Story<DropdownComponent> = (args: DropdownComponent) => ({
  props: args,
  template: `
    <ode-dropdown 
      name="${args.name}"
      [isDropdownOpened]="${args.isDropdownOpened}">
        <ode-list
          [model]="model">
          <ng-template let-item>
            <div>{{ item.title }}</div>
          </ng-template>
        </ode-list>
      </ode-dropdown>
  `,
});
Open.args = {
  ...Default.args,
  isDropdownOpened: true,
};
