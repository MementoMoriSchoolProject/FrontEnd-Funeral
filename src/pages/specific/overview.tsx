import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaBackward, FaBookReader, FaCalculator, FaCar, FaMoneyBill, FaPlaceOfWorship, FaUser, FaUserFriends } from 'react-icons/fa';
import { GiFlowers, GiTombstone } from 'react-icons/gi';
import { Flex } from 'rebass';
import { Heading } from '../../atoms/heading';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { FormProps } from '../create/creation-framework';
import { Advertisement } from '../forms/advertisement/advertisement';
import { Appointment } from '../forms/appointment';
import { AudioVideo } from '../forms/audiovideo/audiovideo';
import { BuryCremation } from '../forms/buryCremation/buryCremation';
import { Cascet } from '../forms/cascet/cascet';
import { Ceremony } from '../forms/ceremony';
import { Circumstances } from '../forms/circumstances';
import { Client } from '../forms/client/client';
import { CoffeeRoom } from '../forms/coffeeroom/coffeeroom';
import { CommemorativeCard } from '../forms/commemorativecard/commemorativecard';
import { DrivingInfoFollowingCar } from '../forms/drivinginfofollowingcar/drivinginfofollowingcar';
import { DrivingInfoFuneralCar } from '../forms/drivinginfofuneralcar/drivinginfofuneralcar';
import { Farewell } from '../forms/farewell/farewell';
import { FinalCare } from '../forms/finalcare/finalcare';
import { Flowers } from '../forms/flowers/flowers';
import { FuneralLetter } from '../forms/funeralletter/funeralletter';
import { Insurance } from '../forms/insurance/insurance';
import { layOut } from '../forms/layOut/layOut';
import { Nightguard } from '../forms/nightguard/nightguard';
import { Personalia } from '../forms/personalia/personalia';
import { Transmission } from '../forms/transmission/transmission';
import { Transport } from '../forms/transport/transport';
import { Visiting } from '../forms/visiting/visiting';
import { FlowersPDFIntegration } from '../pdf/flowers-pdf';
import { BurialPDFIntegration } from '../pdf/burial-pdf';
import { PersonaliaPDFIntegration } from '../pdf/personalia-pdf';

const menuGroups: {
    title: string,
    icon: any | null,
    forms: React.FC<FormProps>[],
    pdfs?: React.FC<any>[]
}[] = [
    {
        title: 'Terug',
        icon: FaBackward,
        forms: []
    },
    {
        title: 'Overledene',
        icon: FaUser,
        forms: [Personalia, Circumstances],
        pdfs: [PersonaliaPDFIntegration]
    },
    {
        title: 'Kosten',
        icon: FaMoneyBill,
        forms: [Insurance]
    },
    {
        title: 'Nabestaande',
        icon: FaUserFriends,
        forms: [Client, FuneralLetter, CommemorativeCard, Advertisement, Appointment]
    },
    {
        title: 'Vervoer',
        icon: FaCar,
        forms: [Transport, Transmission, DrivingInfoFollowingCar, DrivingInfoFuneralCar]
    },
    {
        title: 'Opmaak',
        icon: GiFlowers,
        forms: [layOut, Cascet, Flowers],
        pdfs: [FlowersPDFIntegration]
    },
    {
        title: 'Bezoek',
        icon: FaUserFriends,
        forms: [Visiting, Nightguard, FinalCare]
    },
    {
        title: 'Locaties',
        icon: FaPlaceOfWorship,
        // eslint-disable-next-line array-bracket-spacing
        forms: [Farewell, CoffeeRoom]
    },
    {
        title: 'Ceremonie',
        icon: GiTombstone,
        forms: [BuryCremation],
        pdfs: [BurialPDFIntegration]
    },
    {
        title: 'Plechtigheid',
        icon: FaBookReader,
        forms: [Ceremony, AudioVideo]
    },
    // {
    //     title: 'Checklist',
    //     icon: null,
    //     forms: []
    // },
];

export const FuneralSpecificOverview: React.FC<{}> = () => {
    // eslint-disable-next-line no-unused-vars
    const [selectedFuneral, setSelectedFuneral] = useSelectedFuneral();
    // eslint-disable-next-line no-unused-vars
    const [selectedPage, setSelectedPage] = useState(1);
    const [nextPage, goToPage] = useState(-1);
    useEffect(() => {
        if (nextPage === 0) {
            setSelectedFuneral(undefined);
        } else if (nextPage > 0) {
            setSelectedPage(nextPage);
            goToPage(-1);
        }
    }, [nextPage]);

    return (
        <Formik
            onSubmit={() => { }}
            initialValues={{}}
            enableReinitialize
        >
            {({ ...formik }) => (
                <Flex flexDirection="column" height="100vh">
                    <Flex flexDirection="row-reverse" height="100%">
                        <Flex variant="card" justifyContent="space-between" flexDirection="row" flex="100% 1 1" p={4} px={5}>
                            <Flex flexDirection="column" px={2} width={[1, 1, 1, 2 / 3, 5 / 12]} variant="scrollList">
                                {menuGroups[selectedPage].forms.map((Form) => (
                                    <>
                                        {/* <Heading level={2}></Heading> */}
                                        <Form shouldSubmit={nextPage >= 0} {...formik} />
                                    </>
                                ))}
                            </Flex>
                            <Flex flexDirection="column" px={2} alignItems="center" justifyContent="center" width={[1, 1, 1, 2 / 3, 5 / 12]} variant="scrollList">
                                <Heading>This is where E-Mail will show</Heading>
                            </Flex>
                            <Flex flexDirection="column" px={2} alignItems="center" justifyContent="center" width={[1, 1, 1, 2 / 3, 5 / 12]} variant="scrollList">
                                {menuGroups[selectedPage].pdfs?.map((PDF) => (
                                    <>
                                        <Heading level={2} mb={3}>PDF</Heading>
                                        <PDF />
                                    </>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex alignItems="center" flexGrow={0} pt={1} overflowY="auto" overflowX="hidden" flexDirection="column">
                            {menuGroups.map((menuGroup, index) => {
                                const Test = menuGroup.icon || FaCalculator;
                                return (
                                    <Flex
                                        bg={selectedPage === index ? "primary" : "transparent"}
                                        width="100%"
                                        my={1}
                                        py={2}
                                        px={3}
                                        flexDirection="column"
                                        alignItems="center"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => goToPage(index)}
                                    >
                                        <Test size="48" />
                                        <Heading level={3}>{menuGroup.title}</Heading>
                                    </Flex>
                                );
                            })}
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Formik>
    );
};
