import { Formik } from 'formik';
import React, { useState } from 'react';
import { Flex } from 'rebass';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { DeceasedInfo } from './pages/deceased-info';

const pages: React.FC<{ values: any }>[] = [
    DeceasedInfo,
];

export const CreatingFuneral: React.FC<{}> = () => {
    const [valuesForSaving, setValuesForSaving] = useState();
    const [funeral] = useSelectedFuneral();
    const Page: React.FC<{ values: any }> = pages[funeral?.lastCreationStep || 0];
    return (
        <Formik
            onSubmit={(values: any) => setValuesForSaving(values)}
            initialValues={{
                personalia: funeral?.deceased
            }}
            enableReinitialize={true}
        >
            {({ submitForm }) => (
                <Flex justifyContent='center' alignItems='center' width='100%' height='100vh' bg='background'>
                    <Flex flexGrow={0} onClick={submitForm}>
                        {'<<'}
                    </Flex>
                    <Flex flexGrow={1} justifyContent='center' height='100vh'>
                        <Flex variant='card' justifyContent='stretch' m={5} p={4}>
                            <Page values={valuesForSaving} />
                        </Flex>
                    </Flex>
                    <Flex flexGrow={0} onClick={submitForm}>
                        {'>>'}
                    </Flex>
                </Flex>
            )}
        </Formik>
    )
};