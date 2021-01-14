import React, { useMemo } from 'react';
import {
    Document, Page, View, Text, BlobProvider, StyleSheet
} from '@react-pdf/renderer';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { useGetFlowers } from '../forms/flowers/query/get-flowers';
import { useGetPersonalia } from '../forms/personalia/query/get-personalia';

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

const FlowersPDF = (data: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <View>
                    <Text style={styles.heading}>Bestelling bloemen</Text>
                </View>
                <View>
                    <Text style={styles.subheading}>Personalia</Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Naam overledene:
                        {data?.personalia?.firstname}
                    </Text>
                </View>
                <View>
                    <Text style={styles.subheading}>Gegevens t.b.v. rouwboeket</Text>
                </View>
                {data?.flowers.flowers.map((item: any) => (
                    <>
                        <View style={{ marginBottom: "10px" }}>
                            <View style={styles.padding}>
                                <Text style={styles.text}>
                                    Model / opmaak rouwboekt: {item?.formatting}
                                </Text>
                            </View>
                            <View style={styles.padding}>
                                <Text style={styles.text}>
                                    Tekst op lint 1: {item?.textOnLint1}
                                </Text>
                            </View>
                            <View style={styles.padding}>
                                <Text style={styles.text}>
                                    Tekst op lint 2: {item?.textOnLint2}
                                </Text>
                            </View>
                            <View style={styles.padding}>
                                <Text style={styles.text}>
                                    Kleur lint / kleur letters: {item?.colorOnLint}
                                </Text>
                            </View>
                            <View style={styles.padding}>
                                <Text style={styles.text}>
                                    Bedrag rouwboeket: {item?.costFlower}
                                </Text>
                            </View>
                        </View>
                    </>
                ))}
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Leverdatum: { new Date(data?.flowers?.deliveryDate).toISOString().substring(0, 10) }
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Uiterlijk voor Tijdstip: {data?.flowers?.finalTime}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Aflverlocatie: {data?.flowers?.deliveryLocation}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Postcode: {data?.flowers?.postalCode}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Plaats: {data?.flowers?.location}
                    </Text>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>
                        Totaal bedrag, inclusief: {data?.flowers?.totalCost}
                    </Text>
                </View>
            </View>
        </Page>
    </Document>
);

export const FlowersPDFIntegration = () => {
    const [selectedFuneral] = useSelectedFuneral();
    const flowers = useGetFlowers({ id: selectedFuneral?.id || '' });
    const personalia = useGetPersonalia({ id: selectedFuneral?.id || '' });

    return useMemo(
        () => {
            if (
                personalia.loading
                || flowers.loading
                || personalia.data == null
                || flowers.data == null
            ) {
                return (
                    <>
                        Laad document...
                    </>
                );
            }

            return (
                <>
                    <BlobProvider document={FlowersPDF({ ...personalia?.data, ...flowers?.data })}>
                        {({ url }) => <iframe title="pdf-display" src={url as any} style={{ width: '100%', height: '100%' }} />}
                    </BlobProvider>
                </>
            );
        },
        [personalia.data, flowers.data]
    );
};
