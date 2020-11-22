import { gql, useQuery } from "@apollo/client";
//import { getAppointments, getAppointmentsVariables } from "./__generated__/getAppointments";

const GET_APPOINTMENTS = gql`
query getAppointments($id: String!) {
    appointments(id: $id) {
        dateFinalCare
        timeFinalCare
        dateConferenceContent
        timeConferenceContent
        dateDeliveryCart
        timeDeliveryCart
        dateDeliveryMusic
        timeDeliveryMusic
        dateDeliveryPresentation
        timeDeliveryPresentation
        extra {
            description
            date
            time
        }
    }
}
`;

export const useGetAppointments = () => useQuery(GET_APPOINTMENTS, {  });
