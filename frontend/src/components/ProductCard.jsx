import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast, Button, VStack, Input } from '@chakra-ui/react'
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Modal, useDisclosure
} from '@chakra-ui/react'


import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons"
import React, { useState } from 'react'
import { useProductStore } from '../store/product'

const ProductCard = ({ product }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isProductOpen, setIsProductOpen] = useState(false);


    const [updatedProduct, setUpdatedProduct] = useState(product);


    const textColor = useColorModeValue('gray.600', 'gray.200')
    const bg = useColorModeValue('white', 'gray.800')

    const { deleteProduct, updateProduct } = useProductStore();

    const toast = useToast();

    const handleDelete = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (success) {

            toast({
                title: 'Success.',
                description: message,
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
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
    }

    const handleUpdate = async (pid, updatedProduct) => {
        if (updatedProduct.price <= 0) {
            toast({
                title: 'Invalid Price',
                description: 'Price must be a positive number.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        if (updatedProduct.rating < 0 || updatedProduct.rating > 5 || !Number.isInteger(Number(updatedProduct.rating))) {
            toast({
                title: 'Invalid Rating',
                description: 'Rating must be an integer between 0 and 5.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();

        if (success) {
            toast({
                title: 'Success.',
                description: 'Product updated successfully',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };


    const onProductOpen = () => {
        console.log("Modal Opened");
        setIsProductOpen(true);
    }
    const onProductClose = () => {
        console.log("Modal Closed");
        setIsProductOpen(false);
    }

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit={'cover'} />

            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor}>
                    ₹{product.price}
                </Text>

                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor}>
                    Rating: {"⭐".repeat(product.rating)}
                </Text>

                {
                    product.review &&

                    <Text fontWeight={'bold'} fontSize={'xl'} color={textColor}>
                        Review: {product.review.length > 15 ? product.review.substring(0, 15) + "..." : product.review}
                    </Text>
                }


                <HStack spacing={2} mt={2}>
                    <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
                    <IconButton icon={<ViewIcon />} colorScheme='blue' onClick={onProductOpen} />
                    <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={() => handleDelete(product._id)} />
                </HStack>

            </Box>

            <Modal isOpen={isProductOpen} onClose={onProductClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{product.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} alignItems={"self-start"} >
                            <Image src={product.image} h={200} objectFit="contain" alignSelf={'center'} />
                            <Text><strong>Price:</strong> ₹{product.price}</Text>
                            <Text><strong>Rating:</strong> {"⭐".repeat(product.rating)}</Text>

                            {product.review &&
                                <Text><strong>Review:</strong> {product.review}</Text>}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' onClick={onProductClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>

                            <Input
                                placeholder="Product Name"
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />

                            <Input
                                placeholder="Price"
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Review (Otional)'
                                name='review'
                                value={updatedProduct.review}
                                onChange={(e) => {
                                    setUpdatedProduct({ ...updatedProduct, review: e.target.value })
                                }}
                            />

                            <Input
                                placeholder='Rating Out Of 5'
                                name='rating'
                                type='number'
                                max={5}
                                min={0}
                                value={updatedProduct.rating}
                                onChange={(e) => {
                                    const value = Math.max(0, Math.min(5, Number(e.target.value)));
                                    setUpdatedProduct({ ...updatedProduct, rating: value })
                                }}
                            />

                            <Input
                                placeholder="Image"
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />

                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' variant='ghost' mr={3} onClick={() => handleUpdate(product._id, updatedProduct)}>Update</Button>
                        <Button variant='ghost' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box >
    )
}

export default ProductCard
