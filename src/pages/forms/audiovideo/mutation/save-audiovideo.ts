import { gql, useMutation } from "@apollo/client";
import { saveAudioVideo, saveAudioVideoVariables } from "./__generated__/saveAudioVideo";

const SAVE_AV = gql`
mutation saveAudioVideo($id: String!, $audioVideo: AudioVideoInput!) {
    saveAudioVideo(
        funeralId: $id,
        audioVideo: $audioVideo
    ) {
        hasDVD
    }
}
`;

export const useSaveAudioVideo = () => useMutation<saveAudioVideo, saveAudioVideoVariables>(SAVE_AV);
