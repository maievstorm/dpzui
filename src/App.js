import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';



// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
// import RenderOnAuthenticated from 'components/RenderOnAuthenticated';
// import RenderOnAnonymous from 'components/RenderOnAnonymous';
import Welcome from 'components/welcome';
import UserService from 'services/UserService';



// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    // console.log(UserService.ckLoggedIn());
    // console.log(UserService.isLoggedIn());
    // console.log(UserService.getToken());
    


    // return (
    //     <StyledEngineProvider injectFirst>
    //         {
    //             UserService.isLoggedIn() &&
    //             console.log('ddddd')&&
    //             <ThemeProvider theme={themes(customization)}>
    //                 <CssBaseline />
    //                 <NavigationScroll>
    //                     <Routes />
    //                 </NavigationScroll>
    //             </ThemeProvider>
    //         }
    //         {
               
    //             !UserService.isLoggedIn() && 
    //             <ThemeProvider theme={themes(customization)}>
    //             <CssBaseline />
    //             <NavigationScroll>
    //                 <Welcome />
    //             </NavigationScroll>
    //         </ThemeProvider>
    //         }

    //     </StyledEngineProvider>

    // );

    if (UserService.isLoggedIn())
    {
       
        return (
        <StyledEngineProvider injectFirst>
               
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            
            </StyledEngineProvider>
        )


    } else
    {
       
        return (
            <StyledEngineProvider injectFirst>
                   
                    <ThemeProvider theme={themes(customization)}>
                        <CssBaseline />
                        <NavigationScroll>
                            <Welcome />
                        </NavigationScroll>
                    </ThemeProvider>
                
                </StyledEngineProvider>
            )
    }

    




};
export default App;
