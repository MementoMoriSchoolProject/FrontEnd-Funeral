import { gql, useQuery } from "@apollo/client";
import { getCeremony, getCeremonyVariables } from "./__generated__/getCeremony";

const GET_CEREMONY = gql`
query getCeremony($id: String!) {
    ceremony(id: $id) {
        date
        time
        familyPresentAtLayoutAddress
        timeDepartureLayoutAddress
        duration
        extraTime
        aulaStart
        aulaType
        amountOfInterestedGuests
        isInClosedCircle
        condolanceBook
        attributesAtKatafalk
        inviteSpeakers
        funeralAssistantAmount
        carrierAmount
        acceptFamily
        familyFirst
        placesForFamilyAmount
        openingSpeech
        candlesLitBy
        speakers
        momentOfSilence
        closingSpeech
        flowerCardWishes
        flowerRibbonWishes
        flowerWishes
        wishes
    }
}
`;

export const useGetCeremony = (variables: getCeremonyVariables) => useQuery<getCeremony>(GET_CEREMONY, { variables });
