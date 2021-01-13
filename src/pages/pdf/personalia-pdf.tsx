import React, { useMemo } from 'react';
import {
    Document, Page, View, Text, BlobProvider, StyleSheet
} from '@react-pdf/renderer';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { useGetPersonalia } from '../forms/personalia/query/get-personalia';

const styles = StyleSheet.create({
    page: {
        padding: "15px"
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        fontSize: 24
    },
    twocolumn: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: 375,
        alignItems: "center",
        marginBottom: "5px"
    },
    column: {
        display: "flex",
        flexDirection: "row"
    },
    padding: {
        marginBottom: "5px"
    }
});

const PersonaliaPDF = (data: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                <Text style={styles.heading}>Personalia</Text>
            </View>
            <View style={styles.padding}>
                <Text>
                    Voornaam:
                    {data?.personalia?.firstname}
                </Text>
            </View>
            <View style={styles.twocolumn}>
                <View style={styles.column}>
                    <Text>
                        Achternaam:
                        {data?.personalia?.lastname}
                    </Text>
                </View>
                <View style={styles.column}>
                    <Text>
                        Meisjesnaam:
                        {data?.personalia?.girlname}
                    </Text>
                </View>
            </View>
            <View style={styles.padding}>
                <Text>
                    Roepnaam:
                    {data?.personalia?.callname}
                </Text>
            </View>
            <View style={styles.padding}>
                <Text>
                    Titelactuur:
                    {data?.personalia?.title}
                </Text>
            </View>
            <View style={styles.padding}>
                <Text>
                    Geslacht:
                    {data?.personalia?.gender}
                </Text>
            </View>
            <View style={styles.padding}>
                <Text>
                    Adres:
                    {data?.personalia?.address}
                </Text>
            </View>
            <View style={styles.padding}>
                <Text>
                    Postcode:
                    {data?.personalia?.postal}
                </Text>
            </View>
            <View style={styles.padding}>
                <Text>
                    Plaats:
                    {data?.personalia?.town}
                </Text>
            </View>
            <View style={styles.padding}>
                <Text>
                    BSN:
                    {data?.personalia?.bsn}
                </Text>
            </View>
            <View style={styles.padding}>
                <Text>
                    Geboortedatum:
                    {data?.personalia?.dateOfBirth}
                </Text>
            </View>
            <View style={styles.twocolumn}>
                <View style={styles.column}>
                    <Text>
                        Aantal kinderen:
                        {data?.personalia?.amountOfChildren}
                    </Text>
                </View>
                <View style={styles.column}>
                    <Text>
                        Aantal minderjarig:
                        {data?.personalia?.amountOfMinors}
                    </Text>
                </View>
            </View>
            <View style={styles.padding}>
                <Text>
                    Burgelijke Staat:
                    {data?.personalia?.maritalStatus}
                </Text>
            </View>
            <View style={styles.padding}>
                <Text>
                    Geloofsovertuiging:
                    {data?.personalia?.religion}
                </Text>
            </View>
        </Page>
    </Document>
);

export const PersonaliaPDFIntegration = () => {
    const [selectedFuneral] = useSelectedFuneral();
    const { data, loading: loadingdata } = useGetPersonalia({ id: selectedFuneral?.id || '' });

    return useMemo(
        () => {
            if (loadingdata || !data) {
                return (
                    <>
                        Laad document...
                    </>
                );
            }

            return (
                <>
                    <BlobProvider document={PersonaliaPDF(data)}>
                        {({ url }) => <iframe title="pdf-display" src={url as any} style={{ width: '100%', height: '100%' }} />}
                    </BlobProvider>
                </>
            );
        },
        [data],
    );
};
