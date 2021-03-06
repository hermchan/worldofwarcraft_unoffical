import * as _ from 'lodash';
import cx from 'classnames';
import React from 'react';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import PropTypes from 'prop-types';
import styles from './RaidProgression.scss';
import BossKills from './BossKills/BossKills';
import NormalCard from './NormalCard/NormalCard';
import HeroicCard from './HeroicCard/HeroicCard';
import MythicCard from './MythicCard/MythicCard';
import Progress from './Progress/Progress';

class RaidProgression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMe: false,
      showHeroic: false,
      showMythic: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitHeroic = this.handleSubmitHeroic.bind(this);
    this.handleSubmitMythic = this.handleSubmitMythic.bind(this);
  }

  handleSubmit(){
    this.setState({showMe: !this.state.showMe});
  }

  handleSubmitHeroic(){
    this.setState({showHeroic: !this.state.showHeroic});
  }

  handleSubmitMythic(){
    this.setState({showMythic: !this.state.showMythic});
  }

  render() {
    const { progress } = this.props;
    const bossKills = _.last(progress.raids).bosses;
    let normal = 0;
    let heroic = 0;
    let mythic = 0;
    let normalTotal = 0;
    let heroicTotal = 0;
    let mythicTotal = 0;

    _.forEach(bossKills, (key) => {
      if (key.normalKills > 0) {
        normalTotal+=key.normalKills;
        normal++;
      }
      if (key.heroicKills > 0) {
        heroicTotal+=key.heroicKills;
        heroic++;
      }
      if (key.mythicKills > 0) {
        mythicTotal+=key.mythicKills;
        mythic++;
      }
    });

    return (
      <div className={styles.raid}>
        <div className={styles.content}>
          <div className={styles.detail}>
            <table className={styles.tableDetails}>
              <thead>
                <tr>
                  <th className={styles.tableHead}>{_.last(progress.raids).name}</th>
                  <th className={cx(styles.tableHead, styles.tableCenter)}>Progress</th>
                  <th className={cx(styles.tableHead, styles.tableCenter)}>Boss Kills</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.pointer} onClick={this.handleSubmit}>
                    <span>
                      Normal
                      { this.state.showMe ? <FaCaretDown /> : <FaCaretRight /> }
                    </span>
                  </td>
                  <td className={styles.tableCenter}>
                    <Progress difficulty={normal}/>
                  </td>
                  <td className={styles.tableCenter}>
                    <BossKills total={normalTotal}/>
                  </td>
                </tr>
              </tbody>
              { this.state.showMe &&
                <tbody>
                  {_.map(bossKills, (kills) =>
                    <NormalCard
                      key={kills.id}
                      kills={kills}
                    />
                  )}
                </tbody>
              }
              <tbody>
                <tr>
                  <td className={styles.pointer} onClick={this.handleSubmitHeroic}>
                    <span>
                      Heroic
                      { this.state.showHeroic ? <FaCaretDown /> : <FaCaretRight /> }
                    </span>
                  </td>
                  <td className={styles.tableCenter}>
                    <Progress difficulty={heroic} />
                  </td>
                  <td className={styles.tableCenter}>
                    <BossKills total={heroicTotal} />
                  </td>
                </tr>
              </tbody>
              { this.state.showHeroic &&
                <tbody>
                  {_.map(bossKills, (kills) =>
                    <HeroicCard
                      key={kills.id}
                      kills={kills}
                    />
                  )}
                </tbody>
              }
              <tbody>
                <tr>
                  <td className={styles.pointer} onClick={this.handleSubmitMythic}>
                    <span>
                      Mythic
                      { this.state.showMythic ? <FaCaretDown /> : <FaCaretRight /> }
                    </span>
                  </td>
                  <td className={styles.tableCenter}>
                    <Progress difficulty={mythic} />
                  </td>
                  <td className={styles.tableCenter}>
                    <BossKills total={mythicTotal} />
                  </td>
                </tr>
              </tbody>
              { this.state.showMythic &&
                <tbody>
                  {_.map(bossKills, (kills) =>
                    <MythicCard
                      key={kills.id}
                      kills={kills}
                    />
                  )}
                </tbody>
              }
            </table>
          </div>
        </div>
      </div>
    );
  }
}

RaidProgression.propTypes = {
  progress: PropTypes.object.isRequired
}

export default RaidProgression;
