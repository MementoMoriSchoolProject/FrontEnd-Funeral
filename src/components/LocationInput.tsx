import React from "react";
import { Flex } from 'rebass';
import { LabelTextField } from './LabelTextField';

export const LocationInput: React.FC<{ id: string }> = () => {

    const wrapId = (htmlId: string) => `layOut.${htmlId}`;

    return (
        <>
            <Flex>
                <LabelTextField id={wrapId("name")} label="Naam" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("address")} label="Achternaam" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("postalCode")} label="Voorletters" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("town")} label="Adres" />
            </Flex>
        </>
    );
};
