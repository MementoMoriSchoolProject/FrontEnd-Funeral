import { gql, useQuery } from "@apollo/client";
import { getDrivingInfoFuneralCar, getDrivingInfoFuneralCarVariables } from "./__generated__/getDrivingInfoFuneralCar";

const GET_DRIVINGINFOFUNERALCAR = gql`
query getDrivingInfoFuneralCar($id: String!) {
    drivinginfofuneralcar(id: $id) {
      from  
      departuretime
      to
      arrivaltime
      specialroute
      details
    }
}
`;

export const useGetDrivingInfoFuneralCar = (variables: getDrivingInfoFuneralCarVariables) => useQuery<getDrivingInfoFuneralCar>(GET_DRIVINGINFOFUNERALCAR, { variables });
