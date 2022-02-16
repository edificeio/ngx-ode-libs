module.exports = {
  stories: [
    "../projects/ngx-ode-ui/src/lib/components/**/*.stories.mdx",
    "../projects/ngx-ode-ui/src/lib/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/angular",
  core: {
    builder: "webpack5",
  },
};
