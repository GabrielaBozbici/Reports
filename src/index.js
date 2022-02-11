import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"

const Button = {
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: 'base',
  },
  variants: {
    solid: {
      bg: '#1BC5BD',
      color: 'white',
    },
    blue: {
      bg: '#005B96',
      color: 'white'
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'solid',
  },
}
const Text = {
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: 'base',
  },
  variants: {
    blue: {
      color: '#005B96'
    },
    darkBlue: {
      color: '#011F4B'
    },
    grey: {
      color:'#7E8299'
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'blue',
  },
}



const theme = extendTheme({
  colors: {
    transparent: 'transparent',
    blueLight: '#F1FAFE',
    white: '#fff',
    gray: {
      50: '#f7fafc',
      900: '#171923',
    },
  },
  components: {
    Button,
    Text, 
    AccordionItem: {
      baseStyle: {
        border: 0,
        borderRadius: 'base',
      },
    }
  },
})


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
     <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
