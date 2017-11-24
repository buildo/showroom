const path = require('path');
const kebabCase = require('lodash/kebabCase');
const fs = require('fs');

function brc(name) {
  return path.resolve(__dirname, `node_modules/buildo-react-components/src/${name}/${name}`);
}

const brcComponents = fs.readdirSync('./node_modules/buildo-react-components/src')
  .filter(c => ['index.ts', 'utils', 'KitchenSink', 'InputChildren', 'Scroll', 'Tablo'].indexOf(c) === -1)
  .map(brc);

module.exports = {
  // build
  serverPort: 8080,
  styleguideDir: 'build', // target of the `build` task

  require: [
    // style customizations
    path.resolve(__dirname, 'styleguide/main.scss'),
    'buildo-normalize-css',
    // every component should be available in the examples without an explicit import
    path.resolve(__dirname, 'styleguide/setup.js')
  ],
  styleguideComponents: {
    Logo: path.resolve(__dirname, 'styleguide/components/Logo.jsx'),
    StyleGuide: path.join(__dirname, 'styleguide/components/StyleGuide.jsx')
  },

  // content
  title: 'buildo react components',
  assetsDir: 'styleguide/assets',
  template: 'styleguide/index.html',
  propsParser: require('react-docgen-typescript').parse, // detect docs using TS information
  sections: [
    {
      name: 'Getting started',
      content: 'sections/GettingStarted.md'
    },
    {
      name: 'Components',
      components: () => [].concat(brcComponents)
    }
  ],
  showCode: true,
  showUsage: true, // show props by default
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.tsx');
    return `import ${name} from @buildo/react${kebabCase(name)}`;
  },
  getExampleFilename(componentPath) {
    const name = path.basename(componentPath, '.tsx');
    return path.resolve(__dirname, `sections/components/${name}/${name}.md`);
  }
};
