import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import TableOfContents from 'react-styleguidist/lib/rsg-components/TableOfContents';
import StyleGuideRenderer from 'react-styleguidist/lib/rsg-components/StyleGuide/StyleGuideRenderer';
import ReactComponent from 'react-styleguidist/lib/rsg-components/ReactComponent';
import Sections from 'react-styleguidist/lib/rsg-components/Sections';
import { HOMEPAGE } from 'react-styleguidist/scripts/consts';
import { startCase, omit } from 'lodash';
import * as queryString from 'query-string';
import * as brc from 'buildo-react-components/src';
import { TabbedPanel } from 'buildo-react-components/src/Panel';
import { getBackgroundUrl } from 'buildo-react-components/src/Image';
import Welcome from './Welcome';

declare const global: any;

type Props = {
  codeRevision: number,
  config: object,
  slots: object,
  // sections: PropTypes.array.isRequired,
  // welcomeScreen: PropTypes.bool,
  // patterns: PropTypes.array,
  isolatedComponent?: boolean,
  isolatedExample?: boolean,
  isolatedSection?: boolean
}

export default class StyleGuide extends Component<Props> {
  static propTypes = {
    codeRevision: PropTypes.number.isRequired,
    config: PropTypes.object.isRequired,
    slots: PropTypes.object.isRequired,
    // sections: PropTypes.array.isRequired,
    // welcomeScreen: PropTypes.bool,
    // patterns: PropTypes.array,
    isolatedComponent: PropTypes.bool,
    isolatedExample: PropTypes.bool,
    isolatedSection: PropTypes.bool,
  };

  static childContextTypes = {
    codeRevision: PropTypes.number.isRequired,
    config: PropTypes.object.isRequired,
    slots: PropTypes.object.isRequired,
    isolatedComponent: PropTypes.bool,
    isolatedExample: PropTypes.bool,
    isolatedSection: PropTypes.bool,
  };

  static defaultProps = {
    isolatedComponent: false,
  };

  getChildContext() {
    return {
      codeRevision: this.props.codeRevision,
      config: this.props.config,
      slots: this.props.slots,
      isolatedComponent: this.props.isolatedComponent,
      isolatedExample: this.props.isolatedExample,
      isolatedSection: this.props.isolatedSection,
    };
  }

  componentDidMount() {
    this.patchGlobal();
  }

  componentDidUpdate() {
    this.patchGlobal();
  }

  patchGlobal() {
    // TODO: find a better way to make examples work without an "export default" in the component file
    Object.keys(brc).forEach(k => {
      if (k !== '__es6Module') {
        global[k] = brc[k];
      }
    });
    global.getBackgroundUrl = getBackgroundUrl;
  }

  findSection(sections: any[], slug: string): any {
    return sections.reduce((acc, s) => {
      if (acc) {
        return acc;
      } else if (s.slug === slug) {
        return s;
      } else if (s.sections && s.sections.length > 0) {
        return this.findSection(s.sections, slug);
      } else if (s.components && s.components.length > 0) {
        return this.findSection(s.components, slug);
      }
    }, null);
  }

  getUXGuidelines(componentName: string) {
    switch (componentName) {
      case 'TextareaAutosize': return require(`raw-loader!react-autosize-textarea/src/README.md`)
      case 'InputChildren': return require(`raw-loader!react-input-children/src/README.md`)
      case 'CookieBanner': return require(`raw-loader!react-cookie-banner/src/README.md`)
      default: return require(`raw-loader!buildo-react-components/src/${componentName}/README.md`)
    }
  }

  getChildren(section) {
    const isReactComponent = !section.sections && !section.components;

    const activeTabIndex = parseInt(queryString.parse(window.location.hash).tab) || 0;

    const panelProps = {
      type: 'floating',
      style: { border: 'none' },
      className: 'component-tabs',
      tabs: {
        headers: [ 'Live Examples', 'UX Guidelines' ],
        onSetActiveTab: this.onSetActiveTab,
        activeIndex: activeTabIndex
      }
    };

    if (isReactComponent) {
      const component = section;
      console.log(component.name);
      const UXGuidelines = {
        components: [],
        sections: [],
        name: component.name,
        slug: component.slug,
        content: [{
          content: this.getUXGuidelines(component.name),
          type: 'markdown'
        }]
      };

      const children = activeTabIndex === 0 ?
        <ReactComponent component={component} root /> :
        <Sections sections={[UXGuidelines]} root depth={0} /> ;

      return (
        <div>
          <h1 className='component-title'>{startCase(component.name)}</h1>
          <TabbedPanel {...panelProps}>
            <div className='examples'>
              {children}
            </div>
          </TabbedPanel>
        </div>
      );
    }

    return (
      <div>
        <div style={{ height: 104 }}>
          <div className='pattern-getting-started' style={{ backgroundImage: 'url(pattern.png)' }} />
        </div>
        <Sections sections={[section]} root depth={0} />
      </div>
    );
  }

  onSetActiveTab = (activeTabIndex) => {
    const query = queryString.parse(window.location.hash);
    window.location.hash = queryString.stringify({
      ...query,
      tab: activeTabIndex
    })
  }

  render() {
    const { config, sections, isolatedComponent } = this.props;

    const slug = Object.keys(omit(queryString.parse(window.location.hash), 'tab'))[0];
    const section = this.findSection(sections, slug) || sections[0];

    console.log(section);

    return (
      <StyleGuideRenderer
        title={config.title}
        homepageUrl={HOMEPAGE}
        toc={<TableOfContents sections={sections} />}
        hasSidebar={config.showSidebar && !isolatedComponent}
      >
        {!window.location.hash ? <Welcome /> : this.getChildren(section)}
      </StyleGuideRenderer>
    );
  }


}
