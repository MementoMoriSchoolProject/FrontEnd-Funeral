import React, { useMemo } from 'react';
import {
    Document, Page, View, Text, BlobProvider, StyleSheet
} from '@react-pdf/renderer';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { useGetCircumstances } from '../forms/circumstances/query/get-circumstances';

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

const DeceasedPDF = (data: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                <Text style={styles.heading}>Overlijden</Text>
            </View>
            <View style={styles.twocolumn}>
                <View style={styles.column}>
                    <Text>
                        Datum:
                        {data?.deceased?.date}
                    </Text>
                </View>
                <View style={styles.column}>
                    <Text>
                        Tijdstip:
                        {data?.deceased?.time}
                    </Text>
                </View>
            </View>
        </Page>
    </Document>
);

export const DeceasedPDFIntegration = () => {
    const [selectedFuneral] = useSelectedFuneral();
    const { data, loading: loadingdata } = useGetCircumstances({ id: selectedFuneral?.id || '' });

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
                    <BlobProvider document={DeceasedPDF(data)}>
                        {({ url }) => <iframe title="pdf-display" src={url as any} style={{ width: '100%', height: '100%' }} />}
                    </BlobProvider>
                </>
            );
        },
        [data],
    );
};
