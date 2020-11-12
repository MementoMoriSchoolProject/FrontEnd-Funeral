import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { LabelSelectField } from '../../../components/LabelSelectField';
import LabelTextAreaField from '../../../components/LabelTextAreaField';
import { LabelTextField } from '../../../components/LabelTextField';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveFinalCare } from './mutation/save-finalcare';
import { useFinalCare } from './query/get-finalcare';

const wrapId = (htmlId: string) => `finalcare.${htmlId}`;

export const FinalCare: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveFinalCare] = useSaveFinalCare();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveFinalCare({
                variables: {
                    id: selectedFuneral.id,
                    finalcare: _.omit(values.finalcare, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useFinalCare({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) setValues({ client: initialValues?.finalcare, ...values });
    }, [initialValues]);

    return (
        <>
            <Flex>
                <LabelTextField id={wrapId("date")} label="Datum" placeholder="13-12-1901" type="date" />
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("location")} label="Locatie verzorging">
                    <option value="thuis">Thuis</option>
                    <option value="uitvaartcentrum">Uitvaartcentrum</option>
                    <option value="afscheidshuis">Afscheidshuis</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("family")} label="Met of zonder familie">
                    <option value="metfamilie">Met familie</option>
                    <option value="zonderfamilie">Geen familie</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("deletePacemaker")} label="Pacemaker verwijderen">
                    <option value="ja">Ja</option>
                    <option value="nee">Nee</option>
                    <option value="nvt">Niet van toepassing</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("makeFingerprint")} label="Vingerafdruk maken">
                    <option value="ja">Ja</option>
                    <option value="nee">Nee</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("clothes")} label="Kleding">
                    <option value="retour">Retour familie</option>
                    <option value="weg">Mogen weg</option>
                    <option value="reedsverzorgd">Reeds verzorgd</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("wishesJewelryGlasses")} label="Wensen m.b.t. sieraden/bril">
                    <option value="retourdaguitvaart">Retour op de dag van de uitvaart</option>
                    <option value="retourfamilie">Retour aan familie</option>
                    <option value="blijven">Blijven bij overledene</option>
                    <option value="geensieraden">Geen sieraden aanwezig</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextAreaField id={wrapId("detailsOfCare")} label="Bijzonderheden" />
            </Flex>
            <Flex>
                <LabelTextAreaField id={wrapId("makeUpHairstyleWishes")} label="Wensen make-up/kapsel" />
            </Flex>
        </>
    );
};
