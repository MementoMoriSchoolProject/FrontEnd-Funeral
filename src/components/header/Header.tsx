import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Flex } from "rebass";

export const Header: React.FC<{}> = () => {
	return (
		<Flex alignItems="center" px={3} py={3} bg="muted">
			<GiHamburgerMenu />
		</Flex>
	);
}
