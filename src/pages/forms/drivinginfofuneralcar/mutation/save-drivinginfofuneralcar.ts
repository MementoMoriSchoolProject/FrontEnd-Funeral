import { gql, useMutation } from "@apollo/client";
import { saveDrivingInfoFuneralCar, saveDrivingInfoFuneralCarVariables } from "./__generated__/saveDrivingInfoFuneralCar";

const SAVE_DRIVINGINFOFUNERALCAR = gql`
mutation saveDrivingInfoFuneralCar($id: String!, $drivinginfofuneralcar: [PersistDrivingInfoFuneralCarInput!]!) {
    saveDrivingInfoFuneralCar(
        funeralId: $id,
        drivinginfofuneralcar: $drivinginfofuneralcar
    )
}
`;

export const useSaveDrivingInfoFuneralCar = () => useMutation<saveDrivingInfoFuneralCar, saveDrivingInfoFuneralCarVariables>(SAVE_DRIVINGINFOFUNERALCAR);
