import React, { useMemo } from 'react';
import {
    Document, Page, View, Text, BlobProvider, StyleSheet
} from '@react-pdf/renderer';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { useGetInsurances } from '../forms/insurance/query/get-insurances';

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

const InsurancePDF = (data: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                <Text style={styles.heading}>Verzekering</Text>
            </View>
            {data?.insurances.map((item: any) => (
                <>
                    <View style={{ marginBottom: "10px" }}>
                        <View style={styles.padding}>
                            <Text>
                                Maatschappij: {item?.company}
                            </Text>
                        </View>
                        <View style={styles.padding}>
                            <Text>
                                Polisnummer: {item?.policynumber}
                            </Text>
                        </View>
                    </View>
                </>
            ))}
        </Page>
    </Document>
);

export const InsurancePDFIntegration = () => {
    const [selectedFuneral] = useSelectedFuneral();
    const { data, loading: loadingdata } = useGetInsurances({ id: selectedFuneral?.id || '' });

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
                    <BlobProvider document={InsurancePDF(data)}>
                        {({ url }) => <iframe title="pdf-display" src={url as any} style={{ width: '100%', height: '100%' }} />}
                    </BlobProvider>
                </>
            );
        },
        [data],
    );
};
