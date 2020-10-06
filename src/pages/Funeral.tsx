import React from 'react';
import '../App.css';
import { Flex, Box, Heading } from 'rebass';
import LabelTextField from '../components/LabelTextField';
import LabelSelectField from '../components/LabelSelectField';
import Header from '../components/header/Header';

const ColoredLine = (props: ColoredLineProps) => (
    <hr
        style={{
            color: props.color,
            backgroundColor: props.color,
            height: props.height,
            marginBottom: '32px',
        }}
    />
);

const Funeral = () => {
    return (
        <>
            <Header />
            <Box
                className="scrollbar"
                as="form"
                onSubmit={(e) => e.preventDefault()}
                p={4}
                mx="auto"
                width={[1, 1, 1 / 2]}
                bg="#F5F6F8"
                style={{
                    maxHeight: '650px',
                    overflowY: 'auto',
                }}
            >
                <Flex>
                    <Heading fontSize={[3, 4, 5]} color="#000" mx="auto" mb="4">
                        Gegevens overledene
                    </Heading>
                </Flex>
                <ColoredLine color="black" height="2" />
                <Heading fontSize={[1, 2, 3]} color="#000" mx="auto" mb="4">
                    Personalia
                </Heading>
                <Flex>
                    <LabelTextField id="voornaam" label="Voornaam" />
                </Flex>
                <Flex>
                    <LabelTextField id="achternaam" label="Achternaam" />
                    <LabelTextField id="meisjesnaam" label="Meisjesnaam" />
                </Flex>
                <Flex>
                    <LabelTextField id="roepnaam" label="Roepnaam" />
                </Flex>
                <Flex>
                    <LabelSelectField id="titelactuur" label="Titelactuur" name="titelactuur">
                        <option value="deheer">De heer</option>
                        <option value="mevrouw">Mevrouw</option>
                    </LabelSelectField>
                </Flex>
                <Flex>
                    <LabelSelectField id="geslacht" label="Geslacht" name="geslacht">
                        <option value="man">Man</option>
                        <option value="vrouw">Vrouw</option>
                        <option value="non">Wil ik niet zeggen</option>
                    </LabelSelectField>
                </Flex>
                <Flex>
                    <LabelTextField id="adres" label="Adres" />
                </Flex>
                <Flex>
                    <LabelTextField id="postcode" label="Postcode" />
                </Flex>
                <Flex>
                    <LabelTextField id="plaats" label="Plaats" />
                </Flex>
            </Box>
        </>
    );
};

interface ColoredLineProps {
    color: string;
    height: string;
}

export default Funeral;
