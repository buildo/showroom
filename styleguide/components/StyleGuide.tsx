import * as React from 'react';
import * as cx from 'classnames';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import TableOfContents from 'react-styleguidist/lib/rsg-components/TableOfContents';
import StyleGuideRenderer from 'react-styleguidist/lib/rsg-components/StyleGuide/StyleGuideRenderer';
import ReactComponent from 'react-styleguidist/lib/rsg-components/ReactComponent';
import Sections from 'react-styleguidist/lib/rsg-components/Sections';
import { HOMEPAGE } from 'react-styleguidist/scripts/consts';
import startCase from 'lodash-es/startCase';
import omit from 'lodash-es/omit';
import * as queryString from 'query-string';
import * as brc from 'buildo-react-components/src';
import { TabbedPanel } from 'buildo-react-components/src/Panel';
import { getBackgroundUrl } from 'buildo-react-components/src/Image';
import Welcome from './Welcome';
import FlexView from 'react-flexview/src';

declare const global: any;

type WrapperSection = {
  name: string,
  slug: string,
  components: ComponentSection[],
  content: { content: string, type: string }[],
  sections: any[]
}

type ComponentSection = {
  filepath: string,
  hasExamples: boolean,
  metadata: object,
  module: any,
  name: string,
  pathLine: string,
  props: any,
  slug: string
}

type Props = {
  codeRevision: number,
  config: { title: string, showSidebar: boolean },
  slots: object,
  sections: WrapperSection[],
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
    sections: PropTypes.array.isRequired,
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
    global.FlexView = FlexView;
  }

  findSection(sections: any, slug: string): WrapperSection | ComponentSection {
    return sections.reduce((acc: WrapperSection | ComponentSection | null, s: any) => {
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

  getUXGuidelines(componentName: string): string | null {
    switch (componentName) {
      case 'TextareaAutosize': return require(`raw-loader!react-autosize-textarea/src/README.md`)
      case 'CookieBanner': return require(`raw-loader!react-cookie-banner/src/README.md`)
      case 'FlexView': return require(`raw-loader!react-flexview/src/README.md`)
      default:
        try {
          return require(`raw-loader!buildo-react-components/src/${componentName}/README.md`)
        } catch (e) {
          return null;
        }
    }
  }

  getChildren(section: any) {
    const isReactComponent = !section.sections && !section.components;

    if (isReactComponent) {
      const component = section;
      const componentUXGuidelines = this.getUXGuidelines(component.name);

      const UXGuidelines = componentUXGuidelines && {
        components: [],
        sections: [],
        name: component.name,
        slug: component.slug,
        content: [{
          content: componentUXGuidelines,
          type: 'markdown'
        }]
      };

      const activeTabIndex = parseInt(queryString.parse(window.location.hash).tab) || 0;

      const panelProps = {
        type: 'floating' as 'floating',
        style: { border: 'none' },
        className: cx('component-tabs', { 'live-examples': activeTabIndex === 0, guidelines: activeTabIndex === 1 }),
        tabs: {
          headers: componentUXGuidelines ? [ 'Live Examples', 'Design Guidelines' ] : [ 'Live Examples' ],
          onSetActiveTab: this.onSetActiveTab,
          activeIndex: activeTabIndex
        }
      };

      const children = activeTabIndex === 0 ?
        <ReactComponent component={component} root depth={1} key={String(Math.random())} /> : // changing "key" is needed to force a re-render
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

  onSetActiveTab = (activeTabIndex: number) => {
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
