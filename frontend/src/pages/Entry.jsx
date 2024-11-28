import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Flex,
    Text,
    Button,
    VStack,
    Image,
    useColorModeValue,
} from "@chakra-ui/react";

const EntryPage = () => {
    const bgColor = useColorModeValue("gray.50", "gray.800");
    const textColor = useColorModeValue("gray.700", "gray.100");

    const navigate = useNavigate();
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bg={bgColor}
            px={6}
        >
            <Box
                bg={useColorModeValue("white", "gray.700")}
                p={10}
                rounded="lg"
                shadow="lg"
                maxW="sm"
                textAlign="center"
            >
                <Image
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    alt="Product Nest Logo"
                    mb={6}
                    mx="auto"
                    borderRadius="full"
                    boxSize="100px"
                />
                <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={4}>
                    Welcome to Product Nest
                </Text>
                <Text fontSize="md" color={textColor} mb={8}>
                    Create, manage, and share personalized product recommendations.
                    Get started now!
                </Text>
                <VStack spacing={4}>
                    <Button
                        colorScheme="blue"
                        variant="solid"
                        w="full"
                        size="lg"
                        onClick={() => navigate("/signUp")}
                    >
                        Sign Up
                    </Button>
                    <Button
                        colorScheme="blue"
                        variant="outline"
                        w="full"
                        size="lg"
                        onClick={() => navigate("/signIn")}
                    >
                        Sign In
                    </Button>
                    <Button
                        colorScheme="gray"
                        variant="outline"
                        w="full"
                        size="lg"
                        onClick={() => navigate('/homePage')}
                    >
                        Continue as Guest
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
};

export default EntryPage;
