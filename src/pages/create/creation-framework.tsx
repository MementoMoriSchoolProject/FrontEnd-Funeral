import { Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { Flex } from 'rebass';
import { ProgressArrow } from '../../atoms/progress-arrow';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { Client } from '../forms/client/client';
import { Circumstances } from '../forms/circumstances';
import { Insurance } from '../forms/insurance/insurance';
import { Personalia } from '../forms/personalia/personalia';
import { PageTemplate } from './page-template';
import { Transmission } from '../forms/transmission/transmission';
import { FinalCare } from '../forms/finalcare/finalcare';
import { Visiting } from '../forms/visiting/visiting';
import { funeral_funeral } from '../../utils/__generated__/funeral';
import { Farewell } from '../forms/farewell/farewell';
import { FuneralLetter } from '../forms/funeralletter/funeralletter';
import { CommemorativeCard } from '../forms/commemorativecard/commemorativecard';
import { Ceremony } from '../forms/ceremony';
import { Nightguard } from '../forms/nightguard/nightguard';
import { BuryCremation } from '../forms/buryCremation/buryCremation';
import { Transport } from '../forms/transport/transport';
import { DrivingInfoFuneralCar } from '../forms/drivinginfofuneralcar/drivinginfofuneralcar';
import { DrivingInfoFollowingCar } from '../forms/drivinginfofollowingcar/drivinginfofollowingcar';
import { Cascet } from '../forms/cascet/cascet';
import { Advertisement } from '../forms/advertisement/advertisement';
import { layOut } from '../forms/layOut/layOut';
import { useSaveLastPage } from './save-last-page';
import { AudioVideo } from '../forms/audiovideo/audiovideo';
import { Flowers } from '../forms/flowers/flowers';

export interface FormProps extends FormikProps<any> {
    shouldSubmit: boolean;
}

export interface FormArrayProps extends FormProps {
    arrayHelpers: any,
    selectedFuneral: funeral_funeral | null
}

interface FormPage {
    title: string;
    parts: React.FC<FormProps>[];
}

// this list is basically the entire creation flow
const pages: (React.FC<FormProps> | FormPage)[] = [
    {
        title: 'Gegevens Overledene',
        parts: [
            Personalia,
            Insurance,
            Circumstances,
        ]
    },
    {
        title: 'Gegevens Opdrachtgever',
        parts: [
            Client
        ]
    },
    {
        title: 'Overbrenging',
        parts: [
            Transmission
        ]
    },
    {
        title: 'Laatste verzorging',
        parts: [
            FinalCare
        ]
    },
    {
        title: 'Opbaren',
        parts: [
            layOut
        ]
    },
    {
        title: 'Bezoek',
        parts: [
            Visiting,
            Nightguard
        ]
    },
    {
        title: 'Kerkdienst/Afscheidsdienst',
        parts: [
            Farewell
        ]
    },
    {
        title: 'Begraven/Crematie',
        parts: [
            BuryCremation
        ]
    },
    {
        title: 'Gegevens Plechtigheid',
        parts: [
            Ceremony
        ]
    },
    {
        title: 'Kist',
        parts: [
            Cascet
        ]
    },
    {
        title: 'Bloemen',
        parts: [
            Flowers
        ]
    },
    {
        title: 'Kaarten',
        parts: [
            FuneralLetter,
            CommemorativeCard
        ]
    },
    {
        title: 'Vervoer',
        parts: [
            Transport,
            DrivingInfoFuneralCar,
            DrivingInfoFollowingCar
        ]
    },
    {
        title: 'Advertentie',
        parts: [
            Advertisement
        ]
    },
    {
        title: 'Audio & Video',
        parts: [
            AudioVideo
        ]
    }
];

const isReactComponent = (page: React.FC<FormProps> | FormPage): page is React.FC<FormProps> => page !== undefined && 'children' in page;

export const CreatingFuneral: React.FC<{}> = () => {
    // eslint-disable-next-line no-unused-vars
    const [funeral, _, refetchFuneral] = useSelectedFuneral();
    const [nextPage, setNextPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(funeral?.lastCreationStep || 0);
    const [saveLastPage] = useSaveLastPage();
    const Page: (React.FC<FormProps> | FormPage) = pages[currentPage];
    useEffect(() => {
        const destinationPage = currentPage + nextPage;
        if (destinationPage >= pages.length) {
            saveLastPage({ variables: { id: funeral?.id || "-1", page: null } }).then(() => refetchFuneral());
        } else if (destinationPage >= 0) {
            setCurrentPage(destinationPage);
            setNextPage(0);
            saveLastPage({ variables: { id: funeral?.id || "-1", page: destinationPage } });
        }
    }, [nextPage]);
    if (currentPage >= pages.length) return (<></>);
    return (
        <Formik
            onSubmit={() => { }}
            initialValues={{}}
            enableReinitialize
        >
            {({ ...formik }) => (
                <Flex justifyContent="center" alignItems="center" width="100%" height="100vh" bg="background">
                    <Flex flexGrow={0} m={4}>
                        <ProgressArrow direction="previous" onClick={() => setNextPage(-1)} disabled={currentPage <= 0} />
                    </Flex>
                    <Flex flexGrow={1} justifyContent="center" height="100vh">
                        <Flex variant="card" justifyContent="stretch" my={5} p={4}>
                            {isReactComponent(Page) ? (
                                <Page shouldSubmit={nextPage !== 0} {...formik} />
                            ) : (
                                <PageTemplate title={Page.title}>
                                    {Page.parts.map(Part => <Part shouldSubmit={nextPage !== 0} {...formik} />)}
                                </PageTemplate>
                            )}
                        </Flex>
                    </Flex>
                    <Flex flexGrow={0} m={4}>
                        <ProgressArrow direction="next" onClick={() => setNextPage(1)} />
                    </Flex>
                </Flex>
            )}
        </Formik>
    );
};
