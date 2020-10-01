import React from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './theme.js';
import { ThemeProvider } from 'emotion-theming';
import Header from './components/header/Header';
import { Flex, Box, Button } from 'rebass';
import { Label, Input } from '@rebass/forms';

function App() {
  return (
    <ThemeProvider
      theme={{
        colors: {
          background: 'black',
          primary: 'tomato',
        },
        space: [0, 6, 12, 24, 48],
        fontSizes: [14, 16, 18, 20, 24],
        radii: {
          default: 12,
        }
      }}>
      <Header />
      <Box
        as='form'
        onSubmit={e => e.preventDefault()}
        p={4}
        mx='auto'
        width={[1, 1, 1 / 3]}
        bg='#C4C4C4'>
        <Flex>
          <Box 
            width={1} 
            p={3}
            mb={4}
            bg='#A6A6A6'>
            Funeral 1
          </Box>
        </Flex>
        <Flex>
          <Box 
            width={1} 
            p={3}
            mb={4}
            bg='#A6A6A6'>
            Funeral 2
          </Box>
        </Flex>
        <Flex>
          <Box 
            width={1} 
            p={3}
            mb={4}
            bg='#A6A6A6'>
            Funeral 3
          </Box>
        </Flex>
        <Flex>
          <Box 
            px={2}
            mx='auto'>
            <Button
              bg='#A6A6A6'
              color='black'>
              Create new funeral
            </Button>
          </Box>
        </Flex>
      </Box>
    </ThemeProvider>
  );
}

export default App;
