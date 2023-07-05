import {
    useToast,
    Button,
    Grid,
    GridItem,
    VStack,
    SimpleGrid,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Input,
    HStack
} from '@chakra-ui/react'
import { CompactPicker } from 'react-color';
import { AddIcon, DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons';
import PageCard from './PageCard';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import URLs from '../URLs';
import Messages from '../Messages';

const Notebooks = () => {
    
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const location = useLocation();
    const [notebooks, setNotebooks] = useState([])
    const [pages, setPages] = useState([])
    const [color, setColor] = useState('#fff')
    const [title, setTitle] = useState("")
    const [lastClickedNotebook, setLastClickedNotebook] = useState(0)

    const colorPickHandler = (color) => {
        setColor(color.hex);
    }

    const setTitleHandler = (e) => {
        setTitle(e.target.value)
    }

    const getUserNotebooks = () => {
        axios.get(URLs.GetNotebooks, {
            headers: {
                'Authorization': `Bearer ${location.state.JWT}`
            }
        })
        .then((response) => {
            setNotebooks(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const getNotebookPages = (notebookID) => {
        setLastClickedNotebook(notebookID)
        axios.get(URLs.GetNotebookPages + notebookID, {
            headers: {
                'Authorization': `Bearer ${location.state.JWT}`
            }
        })
        .then((response) => {
            setPages(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const addUserNotebook = () => {
        if (!title || !color) {
            return(
                toast({
                    title: Messages.Notebooks.MustNameNotebook,
                    status: 'error',
                    duration: 3000,
                    position: 'top',
                    isClosable: false,
                }) 
            )
        } else {
            axios.post(URLs.AddUserNotebooks,
            {
                titulo : title,
                color : color.toUpperCase()
            },
            {
                headers: {
                    'Authorization': `Bearer ${location.state.JWT}`
                }
            })
            .then(() => {
                toast({
                    title: Messages.Notebooks.AddedSuccessful,
                    status: 'success',
                    duration: 3000,
                    position: 'top',
                    isClosable: false,
                })
                getUserNotebooks();
                onClose();
            })
            .catch(() => {
                toast({
                    title: Messages.Notebooks.ErrorWhenAddingNotebook,
                    status: 'error',
                    duration: 3000,
                    position: 'top',
                    isClosable: false,
                })
            })
        }
    }

    const deleteUserNotebook = (notebookID) => {
        axios.delete(URLs.DeleteNotebook + notebookID, {
            headers: {
                'Authorization': `Bearer ${location.state.JWT}`
            }
        })
        .then(() => {
            toast({
                title: Messages.Notebooks.DeleteSuccessful,
                status: 'success',
                duration: 3000,
                position: 'top',
                isClosable: false,
            })
            getUserNotebooks();
        })
        .catch(() => {
            toast({
                title: Messages.Notebooks.ErrorWhenDeleting,
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: false,
            })
        })
    }

    const addPageToNotebook = (notebookID) => {
        axios.post(URLs.AddPageToNotebook,
        {
            notebook_id : notebookID,
            texto : "",
            titulo : "Nota del " + new Date().toJSON().split("T")[0],
            fecha : new Date().toJSON()
        },
        {
            headers: {
                'Authorization': `Bearer ${location.state.JWT}`
            }
        })
        .then(() => {
            toast({
                title: Messages.Pages.PageCreatedSuccessful,
                status: 'success',
                duration: 3000,
                position: 'top',
                isClosable: false,
            })
            getNotebookPages(notebookID);
        })
        .catch(() => {
            toast({
                title: Messages.Pages.ErrorWhenCreatingPage,
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: false,
            })
        })
    }

    const refreshNotebookPagesHandler = () => {
        getNotebookPages(lastClickedNotebook)
    }

    useEffect(() => {
        getUserNotebooks();
        // eslint-disable-next-line
    }, [])

    return (
        <Grid
            templateAreas={`"header header"
                            "nav main"
                            "nav footer"`}
            gridTemplateRows={'50px 1fr 30px'}
            gridTemplateColumns={'320px 1fr'}
            h='100vh'
            gap='0'
            color='blackAlpha.700'
            fontWeight='bold'>
            <GridItem bg='gray.300' area={'header'}>
                <Heading ml={6} mt={"5px"} size={"lg"}>
                    SimpleNotes
                </Heading>
            </GridItem>
            <GridItem bg='gray.600' area={'nav'}>
                <VStack gap={3} mt={5}>
                    {
                        notebooks.map((notebook) =>
                            <HStack key={notebook.notebook_id} w="90%">
                                <Button
                                    alignContent="left"
                                    overflow="hidden"
                                    w="80%"
                                    onClick={() => {getNotebookPages(notebook.notebook_id)}}
                                    color={"black"}
                                    background={notebook.color}>
                                    {notebook.titulo}
                                </Button>
                                <Button w="10%" onClick={() => {addPageToNotebook(notebook.notebook_id)}}>
                                    <PlusSquareIcon></PlusSquareIcon>
                                </Button>
                                <Button w="10%" colorScheme='red' onClick={() => {deleteUserNotebook(notebook.notebook_id)}}>
                                    <DeleteIcon ></DeleteIcon>
                                </Button>
                            </HStack>
                        )
                    }
                    <Button width="90%" onClick={onOpen}><AddIcon boxSize={6}></AddIcon></Button>
                </VStack>
            </GridItem>
            <GridItem area={'main'}>
                <SimpleGrid columns={4} spacing={5} p={5}>
                    {
                        pages.map((page) => 
                            <PageCard
                                key={page.page_id}
                                page_id={page.page_id}
                                titulo={page.titulo}
                                texto={page.texto}
                                fecha={page.fecha}
                                jwt={location.state.JWT}
                                refreshNotebookPagesHandler={refreshNotebookPagesHandler}>
                            </PageCard>
                        )
                    }
                </SimpleGrid>
            </GridItem>
            <GridItem pl='2' bg='gray.200' area={'footer'}>
                Proyecto TEL335
            </GridItem>

            <Modal isOpen={isOpen} size={"md"} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Añadir notebook</ModalHeader>
                    <ModalBody>
                        <Input placeholder='Título' mb={3} onChange={setTitleHandler}></Input>
                        <CompactPicker color={color} onChangeComplete={colorPickHandler}></CompactPicker>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={addUserNotebook}>
                            Agregar
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Grid>
    )
}

export default Notebooks;