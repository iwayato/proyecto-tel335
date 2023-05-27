import { 
    Button
} from '@chakra-ui/react'
import {useLocation} from 'react-router-dom';

const Notebooks = () => {
    const location = useLocation();
    console.log(location.state.userID);
    return (
        <div>
            Notebooks
            <br></br>
            <Button>Agregar notebook</Button>
        </div>
    )
}

export default Notebooks;