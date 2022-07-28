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
  0: '#f44336', //red
  1: '#e91e63', //pink
  2: '#0276aa', //blue
  3: '#357a38', //green
  4: '#311b92', //purple
  5: '#00796b', //teal
  6: '#546e7a', //blueGrey
  7: '#ef6c00', //orange
  8: '#76ff03', //lightGreen
  9: '#00838f', //cyan
}

export type ExactTheme = typeof theme;
export default theme;