import { useEffect, useState } from 'react';
import { API_BASE } from './api'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Main from './components/Main'
import { Flex } from '@chakra-ui/react'
import './styles/App.scss'

function App() {
  const [user, setUser] = useState(null)

  useEffect(async () => {
    const res = await fetch(`${API_BASE}/users`)
    const json = await res.json()
    setUser(json.data[0])
  }, [])

  return (
    <Flex direction="column" align="stretch" h="100%">
      <Header user={user}/>
      <Flex direction="row" flex={1}>
        <Sidebar/>
        <Main/>
      </Flex>
     <Footer/>
    </Flex>
  );
}

export default App;
