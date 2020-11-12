import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button, Flex, FlexProps } from 'rebass';

interface ListItemProps extends FlexProps {
    onDelete: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({ children, onDelete, ...rest }) => (
    <Flex mb={4} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }} {...rest}>
        <Flex px={4} pt={4} flexGrow={1} flexDirection="column" alignItems="stretch">
            {children}
        </Flex>
        <Flex flexGrow={0} alignItems="flex-start" style={{ position: 'relative' }}>
            <Button
                variant="icon"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
                onClick={onDelete}
            >
                <FaTrash size={20} />
            </Button>
        </Flex>
    </Flex>
);
