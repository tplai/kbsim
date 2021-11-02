import React from 'react'
import PropTypes from 'prop-types'
import styles from './FooterLink.module.css';

const FooterLink = ({text, url, icon}) => (
  <div className={styles.outer}}>
    {text}
  </div>
)

FooterLink.propTypes = {
  className: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
}

export default FooterLink
