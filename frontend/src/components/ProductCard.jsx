import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast, Button, VStack, Input } from '@chakra-ui/react'
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Modal, useDisclosure
} from '@chakra-ui/react'


import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import React, { useState } from 'react'
import { useProductStore } from '../store/product'

const ProductCard = ({ product }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

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
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();

        if (success) {

            toast({
                title: 'Success.',
                description: "Product updated successfully",
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


                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
                    <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={() => handleDelete(product._id)} />
                </HStack>

            </Box>

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
