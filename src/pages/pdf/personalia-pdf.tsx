import React, { useMemo } from 'react';
import {
    Document, Page, View, Text, BlobProvider, StyleSheet
} from '@react-pdf/renderer';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { useGetPersonalia } from '../forms/personalia/query/get-personalia';
import { useGetCircumstances } from '../forms/circumstances/query/get-circumstances';
import { useGetClient } from '../forms/client/query/get-client';
import { useGetNightguard } from '../forms/nightguard/query/get-nightguard';
import { useFarewell } from '../forms/farewell/query/get-farewell';

const styles = StyleSheet.create({
    page: {
        padding: "15px"
    },
    section: {
        marginBottom: "15px"
    },
    heading: {
        textAlign: "center",
        marginBottom: "10px",
        fontSize: 24
    },
    subheading: {
        fontSize: 18,
        marginBottom: "10px"
    },
    twocolumn: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: 450,
        alignItems: "center",
        marginBottom: "5px"
    },
    column: {
        display: "flex",
        flexDirection: "row"
    },
    padding: {
        marginBottom: "5px"
    },
    text: {
        fontSize: 14
    }
});

const PersonaliaPDF = (data: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <View>
                    <Text style={styles.heading}>Gegevens t.b.v. de uitvaartdienst</Text>
                </View>
                <View>
                    <Text style={styles.subheading}>Personalia</Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Naam:
                        {data?.personalia?.firstname}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Voornamen:
                        {data?.personalia?.firstname}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Roepnaam:
                        {data?.personalia?.callname}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Adres:
                        {data?.personalia?.address}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Postcode:
                        {data?.personalia?.postal}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        WoonPlaats:
                        {data?.personalia?.town}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Geboortedatum:
                        { new Date(data?.personalia?.dateOfBirth).toISOString().substring(0, 10) }
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Geslacht:
                        {data?.personalia?.gender}
                    </Text>
                </View>
                <View style={styles.twocolumn}>
                    <View style={styles.column}>
                        <Text style={styles.text}>
                            Burgelijke staat:
                            {data?.personalia?.maritalStatus}
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>
                            Geloofsovertuiging:
                            {data?.personalia?.religion}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View>
                    <Text style={styles.subheading}>Overlijden</Text>
                </View>
                <View style={styles.twocolumn}>
                    <View style={styles.column}>
                        <Text style={styles.text}>
                            Datum van overlijden:
                            { new Date(data?.circumstances?.date).toISOString().substring(0, 10) }
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>
                            Tijdstip van overlijden:
                            {data?.circumstances?.time}
                        </Text>
                    </View>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Adres:
                        {data?.circumstances?.address}
                    </Text>
                </View>
                <View style={styles.twocolumn}>
                    <View style={styles.column}>
                        <Text style={styles.text}>
                            Postcode:
                            {data?.circumstances?.postal}
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>
                            Plaats:
                            {data?.circumstances?.town}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View>
                    <Text style={styles.subheading}>Opdrachtgever</Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Achternaam:
                        {data?.client?.lastname}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Adres:
                        {data?.client?.address}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Postcode:
                        {data?.client?.postal}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Plaats:
                        {data?.client?.town}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Geboortedatum:
                        { new Date(data?.client?.dateOfBirth).toISOString().substring(0, 10) }
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Telefoonnummer:
                        {data?.client?.phoneNumber}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Relatie tot de overledene:
                        {data?.client?.relation}
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                <View>
                    <Text style={styles.subheading}>Uitvaartdienst</Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Locatie:
                        {data?.farewell?.location}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Adres:
                        {data?.farewell?.address}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Postcode:
                        {data?.farewell?.postalCode}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Plaats:
                        {data?.farewell?.place}
                    </Text>
                </View>
                <View style={styles.twocolumn}>
                    <View style={styles.column}>
                        <Text style={styles.text}>
                            Datum:
                            {data?.farewell?.date}
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>
                            Aanvangstijd:
                            {data?.farewell?.startTime}
                        </Text>
                    </View>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Voorganger:
                        {data?.nightguard?.predecessor}
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                <View>
                    <Text style={styles.subheading}>Avondwake</Text>
                </View>
                <View style={styles.twocolumn}>
                    <View style={styles.column}>
                        <Text style={styles.text}>
                            Datum:
                            {data?.nightguard?.date}
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>
                            Tijd:
                            {data?.nightguard?.time}
                        </Text>
                    </View>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Locatie avondwake:
                        {data?.nightguard?.location}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Bijzonderheden:
                        {data?.nightguard?.specialNeeds}
                    </Text>
                </View>
            </View>
        </Page>
    </Document>
);

export const PersonaliaPDFIntegration = () => {
    const [selectedFuneral] = useSelectedFuneral();
    const personalia = useGetPersonalia({ id: selectedFuneral?.id || '' });
    const circumstances = useGetCircumstances({ id: selectedFuneral?.id || '' });
    const client = useGetClient({ id: selectedFuneral?.id || '' });
    const farewell = useFarewell({ id: selectedFuneral?.id || '' });
    const nightguard = useGetNightguard({ id: selectedFuneral?.id || '' });

    return useMemo(
        () => {
            if (
                personalia.loading
                || circumstances.loading
                || client.loading
                || farewell.loading
                || nightguard.loading
                || personalia.data == null
                || circumstances.data == null
                || client.data == null
                || farewell.data == null
                || nightguard.data == null
            ) {
                return (
                    <>
                        Laad document...
                    </>
                );
            }

            return (
                <>
                    <BlobProvider document={PersonaliaPDF({ ...personalia?.data, ...circumstances?.data, ...client.data, ...farewell.data, ...nightguard.data })}>
                        {({ url }) => <iframe title="pdf-display" src={url as any} style={{ width: '100%', height: '100%' }} />}
                    </BlobProvider>
                </>
            );
        },
        [personalia.data, circumstances.data, client.data, farewell.data, nightguard.data],
    );
};
