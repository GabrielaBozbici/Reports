
import { Flex,Text, Image, Box} from '@chakra-ui/react'
import noReports from '../assets/noReports.svg'

const Empty = () => {
  return (
    <Flex direction="column" align="center" p="40">
      <Text fontSize='2xl' variant='darkBlue'>No reports</Text> 
      <Text fontSize='sm' variant='grey' align="center">
        Currently you have no data for the reports to be generated.<br/>
        Once you start generating traffic through the Balance application 
        the reports will be shown.
      </Text>
      <Box boxSize='sm' p="5">
        <Image src={noReports} alt="no reports" />
      </Box>
    </Flex>
  )
}

export default Empty