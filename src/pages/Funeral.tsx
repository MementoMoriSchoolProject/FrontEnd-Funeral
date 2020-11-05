import React from 'react';
import '../App.css';
import { Flex, Box, Heading, Button } from 'rebass';
import LabelTextField from '../components/LabelTextField';
import LabelSelectField from '../components/LabelSelectField';
import { Header } from '../components/header/Header';

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
                <Flex>
                    <LabelTextField id="bsn" label="BSN" />
                </Flex>
                <Flex>
                    <LabelTextField id="geboortedatum" label="Geboortedatum" placeholder="13-12-1901" />
                </Flex>
                <Flex>
                    <LabelTextField id="geboorteplaats" label="Geboorteplaats" />
                </Flex>
                <Flex>
                    <LabelTextField id="aantalkinderen" label="Aantal Kinderen" />
                    <LabelTextField id="aantalminderjarig" label="Aantal minderjarig" />
                </Flex>
                <Flex>
                    <LabelTextField id="burgelijkestaat" label="Burgelijke Staat" />
                </Flex>
                <Flex>
                    <LabelTextField id="geloofsovertuiging" label="Geloofsovertuiging" />
                </Flex>
                <Heading fontSize={[1, 2, 3]} color="#000" mx="auto" mb="4">
                    Verzekering
                </Heading>
                <Box p={4} mb={4} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }}>
                    <Flex>
                        <LabelTextField id="maatschappij" label="Maatschappij" />
                    </Flex>
                    <Flex>
                        <LabelTextField id="polisnummer" label="Polisnummer" />
                    </Flex>
                </Box>
                <Button width={1} mb={4} py={3} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }} bg="#A0BDE3">Voeg verzekering toe</Button>
                <Heading fontSize={[1, 2, 3]} color="#000" mx="auto" mb="4">
                    Overlijden
                </Heading>
            </Box>
        </>
    );
};

interface ColoredLineProps {
    color: string;
    height: string;
}

export default Funeral;
