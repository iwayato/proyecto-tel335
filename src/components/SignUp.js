import {
    useToast,
    FormControl,
    Input,
    Button,
    Center,
    VStack,
    Text
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
            .catch((response) => {
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
        <Center h='100vh' w='100%'>
            <FormControl>
                <VStack spacing={5}>
                    <Text fontSize='3xl'>Simple Notes</Text>
                    <Input
                        w='20%'
                        placeholder="Nombre"
                        value={name}
                        onChange={handleNameChange}>
                    </Input>
                    <Input
                        w='20%'
                        placeholder="Apellido"
                        value={lastName}
                        onChange={handleLastNameChange}>
                    </Input>
                    <Input
                        w='20%'
                        placeholder="Nombre de usuario"
                        value={userName}
                        onChange={handleUserNameChange}>
                    </Input>
                    <Input
                        w='20%'
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}>
                    </Input>
                    <Input
                        w='20%'
                        placeholder="Contraseña"
                        type="password"
                        value={pwd}
                        onChange={handlePwdChange}>
                    </Input>
                    <Button
                        onClick={signUpState}>
                        Regístrate
                    </Button>
                </VStack>
            </FormControl>
        </Center>
    )
}

export default SignUp;