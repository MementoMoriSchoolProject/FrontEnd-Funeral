import { gql, useQuery } from "@apollo/client";
import { getAudioVideo, getAudioVideoVariables } from "./__generated__/getAudioVideo";

const GET_AV = gql`
query getAudioVideo($id: String!) {
  audioVideo (id: $id) {
    musicDeliveredBy
    presentationDeliveredBy
    usePiano
    hasDVD
    hasCD
    songs {
      title
      artist
    }
  }
}
`;

export const useGetAudioVideo = (variables: getAudioVideoVariables) => useQuery<getAudioVideo>(GET_AV, { variables });
