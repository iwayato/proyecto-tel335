import {
    useToast,
    Card,
    CardHeader,
    Heading,
    CardBody,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure
} from "@chakra-ui/react";
import URLs from "../URLs";
import Messages from "../Messages";
import { useState } from "react";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";

const PageCard = ({page_id, titulo, texto, fecha, jwt}) => {
    const toast = useToast()
    const [value, setValue] = useState(texto)
    const { isOpen, onOpen, onClose } = useDisclosure()

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
        .catch((error) => {
            toast({
                title: Messages.Pages.ErrorWhenSaving,
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: false,
            })
        })
    }

    return (
        <Card background={"gray.300"} onClick={onOpen}>
            <CardHeader>
                <Heading size='md'>{titulo}</Heading>
            </CardHeader>
            <CardBody>
                <Text pt='2' fontSize='sm'>Fecha creación: {fecha.split("T")[0]}</Text>
            </CardBody>

            <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{titulo}</ModalHeader>
                    <ModalBody>
                        <MDEditor height="83vh" value={value} onChange={setValue} fullscreen={false}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => savePage(page_id, titulo, value, fecha, jwt)}>
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