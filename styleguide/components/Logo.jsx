import * as React from 'react';

const logo = require('../assets/buildo-logo.png');

export default class LogoRenderer extends React.PureComponent {

  render() {
    return (
      <div className='brc-logo' style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <a href='http://buildo.io' target='_blank'>
          <img src={logo} width='100px' />
        </a>
      </div>
    );
  }

}
