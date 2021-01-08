import { gql, useQuery } from "@apollo/client";
import { getDrivingInfoFollowingCar, getDrivingInfoFollowingCarVariables } from "./__generated__/getDrivingInfoFollowingCar";

const GET_DRIVINGINFOFOLLOWINGCAR = gql`
query getDrivingInfoFollowingCar($id: String!) {
    drivinginfofollowingcar(id: $id) {
      from
      departuretime
      address
      postalcode
      hometown
      to
      arrivaltime
      specialroute
      details
    }
}
`;

export const useGetDrivingInfoFollowingCar = (variables: getDrivingInfoFollowingCarVariables) => useQuery<getDrivingInfoFollowingCar>(GET_DRIVINGINFOFOLLOWINGCAR, { variables });
