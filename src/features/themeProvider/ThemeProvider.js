import React from 'react';
import { palette } from '../theme/theme';
import store from '../store/store';

function ThemeProvider({ children }) {
    document.body.style = `background: ${[palette[store.getState().themeProvider.current].background]};`;
    return (
        <div>
            {children}
        </div>
    );
}

export default ThemeProvider;
