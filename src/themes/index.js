import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    const color = colors;
  

    const DarkTheme={
        colors: color,
        heading: color.primaryLight,
        paper: color.darkLevel1,
        backgroundDefault: color.darkPaper,
        background: color.darkBackground,
        darkTextPrimary: color.primaryLight,
        darkTextSecondary: color.grey900,
        textDark: color.primaryLight,
        menuSelected: color.primaryLight,
        menuSelectedBack: color.darkLevel2,
        divider: color.grey200,
        type: 'dark',
        customization
    }

    const LightTheme={
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
        type: 'light',
        customization
    }

  
    const themeOption=  {};
    if(customization.themeMode==='Light')
    {
        Object.assign(themeOption, LightTheme);

    } else
    {
        Object.assign(themeOption, DarkTheme);
    }
    

    // const themeOption = {
    //     colors: color,
    //     heading: color.grey900,
    //     paper: color.paper,
    //     backgroundDefault: color.paper,
    //     background: color.primaryLight,
    //     darkTextPrimary: color.grey700,
    //     darkTextSecondary: color.grey500,
    //     textDark: color.grey900,
    //     menuSelected: color.secondaryDark,
    //     menuSelectedBack: color.secondaryLight,
    //     divider: color.grey200,
    //     customization


    //     // colors: color,
    //     // heading: color.primaryLight,
    //     // paper: color.darkLevel1,
    //     // backgroundDefault: color.darkPaper,
    //     // background: color.darkBackground,
    //     // darkTextPrimary: color.primaryLight,
    //     // darkTextSecondary: color.grey900,
    //     // textDark: color.primaryLight,
    //     // menuSelected: color.primaryLight,
    //     // menuSelectedBack: color.darkLevel2,
    //     // divider: color.grey200,
    //     // customization
    // };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
