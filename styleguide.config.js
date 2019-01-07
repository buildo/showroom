const path = require('path');
const fs = require('fs');

function brc(name) {
  return path.resolve(__dirname, `node_modules/buildo-react-components/src/${name}/${name}.tsx`);
}

const brcComponents = fs.readdirSync(path.resolve(__dirname, 'node_modules/buildo-react-components/src'))
  .filter(c => [
    'index.ts',
    'utils',
    'KitchenSink',
    'InputChildren',
    'Scroll',
    'TransitionWrapper'
  ].indexOf(c) === -1)
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

  compilerConfig: {
    objectAssign: 'Object.assign',
    transforms: { dangerousTaggedTemplateString: true }
  },

  // content
  title: '@buildo/react-components',
  template: {
    head: {
      raw: `
      <meta charset="utf-8">
      <title>@buildo/react-components</title>
      <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700' rel='stylesheet' type='text/css'>
      <link rel="stylesheet" href="https://i.icomoon.io/public/5ba04e2a5e/Showroom/style.css">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      `
    }
  },
  propsParser: require('react-docgen-typescript').parse, // detect docs using TS information
  sections: [
    {
      name: 'Getting started',
      content: 'sections/GettingStarted.md'
    },
    {
      name: 'Components',
      components: brcComponents.concat([
        path.resolve(__dirname, 'node_modules/react-autosize-textarea/src/TextareaAutosize.tsx'),
        path.resolve(__dirname, 'node_modules/react-cookie-banner/src/CookieBanner.tsx'),
        path.resolve(__dirname, 'node_modules/react-flexview/src/FlexView.tsx')
      ]).sort((a, b) => a.split('/').slice(-1)[0].toLowerCase() > b.split('/').slice(-1)[0].toLowerCase() ? 1 : -1),
    }
  ],
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.tsx');

    switch (name) {
      case 'TextareaAutosize': return `import TextareaAutosize from react-autosize-textarea`;
      case 'CookieBanner': return `import CookieBanner from react-cookie-banner`;
      case 'FlexView': return `import FlexView from 'react-flexview'`;
      default: return `import ${name} from buildo-react-components/lib/${name}`;
    }
  },
  getExampleFilename(componentPath) {
    if (componentPath.includes('buildo-react-components')) {
      return componentPath.split('/').slice(0, -1).concat('Examples.md').join('/');
    } else {
      return componentPath.split('/').slice(0, -2).concat(['examples', 'Examples.md']).join('/');
    }
  }
};
