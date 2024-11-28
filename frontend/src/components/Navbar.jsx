import { Container, Flex, Text, HStack, Button, useColorMode } from '@chakra-ui/react';
import { MoonIcon, PlusSquareIcon, SunIcon } from '@chakra-ui/icons';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React from 'react'

const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    const location = useLocation();
    const shouldDisplayLink = location.pathname.endsWith("homePage");
    return (
        <Container maxW={"1140px"} px={4}>
            <Flex h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={{
                    base: "column",
                    sm: "row"
                }}>
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/homePage"}>Product Nest 🛒</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>

                    {shouldDisplayLink &&
                        <Link to={"/create"}>
                            <Button>
                                <PlusSquareIcon fontSize={20} />
                            </Button>
                        </Link>
                    }

                    <Button onClick={toggleColorMode}>
                        {colorMode == "light" ? <MoonIcon /> : <SunIcon />}
                    </Button>

                    <Link to={"/signIn"}>
                        <Button colorScheme="blue" size="md">
                            <FaSignInAlt />
                        </Button>
                    </Link>

                    <Link to={"signUp"}>
                        <Button colorScheme="green" size="md">
                            <FaUserPlus />
                        </Button>
                    </Link>

                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar
