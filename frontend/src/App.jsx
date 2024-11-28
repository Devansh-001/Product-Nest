import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import EntryPage from "./pages/Entry"
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"

import { useColorModeValue } from "@chakra-ui/react"

function App() {

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/homePage" element={< HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </Box>

    </>
  )
}

export default App
