import { Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast, Image, Stack } from "@chakra-ui/react"
import React, { useState } from 'react'
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom"

const SignUp = () => {

    const [newUser, setNewUser] = useState(
        {
            name: "",
            email: "",
            password: "",
        });

    const [showPassword, setShowPassword] = useState(false);

    const { createUser } = useUserStore();

    const navigate = useNavigate();

    const toast = useToast()

    const handleUserSignUp = async () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(newUser.email)) {
            toast({
                title: 'Invalid Email',
                description: 'Please enter a valid email address.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        if (!newUser.name || newUser.name.length < 1) {
            toast({
                title: 'Invalid Name',
                description: 'Name cannot be empty.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        const namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(newUser.name)) {
            toast({
                title: 'Invalid Name',
                description: 'Name should only contain letters and spaces.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        if (newUser.password.length < 6) {
            toast({
                title: 'Invalid Password',
                description: 'Password must be at least 6 characters long.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordPattern.test(newUser.password)) {
            toast({
                title: 'Weak Password',
                description: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }


        const { success, message } = await createUser(newUser);

        if (success) {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });

            console.log(message);

            navigate("/homePage")


        } else {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            console.log(message);
            if (message === "An account with this email already exists.") {
                navigate("/signIn")
            }
            else {
                setNewUser({ email: "", name: "", password: "" });
                navigate("/signUp")
            }
        }
    }

    return (
        <Container maxW={"container.sm"} >
            <Box>
                <Image
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    alt="Product Nest Logo"
                    mb={6}
                    mx="auto"
                    borderRadius="full"
                    boxSize="100px"
                />
                <VStack>
                    <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Sign Up</Heading>
                    <Box w={"full"}
                        bg={useColorModeValue("white", "gray.800")}
                        p={6}
                        rounded={"lg"}
                        shadow={"md"}
                    >
                        <VStack spacing={4}>
                            <Input
                                type="string"
                                placeholder="Name"
                                name="name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                            <Stack position="relative" flex={1} w="full" justifyContent="center">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                />
                                <Button
                                    position="absolute"
                                    size="sm"
                                    right={5}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}

                                </Button>
                            </Stack>


                            <Button w={'full'} colorScheme='blue' onClick={handleUserSignUp}>SignUp</Button>

                        </VStack>
                    </Box>
                </VStack>
            </Box>
        </Container>
    )
}

export default SignUp
