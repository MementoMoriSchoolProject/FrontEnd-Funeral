import { gql, useMutation } from "@apollo/client";
import { saveDrivingInfoFollowingCar, saveDrivingInfoFollowingCarVariables } from "./__generated__/saveDrivingInfoFollowingCar";

const SAVE_DRIVINGINFOFOLLOWINGCAR = gql`
mutation saveDrivingInfoFollowingCar($id: String!, $drivinginfofollowingcar: [PersistDrivingInfoFollowingCarInput!]!) {
    saveDrivingInfoFollowingCar(
        funeralId: $id,
        drivinginfofollowingcar: $drivinginfofollowingcar
    )
}
`;

export const useSaveDrivingInfoFollowingCar = () => useMutation<saveDrivingInfoFollowingCar, saveDrivingInfoFollowingCarVariables>(SAVE_DRIVINGINFOFOLLOWINGCAR);
