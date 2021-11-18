import React from 'react';
import { palette } from '../theme/theme';
import store from '../store/store';
import styles from './ThemeProvider.module.css';

function ThemeProvider({ children }) {
    document.body.style = `background: ${[palette[store.getState().themeProvider.current].background]};`;
    return (
        <div className={styles.themeProvider}>
            {children}
        </div>
    );
}

export default ThemeProvider;
