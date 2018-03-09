import * as React from 'react';
import FlexView from 'react-flexview/src';
import Button from 'buildo-react-components/src/Button';

import './rocket.png';
import './tools.png';
import './window.png';
import './rocket@2x.png';
import './tools@2x.png';
import './window@2x.png';

import './welcome.scss';

export default class Welcome extends React.Component {

  onGetStartedClick = () => {
    window.location.hash = 'getting-started';
  }

  onStarClick = () => {
    window.open('https://github.com/buildo/react-components', '_blank');
  }

  render() {

    const ColumnTemplate = ({ title, icon, children }: { title: string, icon: string, children: React.ReactNode }) => (
      <FlexView className='column-template' column shrink basis='100%'>
        <FlexView basis={50} vAlignContent='center' style={{ marginBottom: 10 }}>
          {icon && <img src={`${icon}.png`} srcSet={`${icon}@2x.png 2x`} />}
        </FlexView>
        <h2 style={{ lineHeight: 1, margin: 0 }}>{title}</h2>
        {children}
      </FlexView>
    );


    return (
      <FlexView column className='welcome'>
        <FlexView column className='header' hAlignContent='center'>
          <FlexView shrink={false} className='title'>buildo react components</FlexView>
          <FlexView shrink={false} className='subtitle'>Reusable components by buildo</FlexView>
          <FlexView shrink={false} className='action-buttons'>
            <Button flat label='Get Started' onClick={this.onGetStartedClick} />
            <Button flat label='Star' icon='github' onClick={this.onStarClick} />
          </FlexView>
          <FlexView shrink={false} className='current-release' />
          <FlexView shrink={false} className='pattern' style={{ backgroundImage: 'url(pattern.png)' }} />
        </FlexView>
        <FlexView column className='content'>
          <h1>Introduction</h1>
          <p>
            This is a collection of reusable React components created at Buildo
          </p>
          <p>
            Its purpose is to give access to all these components through a single npm dependency so to improve the development experience and make eventual changes of library easier, faster and centralized
          </p>
          <h1>Goals</h1>
          <FlexView>
            <ColumnTemplate title='Highly customizable' icon='tools'>
              <p>
                The library integrates with your Webpack workflow and it's easily customizable and very flexible.
                <br />
                While style agnostic, all the components have a sane default style that can be totally overridden through Sass variables
              </p>
            </ColumnTemplate>
            <ColumnTemplate title='Designed with expertise' icon='window'>
              <p>
                Designed by React devs for React devs, written in ES6 and Sass, built with Babel and Webpack
              </p>
            </ColumnTemplate>
            <ColumnTemplate title='Live playground' icon='rocket'>
              <p>
                Check our showroom and try all the components with live examples.
                <br />
                We've created a playground so you don't need to install anything to learn how the components work, look and behave
              </p>
            </ColumnTemplate>
          </FlexView>
        </FlexView>
      </FlexView>
    );
  }

}
