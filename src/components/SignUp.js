import {
    useToast,
    FormControl,
    Input,
    Button,
    Center,
    VStack,
    Heading,
    Card,
    CardHeader,
    CardBody
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import URLs from "../URLs";
import Messages from "../Messages";

const SignUp = () => {
    
    const navigate = useNavigate();
    const toast = useToast()

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')

    const handleNameChange = e => setName(e.target.value)
    const handleLastNameChange = e => setLastName(e.target.value)
    const handleUserNameChange = e => setUserName(e.target.value)
    const handleEmailChange = e => setEmail(e.target.value)
    const handlePwdChange = e => setPwd(e.target.value)

    const signUpState = () => {
        if (!name | !lastName | !userName | !email | !pwd) {
            return (
                toast({
                    title: Messages.SignUp.BlankFields,
                    description: Messages.SignUp.MustCompleteAllFields,
                    status: 'error',
                    duration: 3000,
                    position: 'top',
                    isClosable: false,
                })
            )
        }
        else {
            axios.post(URLs.SignUp, {
                name: name,
                lastname: lastName,
                username: userName,
                email: email,
                password: pwd
            })
            .then((response) => {
                navigate('/')
                return (
                    toast({
                        title: `${response.data}`,
                        status: 'success',
                        duration: 3000,
                        position: 'top',
                        isClosable: false,
                    })
                )
            })
            .catch(() => {
                return (
                    toast({
                        title: Messages.SignUp.ErrorWhenSigningUp,
                        status: 'error',
                        duration: 3000,
                        position: 'top',
                        isClosable: false,
                    })
                )
            })
        }
    }

    return (
        <Center h='100vh' w='100%' backgroundColor={"gray.300"}>
            <Card w="20%">
                <CardHeader>
                    <Center>
                        <Heading fontSize='3xl'>Simple Notes</Heading>
                    </Center>
                </CardHeader>
                <CardBody>
                    <FormControl>
                        <VStack spacing={5}>
                            <Input
                                placeholder="Nombre"
                                value={name}
                                onChange={handleNameChange}>
                            </Input>
                            <Input
                                placeholder="Apellido"
                                value={lastName}
                                onChange={handleLastNameChange}>
                            </Input>
                            <Input
                                placeholder="Nombre de usuario"
                                value={userName}
                                onChange={handleUserNameChange}>
                            </Input>
                            <Input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}>
                            </Input>
                            <Input
                                placeholder="Contraseña"
                                type="password"
                                value={pwd}
                                onChange={handlePwdChange}>
                            </Input>
                            <Button
                                colorScheme="blue"
                                onClick={signUpState}>
                                Regístrate
                            </Button>
                        </VStack>
                    </FormControl>
                </CardBody>
            </Card>
        </Center>
    )
}

export default SignUp;