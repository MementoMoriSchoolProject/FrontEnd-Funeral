import React, { useMemo } from 'react';
import {
    Document, Page, View, Text, BlobProvider, StyleSheet
} from '@react-pdf/renderer';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { useGetPersonalia } from '../forms/personalia/query/get-personalia';
import { useGetCircumstances } from '../forms/circumstances/query/get-circumstances';
import { useGetClient } from '../forms/client/query/get-client';
import { useFinalCare } from '../forms/finalcare/query/get-finalcare';
import { useGetVisiting } from '../forms/visiting/query/get-visiting';

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

const BurialPDF = (data: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <View>
                    <Text style={styles.heading}>Opdracht tot opbaring</Text>
                </View>
                <View>
                    <Text style={styles.subheading}>Overledene</Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Overledene:
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
                        Geslacht:
                        {data?.personalia?.gender || 'Man'}
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
                        Postcode/woonplaats:
                        {data?.personalia?.postal}
                        {data?.personalia?.town}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Geboortedatum:
                        { new Date(data?.personalia?.dateOfBirth).toISOString().substring(0, 10) }
                    </Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>
                        Overlijdensdatum:
                        { new Date(data?.circumstances?.date).toISOString().substring(0, 10) }
                    </Text>
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
                        Voorletters:
                        {data?.client?.callname}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Relatie tot overledene:
                        {data?.client?.relation}
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                <View>
                    <Text style={styles.subheading}>Verzorging</Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Datum:
                        { new Date(data?.finalcare?.date).toISOString().substring(0, 10) }
                    </Text>
                </View>
            </View>
            <View style={styles.padding}>
                <Text style={styles.text}>
                    Met of zonder familie:
                    {data?.finalcare?.family}
                </Text>
            </View>
            <View style={styles.section}>
                <View>
                    <Text style={styles.subheading}>Rouwbezoek</Text>
                </View>
            </View>
            {data?.visiting.map((item: any) => (
                <>
                    <View style={styles.padding}>
                        <Text style={styles.text}>
                            Datum:
                            {item?.date}
                        </Text>
                    </View>
                    <View style={styles.twocolumn}>
                        <View style={styles.column}>
                            <Text style={styles.text}>
                                Van:
                                {item?.timeOfArrival}
                            </Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.text}>
                                Eindtijd:
                                {item?.timeOfLeave}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.text}>
                            Soort:
                            {item?.kindOfVisit}
                        </Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.text}>
                            Bijzonderheden:
                            {item?.specialNeeds}
                        </Text>
                    </View>
                </>
            ))}
        </Page>
    </Document>
);

export const BurialPDFIntegration = () => {
    const [selectedFuneral] = useSelectedFuneral();
    const personalia = useGetPersonalia({ id: selectedFuneral?.id || '' });
    const circumstances = useGetCircumstances({ id: selectedFuneral?.id || '' });
    const client = useGetClient({ id: selectedFuneral?.id || '' });
    const finalcare = useFinalCare({ id: selectedFuneral?.id || '' });
    const visiting = useGetVisiting({ id: selectedFuneral?.id || '' });

    return useMemo(
        () => {
            if (
                personalia.loading
                || circumstances.loading
                || client.loading
                || finalcare.loading
                || visiting.loading
                || personalia.data == null
                || circumstances.data == null
                || client.data == null
                || finalcare.data == null
                || visiting.data == null
            ) {
                return (
                    <>
                        Laad document...
                    </>
                );
            }

            return (
                <>
                    <BlobProvider document={BurialPDF({ ...personalia?.data, ...circumstances?.data, ...client?.data, ...finalcare?.data, ...visiting?.data })}>
                        {({ url }) => <iframe title="pdf-display" src={url as any} style={{ width: '100%', height: '100%' }} />}
                    </BlobProvider>
                </>
            );
        },
        [personalia.data, circumstances.data, client.data, finalcare.data, visiting.data],
    );
};
