import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors'
const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#fff',
      },
      info: {
        light: grey[50],
        main: grey[300],
        dark: grey[400],
        contrastText: '#000'
      },
    },
});
export type ExactTheme = typeof theme;
export default theme;