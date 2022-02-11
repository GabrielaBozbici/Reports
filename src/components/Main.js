import '../styles/Main.scss'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useEffect, useState, forwardRef } from 'react';
import { API_BASE } from '../api'
import ProjectDetails from './ProjectDetails';
import PieChartCustom from './PieChart';
import Empty from './Empty';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Flex,
  Button, 
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Accordion
} from '@chakra-ui/react'

const Main = () => {
  const [projects, setProjects] = useState([])
  const [selectedProjects, setSelectedProjects] = useState([])
  const [gateways, setGateways] = useState([])
  const [selectedGateways, setSelectedGateways] = useState([])

  const [chartData, setChartData] = useState(null)

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [reports, setReports] = useState(null);

  useEffect(() => {
    loadProjects()
    loadGateways()
  }, [])

  const loadProjects = async() => {
    const res = await fetch(`${API_BASE}/projects`)
    const json = await res.json()
    setProjects(json.data)
  }

  const loadGateways = async() => {
    const res = await fetch(`${API_BASE}/gateways`)
    const json = await res.json()
    setGateways(json.data)
  }

  const loadReport = async() => {
    setReports([])
    setChartData(null)

    const req = await fetch(`${API_BASE}/report`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        projectId: selectedProjects.length === 1 ? selectedProjects[0].projectId : '',
        gatewayId: selectedGateways.length === 1 ? selectedGateways[0].gatewayId : '',
        from: fromDate && fromDate.toISOString().substr(0,10),
        to: toDate && toDate.toISOString().substr(0,10),
      })
    })
    const r = await req.json()

    if(selectedProjects.length === 1 && selectedGateways.length > 1) {
      let reports = selectedProjects.length ? selectedGateways : gateways;
      reports.map((report) => {
        report.transations = r.data.filter((transaction) => transaction.gatewayId === report.gatewayId)
        report.total = report.transations.reduce(function (a, b) { return a + b.amount; }, 0);
        return report
      })
      setReports(reports)
    } else {
      let reports = selectedProjects.length ? selectedProjects : projects;
      reports.map((report) => {
        report.transations = r.data.filter((transaction) => transaction.projectId === report.projectId)
        report.total = report.transations.reduce(function (a, b) { return a + b.amount; }, 0);
        return report
      })
      setReports(reports)
    }

    if(selectedProjects.length > 1 && selectedGateways.length === 1) {
      const data = reports.map((report) => {
        return {name: report.name, value: parseInt(report.total)}
      })
      setChartData(data);
    }
  }

  const DatePickerTrigger = forwardRef(({ value, onClick, label }, ref) => {
    return (
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} onClick={onClick} ref={ref}>
        {label} {value}
      </MenuButton>
    )
  });
  
  return (
    <Flex direction="column" flex="1">
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text fontSize='2xl' variant='darkBlue' mt={5}>
            Reports
          </Text>
          <Text fontSize='sm' variant='grey'>
           Easily generate a report of your transaction
          </Text>
        </Flex>
        <Flex className="filters">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {selectedProjects.length == 1 && `${selectedProjects[0].name}` }
              {selectedProjects.length > 1 &&  'All Projects'}
              {selectedProjects.length == 0 &&  'Select Project' }
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSelectedProjects(projects)}>
                All Projects
              </MenuItem>
              {projects.map((item) => <MenuItem key={item.projectId} onClick={() => setSelectedProjects([item])}>{item.name}</MenuItem>)}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {selectedGateways.length === 1 && `${selectedGateways[0].name} `}
              {selectedGateways.length > 1 && 'All Gateways'}
              {selectedGateways.length == 0 && 'Select Gateways'}
            </MenuButton>
            <MenuList>
            <MenuItem onClick={() => setSelectedGateways(gateways)}>All Gateways</MenuItem>
              {gateways.map((item) => <MenuItem key={item.gatewayId} onClick={() => setSelectedGateways([item])}>{item.name}</MenuItem>)}
            </MenuList>
          </Menu>
          
          <Menu>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              customInput={<DatePickerTrigger label="From" />}
            />
          </Menu>

          <Menu>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              customInput={<DatePickerTrigger label="To" />}
            />
          </Menu>
           
          <Button variant='blue' onClick={loadReport}>Generate Report</Button>
        </Flex>
      </Flex>

      {reports ? (
      <Flex className="reports" pr="2" direction="row" py={10}>
        <Box flex={1}>
          <Box bg="blueLight" p={10}>
            <Text>
              {selectedProjects.length != 1 ? 'All Projects' : `${selectedProjects[0].name} `}
              {selectedGateways.length != 1 ? ' | All Gateways' : ` | ${selectedGateways[0].name} `}
            </Text>
            <Accordion allowMultiple bg="blueLight" width='100%' my={5}>
              {reports.length && reports.map((item, index) => <ProjectDetails key={index} selectedGateways={selectedGateways} selectedProjects={selectedProjects} project={item} />)}
            </Accordion>
          </Box>

          {reports.length && reports.length > 1? (
            <Box>
              <b>Total:</b> ${reports.length && parseInt(reports.reduce((a, b) => a.total + b.total) )} USD
            </Box>
          ): null}
        </Box>

        {chartData && (<PieChartCustom chartData={chartData} />)}
      </Flex>) : <Empty />}
    </Flex>
  )
}

export default Main