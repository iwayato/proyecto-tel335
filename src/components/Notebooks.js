import {
    Button,
    Grid,
    GridItem,
    VStack,
    SimpleGrid,
    Heading
} from '@chakra-ui/react'
import PageCard from './PageCard';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import URLs from '../URLs';

const Notebooks = () => {
    
    const location = useLocation();
    const [notebooks, setNotebooks] = useState([])
    const [pages, setPages] = useState([])

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

    const getNotebookPages = (notebookID) => [
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
    ]

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
            gridTemplateColumns={'200px 1fr'}
            h='100vh'
            gap='0'
            color='blackAlpha.700'
            fontWeight='bold'>
            <GridItem bg='gray.300' area={'header'}>
                <Heading ml={6} mt={1} size={"lg"}>
                    Notebooks
                </Heading>
            </GridItem>
            <GridItem bg='gray.600' area={'nav'}>
                <VStack gap={3} mt={3}>
                    {
                        notebooks.map((notebook) => 
                            <Button
                                onClick={() => {getNotebookPages(notebook.notebook_id)}}
                                width="80%"
                                key={notebook.notebook_id}
                                color={"black"}
                                background={notebook.color}>
                                {notebook.titulo}
                            </Button>
                        )
                    }
                    <Button width="80%">Agregar notebook</Button>
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
                                jwt={location.state.JWT}>
                            </PageCard>
                        )
                    }
                </SimpleGrid>
            </GridItem>
            <GridItem pl='2' bg='gray.200' area={'footer'}>
                Proyecto TEL335
            </GridItem>
        </Grid>
    )
}

export default Notebooks;