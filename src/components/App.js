import {
    Grid,
    GridItem,
    Center
} from '@chakra-ui/react'
import Notebooks from './Notebooks';

function App() {
    return (
        <Grid
            templateAreas = {
                `"header header"
                "nav main"
                "nav footer"`
            }
            gridTemplateRows = {'60px 1fr 30px'}
            gridTemplateColumns = {'200px 1fr'}
            h = '200px'
            color = 'blackAlpha.700'
            fontWeight = 'bold'>

            <GridItem pl='2' bg='orange.300' area={'header'}>
                <Center>
                    Simple Notes
                </Center>
            </GridItem>

            <GridItem pl='2' bg='pink.300' area={'nav'}>
                <Notebooks></Notebooks>
            </GridItem>

            <GridItem pl='2' bg='green.300' area={'main'}>
                Main
            </GridItem>

            <GridItem pl='2' bg='blue.300' area={'footer'}>
                Footer
            </GridItem>

        </Grid>
    );
}

export default App;