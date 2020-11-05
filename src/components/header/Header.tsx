import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Flex } from "rebass";

export const Header = () => {
    const myStyle = {
      backgroundColor: "#C4C4C4",
      padding: "10px",
    };
    return (
      <Flex alignItems="center" px={3} py={3} bg="muted">
            <div style={myStyle}>
                <GiHamburgerMenu />
            </div>
      </Flex>
    );
}
