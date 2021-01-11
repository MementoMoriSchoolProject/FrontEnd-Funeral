import { gql, useMutation } from "@apollo/client";
import { saveAppointments, saveAppointmentsVariables } from "./__generated__/saveAppointments";

const SAVE_APPOINTMENTS = gql`
mutation saveAppointments($id: String!, $appointments: PersistAppointmentInput!) {
    saveAppointments(
        funeralId: $id,
        appointments: $appointments
    ){
        dateConferenceContent
    }
}
`;

export const useSaveAppointments = () => useMutation<saveAppointments, saveAppointmentsVariables>(SAVE_APPOINTMENTS);