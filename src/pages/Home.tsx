import React from 'react';
import '../App.css';
import { Flex, Box, Button } from 'rebass';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';

const Home = () => {
    return (
        <>
            <Header />
            <Box
                as="form"
                onSubmit={(e) => e.preventDefault()}
                p={4}
                mx="auto"
                width={[1, 1, 1 / 3]}
                bg="#C4C4C4"
            >
                <Flex>
                    <Box width={1} p={3} mb={4} bg="#A6A6A6">
                        Funeral 1
                    </Box>
                </Flex>
                <Flex>
                    <Box width={1} p={3} mb={4} bg="#A6A6A6">
                        Funeral 2
                    </Box>
                </Flex>
                <Flex>
                    <Box width={1} p={3} mb={4} bg="#A6A6A6">
                        Funeral 3
                    </Box>
                </Flex>
                <Flex>
                    <Box px={2} mx="auto">
                        <Button bg="#A6A6A6" color="black">
                            <Link to="/funeral" style={{ textDecoration: 'none', color: '#000' }}>
                                Create new funeral
                            </Link>
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default Home;
