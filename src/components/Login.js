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
import { Link } from "react-router-dom";
import { useState } from "react";
import URLs from "../URLs";
import Messages from "../Messages"

const Login = () => {

    const navigate = useNavigate();
    const toast = useToast()

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')

    const handleEmailChange = e => setEmail(e.target.value)
    const handlePwdChange = e => setPwd(e.target.value)

    const login = () => {
        if (!email | !pwd) {
            return (
                toast({
                    title: Messages.Login.CredentialsNeeded,
                    status: 'error',
                    duration: 3000,
                    position: 'top',
                    isClosable: false,
                })
            )
        }
        else {
            axios.post(URLs.Login, {
                email: email,
                password: pwd
            })
            .then((response) => {
                navigate("Notebooks", {state:{JWT:response.data}})
                return (
                    toast({
                        title: Messages.Login.LoginSuccessful,
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
                        title: `${response.response.data}`,
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
                        placeholder="Email"
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
                        onClick={login}>
                        Iniciar sesión
                    </Button>
                <Link to="SignUp">¿Aún no estás registrado?</Link>
                </VStack>
            </FormControl>
        </Center>
    )
}

export default Login;