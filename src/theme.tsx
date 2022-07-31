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

export const colorMap: {[key: string]: string} = {
  0: '#b71c1c', //red
  1: '#880e4f', //pink
  2: '#0d47a1', //blue
  3: '#1b5e20', //green
  4: '#4a148c', //purple
  5: '#00695c', //teal
  6: '#37474f', //blueGrey
  7: '#e65100', //orange
  8: '#616161', //grey
  9: '#00838f', //cyan
}

export type ExactTheme = typeof theme;
export default theme;