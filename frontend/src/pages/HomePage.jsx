import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, VStack, Text, SimpleGrid, Box } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {


    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxW="Container.xl" p={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    textAlign={"center"}
                    bgClip={"text"}
                >
                    Current Products 🚀
                </Text>

                <SimpleGrid columns={{
                    base: 1,
                    md: 2,
                    lg: 3,
                }}
                    spacing={10}
                    w={"full"}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}

                </SimpleGrid>


                {products.length === 0 && <Text
                    fontSize="xl"
                    fontWeight={"bold"}
                    color="gray.500"
                    textAlign={"center"}
                >
                    No products found 😢 {" "}
                    <Link to={"/create"}>
                        <Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline" }}> Create Product</Text>
                    </Link>
                </Text>}

                <SimpleGrid columns={2} spacing={10}>
                    <Box bg='tomato' height='80px'></Box>
                </SimpleGrid>
            </VStack>
        </Container>
    )
}

export default HomePage
