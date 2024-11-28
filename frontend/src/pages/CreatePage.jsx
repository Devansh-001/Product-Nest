import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState(
    {
      name: "",
      price: "",
      image: "",
      rating: "",
      review: "",
    });

  const { createProduct } = useProductStore();

  const toast = useToast()
  const navigate = useNavigate();
  const handleAddProduct = async () => {

    if (newProduct.price < 0) {
      toast({
        title: 'Invalid Price',
        description: 'Price must be a positive number.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    if (newProduct.rating < 0 || newProduct.rating > 5 || !Number.isInteger(Number(newProduct.rating))) {
      toast({
        title: 'Invalid Rating',
        description: 'Rating must be an integer between 0 and 5.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      navigate("/homePage")
    }
    else {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
    setNewProduct({ name: "", price: "", image: "", rating: "", review: "" });
  }
  return (

    <Container maxW={"container.sm"}>

      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
        <Box w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />

            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />

            <Input
              placeholder='Review (Otional)'
              name='review'
              value={newProduct.review}
              onChange={(e) => setNewProduct({ ...newProduct, review: e.target.value })}
            />

            <Input
              placeholder='Rating Out Of 5'
              name='rating'
              type='number'
              max={5}
              min={0}
              value={newProduct.rating}
              onChange={(e) => {
                const value = Math.max(0, Math.min(5, Number(e.target.value)));
                setNewProduct({ ...newProduct, rating: value })
              }}
            />

            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            {/* <Input
              type='file'
              accept="image/*"
            /> */}


            <Button w={'full'} colorScheme='blue' onClick={handleAddProduct}>Add Product</Button>

          </VStack>

        </Box>
      </VStack>

    </Container>
  )
}

export default CreatePage
