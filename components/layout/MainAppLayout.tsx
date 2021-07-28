import { Box } from '@chakra-ui/react'
import Sidebar from './Sidebar/Sidebar'

const MainAppLayout = ({ children }) => {
  return (
    <Sidebar>
      <Box padding="1rem">{children}</Box>
    </Sidebar>
  )
}

export default MainAppLayout
