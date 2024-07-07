import { createTheme } from '@mui/material/styles';


export const themeFull = createTheme({
  palette: {
    primary: {
      main: '#17332A', // Primary color
    },
    secondary: {
      main: '#C97B5B', // Secondary color
    },
    accent: {
      main: '#EEB85D', // Accent color
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 40, // Set the desired height
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px'
        },
        containedPrimary: {
          backgroundColor: '#17332A',
          color: '#FEF8E9',
          '&:hover': {
            backgroundColor: '#1f4437',
          },
        },
        containedSecondary: {
          backgroundColor: '#C97B5B',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#d88b73',
          },
        },
        outlinedPrimary: {
          borderColor: '#17332A',
          color: '#17332A',
          '&:hover': {
            borderColor: '#1f4437',
            backgroundColor: 'rgba(23, 51, 42, 0.04)',
          },
        },
        outlinedSecondary: {
          borderColor: '#C97B5B',
          color: '#C97B5B',
          '&:hover': {
            borderColor: '#d88b73',
            backgroundColor: 'rgba(201, 123, 91, 0.04)',
          },
        },
      },
    },
  }
})

export const colorTheme = createTheme({
  palette: {
    primary: {
      main: '#C97B5B', 
    },
    secondary: {
      main: '#EEB85D', // Light blue color
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export const colorThemeDark = createTheme({
  palette: {
    primary: {
      main: '#17332A', // Dark green color
    },
    secondary: {
      main: '#FEF8E9', // Light orange color
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export const inputTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 40, // Set the desired height
        },
      },
    },
  },
});

