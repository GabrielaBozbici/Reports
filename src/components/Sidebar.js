import Stat from '../assets/Stat.svg'
import Thumb from '../assets/Thumb.svg'
import Desktop from '../assets/Desktop.svg'
import Pie from '../assets/Pie.svg'
import Close from '../assets/Close.svg'

import { Flex, Box } from '@chakra-ui/react'

import '../styles/Sidebar.scss'

const Sidebar = () => {
  return (
    <Flex direction="column">
      <Box mx='10' py="5">
        <img src={Stat} alt="" />
      </Box>
      <Box mx='10' py="5">
        <img src={Thumb} alt="" />
      </Box>
      <Box mx='10' py="5">
        <img src={Desktop} alt="" />
      </Box>
      <Box mx='10' py="5">
        <img src={Pie} alt="" />
      </Box>
      <Box mx='10' py="5">
        <img src={Close} alt="" />
      </Box>
    </Flex>
  )
}

export default Sidebar