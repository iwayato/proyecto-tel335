import {
    Button,
    Grid,
    GridItem,
    VStack
} from '@chakra-ui/react'
import MDEditor from "@uiw/react-md-editor";
import { useState } from 'react';
// import {useLocation} from 'react-router-dom';

const mkdStr = ``;

const Notebooks = () => {
    // const location = useLocation();
    // console.log(location.state.userID);

    const [value, setValue] = useState(mkdStr)
    console.log(mkdStr);

    return (
        <Grid
            templateAreas={`"header header"
                            "nav main"
                            "nav footer"`}
            gridTemplateRows={'50px 1fr 30px'}
            gridTemplateColumns={'200px 1fr'}
            h='100vh'
            gap='0'
            color='blackAlpha.700'
            fontWeight='bold'>
            <GridItem pl='3' pt={3} bg='gray.300' area={'header'}>
                Notebooks
            </GridItem>
            <GridItem bg='gray.600' area={'nav'}>
                <VStack gap={3} mt={3}>
                    <Button>Agregar notebook</Button>
                </VStack>
            </GridItem>
            <GridItem area={'main'}>
                <MDEditor height={"100%"} value={value} onChange={setValue} />
            </GridItem>
            <GridItem pl='2' bg='gray.200' area={'footer'}>
                Proyecto TEL335
            </GridItem>
        </Grid>
    )
}

export default Notebooks;