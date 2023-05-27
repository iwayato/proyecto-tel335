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

const loginURL = 'http://localhost:3001/api/login';

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
                    title: 'Ingresa tu email y contraseña',
                    status: 'error',
                    duration: 3000,
                    position: 'top',
                    isClosable: false,
                })
            )
        }
        else {
            axios.post(loginURL, {
                email: email,
                password: pwd
            })
            .then((response) => {
                navigate("Notebooks", {state:{userID:response.data.user_id}})
                return (
                    toast({
                        title: `${response.data.Message}`,
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
                        title: `${response}`,
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