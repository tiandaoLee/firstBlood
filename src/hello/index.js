import React from 'react';

import styles from 'styles/index.less';

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p className={styles.green_color}>第一次玩webpack，哈哈哈哈～</p>
    );
  }
}