import { CgSpinner } from "react-icons/cg";
import styled, { keyframes } from "styled-components";

const rotate = () => keyframes`
from {
    transform: rotate(0deg);
}

to {
    transform: rotate(360deg);
}
`;

export const Spinner = styled(CgSpinner)`
    animation: ${(props: any) => rotate()} 1s linear infinite;
`;