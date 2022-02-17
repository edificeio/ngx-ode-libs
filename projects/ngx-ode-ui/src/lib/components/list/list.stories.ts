// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import {
  Story,
  Meta,
  moduleMetadata,
  componentWrapperDecorator,
} from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list.component";
import { SearchInputComponent } from "../search-input/search-input.component";

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: "ngx-ode-ui/List",
  component: ListComponent,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#333" }],
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [ListComponent, SearchInputComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="margin: 3em;">${story}</div>`
    ),
  ],
  args: {
    loading: false,
  },
  excludeStories: /.*Data$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
export const DefaultList: Story<ListComponent> = (args: ListComponent) => ({
  props: { ...args },
  template: `
    <ode-list
    [model]="model"
    [loading]="${args.loading}">
      <ng-template let-item>
        <div>{{ item.title }}</div>
      </ng-template>
    </ode-list>`,
});
DefaultList.args = {
  model: [
    { id: "1", title: "Task 1" },
    { id: "2", title: "Task 2" },
    { id: "3", title: "Task 3" },
    { id: "4", title: "Task 4" },
    { id: "5", title: "Task 5" },
    { id: "6", title: "Task 6" },
  ],
  loading: false,
};

export const EmptyList: Story<ListComponent> = (args: ListComponent) => ({
  props: { ...args },
  template: `
    <ode-list
    [model]="model"
    [loading]="${args.loading}">
      <ng-template let-item>
        <div>{{ item.title }}</div>
      </ng-template>
    </ode-list>`,
});
EmptyList.args = {
  model: [],
  loading: false,
};

export const LoadingList: Story<ListComponent> = (args: ListComponent) => ({
  props: { ...args },
  template: `
    <ode-list
      [model]="model"
      [loading]="${args.loading}">
      <ng-template let-item>
        <div>{{ item.title }}</div>
      </ng-template>
    </ode-list>`,
});
LoadingList.args = {
  model: [],
  loading: true,
};
