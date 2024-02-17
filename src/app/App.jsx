//import './App.css'

import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {DataProvider} from '../speedPicks/SPDataContext.jsx'
import MainPage from './MainPage.jsx'

const theme = createTheme({
    palette: {
        mode: 'light'
    }
})

function App() {
    const style = getRootStyle(theme)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <style>{style}</style>

            <DataProvider>
                <MainPage/>
            </DataProvider>
        </ThemeProvider>
    )
}

const getRootStyle = styleTheme => {
    const linkTextColor = styleTheme.palette.text.icon
    const backgroundColor = styleTheme.palette.background.default

    return `
            body {
                background-color: ${backgroundColor};
                margin: 0;
                padding: 0;
            }
            
            a {
                color: ${linkTextColor};
            }
            
            pre{ 
                white-space: pre-wrap; 
                word-break: break-word;
            }
            
            button[class*="Mui"]:focus {
                outline: none !important;
            }

            :root {
              color-scheme: dark;
              overflow-y: scroll;
              max-width: 780px;
              margin: 0 auto;
              padding: 2rem;
              text-align: left;
            }
            .card {
              padding: 2em;
            }
        `
}

export default App
