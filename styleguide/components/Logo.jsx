import * as React from 'react';
import FlexView from 'react-flexview';

const logo = require('../assets/buildo-logo.png');

export default class LogoRenderer extends React.PureComponent {

  render() {
    return (
      <FlexView column className='brc-logo' height={208} hAlignContent='center' vAlignContent='center' style={{ cursor: 'pointer' }} onClick={() => window.location.hash = ''}>
        <img src={logo} width='100px' />
        <span style={{ color: '#354053', fontSize: 30, fontWeight: 400 }}>
          buildo
        </span>
        <span style={{ color: '#9098a7', fontSize: 16, fontWeight: 600, marginTop: 16 }}>
          @buildo/react-components
        </span>
      </FlexView>
    );
  }

}
