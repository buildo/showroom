const path = require('path');
const kebabCase = require('lodash/kebabCase');
const endsWith = require('lodash/endsWith');
const fs = require('fs');

function brc(name) {
  return path.resolve(__dirname, `node_modules/buildo-react-components/src/${name}/${name}`);
}

const brcComponents = fs.readdirSync(path.resolve(__dirname, 'node_modules/buildo-react-components/src'))
  .filter(c => ['index.ts', 'utils', 'KitchenSink', 'InputChildren', 'Scroll', 'TransitionWrapper'].indexOf(c) === -1)
  .map(brc);

module.exports = {
  // build
  serverPort: 8080,
  styleguideDir: 'docs', // target of the `build` task

  require: [
    // "global" setup + sass imports
    path.resolve(__dirname, 'styleguide/setup.ts')
  ],
  styleguideComponents: {
    Logo: path.resolve(__dirname, 'styleguide/components/Logo.tsx'),
    StyleGuide: path.join(__dirname, 'styleguide/components/StyleGuide.tsx')
  },

  // content
  title: '@buildo/react-components',
  template: 'styleguide/index.html',
  propsParser: require('react-docgen-typescript').parse, // detect docs using TS information
  sections: [
    {
      name: 'Getting started',
      content: 'sections/GettingStarted.md'
    },
    {
      name: 'Components',
      components: () => brcComponents.concat([
        path.resolve(__dirname, 'node_modules/react-autosize-textarea/src/TextareaAutosize'),
        path.resolve(__dirname, 'node_modules/react-input-children/src/InputChildren'),
        path.resolve(__dirname, 'node_modules/react-cookie-banner/src/CookieBanner'),
        path.resolve(__dirname, 'node_modules/react-flexview/src/FlexView')
      ]).sort((a, b) => a.split('/').slice(-1)[0].toLowerCase() > b.split('/').slice(-1)[0].toLowerCase() ? 1 : -1)
    }
  ],
  showCode: true,
  showUsage: false, // show props by default
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.tsx');
    return `import ${name} from @buildo/react-${kebabCase(name)}`;
  },
  getExampleFilename(componentPath) {
    if (componentPath.includes('buildo-react-components')) {
      return componentPath.split('/').slice(0, -1).concat('Examples.md').join('/');
    } else {
      return componentPath.split('/').slice(0, -2).concat(['examples', 'Examples.md']).join('/');
    }
  }
};
