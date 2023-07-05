import {
    useToast,
    Card,
    CardHeader,
    Heading,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    HStack,
    Input
} from "@chakra-ui/react";
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import URLs from "../URLs";
import Messages from "../Messages";
import { useState } from "react";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";

const PageCard = ({page_id, titulo, texto, fecha, jwt, refreshNotebookPagesHandler}) => {

    const toast = useToast()
    const [value, setValue] = useState(texto)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editTitle, setEditTitle] = useState(false)
    const [newTitle, setNewTitle] = useState(titulo)
    const [date, setDate] = useState(fecha)

    const savePage = (id, title, text, date, jwt) => {
        axios.put(URLs.SavePage,
        {
            page_id: id,
            titulo: title,
            texto: text,
            fecha: date
        },
        {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(() => {
            toast({
                title: Messages.Pages.PageUpdatedSuccessful,
                status: 'success',
                duration: 3000,
                position: 'top',
                isClosable: false,
            })
        })
        .catch(() => {
            toast({
                title: Messages.Pages.ErrorWhenSaving,
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: false,
            })
        })
    }

    const deletePage = (pageID, jwt) => {
        axios.delete(URLs.DeleteNotebookPage + pageID, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(() => {
            refreshNotebookPagesHandler();
            toast({
                title: Messages.Pages.PageDeletedSuccessful,
                status: 'success',
                duration: 3000,
                position: 'top',
                isClosable: false,
            })
        })
        .catch(() => {
            toast({
                title: Messages.Pages.ErrorWhenDeletingPage,
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: false,
            })
        })
    }

    const editTitleHandler = (e) => {
        setNewTitle(e.target.value)
    };

    return (
        <Card background={"gray.300"}>
            <CardHeader>
                <Heading size='md' mb={2}>{
                    editTitle? <Input placeholder="Nuevo título" onChange={editTitleHandler}></Input> : newTitle}
                </Heading>
                <HStack w="100%">
                    <Button size="sm" colorScheme="orange" onClick={onOpen} w="15%">
                        <ViewIcon></ViewIcon>
                    </Button>
                    <Button size="sm" colorScheme="red" w="15%" onClick={() => {deletePage(page_id, jwt)}}>
                        <DeleteIcon></DeleteIcon>
                    </Button>
                    <Button
                        w="70%"
                        size="sm"
                        colorScheme={editTitle? "green" : "blue"}
                        onClick={() => {
                            if (editTitle) {
                                savePage(page_id, newTitle, value, new Date().toJSON(), jwt)
                                setDate(new Date().toJSON().split("T")[0])
                                setEditTitle(!editTitle)
                            }
                            else {
                                setEditTitle(!editTitle)
                            }
                        }}>
                            {editTitle? "Guardar" : "Cambiar título"}
                    </Button>
                </HStack>
                <Text pt='2' fontSize='sm'>{date.split("T")[0]}</Text>
            </CardHeader>

            <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {newTitle}
                    </ModalHeader>
                    <ModalBody>
                        <MDEditor height="83vh" value={value} onChange={setValue} fullscreen={false}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            isDisabled={value !== texto? false : true}
                            colorScheme='blue'
                            mr={3}
                            onClick={() => savePage(page_id, newTitle, value, new Date().toJSON(), jwt)}>
                            Guardar cambios
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Card>
    )
}

export default PageCard;