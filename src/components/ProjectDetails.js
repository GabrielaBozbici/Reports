import {
Alert,
AlertIcon,
Box,
AccordionItem,
AccordionButton,
AccordionPanel,
AccordionIcon,
Table,
Thead,
Tbody,
Tr,
Th,
Td,
} from '@chakra-ui/react'

const ProjectDetails = ({project, selectedGateways, selectedProjects}) => {
  return (
    <AccordionItem>
      <AccordionButton bg="white">
        <Box flex='1' textAlign='left'>
          {project.name}
        </Box>
        <Box flex='1' textAlign='left'>
          Total: {`${parseInt(project.total)}`} USD
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {project.transations && project.transations.length > 1 ? (
          <Table variant='striped' colorScheme='gray' size='sm'>
            <Thead>
              <Tr>
                <Th>Date</Th>
                {selectedGateways.length !== 1 && (<Th>Gateway</Th>)}
                <Th>Transaction ID</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {project.transations && project.transations.map((transaction) => (
                <Tr key={transaction.paymentId}>
                  <Td>{transaction.modified}</Td>
                  {selectedGateways.length !== 1 && (<Td>{transaction.gatewayId}</Td>)}
                  <Td>{transaction.paymentId}</Td>
                  <Td>{transaction.amount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Alert status='warning'>
            <AlertIcon />
            No transactions available
          </Alert>
        )}
        
      </AccordionPanel>
    </AccordionItem>
  )
}

export default ProjectDetails