import React, { Component } from 'react';
import { CounterButton} from 'components';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>
            <h2>{config.app.description}</h2>
          </div>
        </div>

        <div className="container">
          <div className={styles.counterContainer}>
            <CounterButton multireducerKey="counter1"/>
            <CounterButton multireducerKey="counter2"/>
            <CounterButton multireducerKey="counter3"/>
          </div>

          <p>用我们的智慧加上那一份勤劳和热情，创造更多价值:</p>

          <h3>我们要做云南最好的农产品电商平台</h3>

          <dl>
            <dt>一直在努力，只是不想人生白活</dt>
            <dd>
              活着在于调整自己，看看自己能有多大的潜力
            </dd>
          </dl>
          <p>花尖墨，做云南最好的农产品电商平台.</p>

          <p>– 博羸兄弟</p>
        </div>
      </div>
    );
  }
}
