import React from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../atoms/heading';
import { LabelSelectField } from '../../components/LabelSelectField';
import { LabelTextField } from '../../components/LabelTextField';

const wrapId = (htmlId: string) => `personalia.${htmlId}`;

export const Personalia: React.FC<{}> = () => (
    <>
        <Heading level={2} mx="auto" mb="4">
            Personalia
        </Heading>
        <Flex>
            <LabelTextField id={wrapId("firstname")} label="Voornaam" />
        </Flex>
        <Flex>
            <LabelTextField id={wrapId("lastname")} label="Achternaam" boxProps={{ mr: 2 }} />
            <LabelTextField id={wrapId("girlname")} label="Meisjesnaam" boxProps={{ ml: 2 }} />
        </Flex>
        <Flex>
            <LabelTextField id={wrapId("callname")} label="Roepnaam" />
        </Flex>
        <Flex>
            <LabelSelectField id={wrapId("title")} label="Titelactuur" name="titelactuur">
                <option value="deheer">De heer</option>
                <option value="mevrouw">Mevrouw</option>
            </LabelSelectField>
        </Flex>
        <Flex>
            <LabelSelectField id={wrapId("gender")} label="Geslacht" name="geslacht">
                <option value="man">Man</option>
                <option value="vrouw">Vrouw</option>
                <option value="non">Wil ik niet zeggen</option>
            </LabelSelectField>
        </Flex>
        <Flex>
            <LabelTextField id={wrapId("address")} label="Adres" />
        </Flex>
        <Flex>
            <LabelTextField id={wrapId("postal")} label="Postcode" />
        </Flex>
        <Flex>
            <LabelTextField id={wrapId("town")} label="Plaats" />
        </Flex>
        <Flex>
            <LabelTextField id={wrapId("bsn")} label="BSN" />
        </Flex>
        <Flex>
            <LabelTextField id={wrapId("dateOfBirth")} label="Geboortedatum" placeholder="13-12-1901" type='date' />
        </Flex>
        <Flex>
            <LabelTextField id={wrapId("amountOfChildren")} label="Aantal Kinderen" boxProps={{ mr: 2 }} />
            <LabelTextField id={wrapId("amountOfMinors")} label="Aantal minderjarig" boxProps={{ ml: 2 }} />
        </Flex>
        <Flex>
            <LabelTextField id={wrapId("maritalStatus")} label="Burgelijke Staat" />
        </Flex>
        <Flex>
            <LabelTextField id={wrapId("religion")} label="Geloofsovertuiging" />
        </Flex>
    </>
);