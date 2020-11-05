import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Flex } from 'rebass';
import { ProgressButton } from '../../atoms/progress-button';
import { Header } from '../../components/header/Header';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { useCreateFuneral } from './mutation/create-funeral';
import { useFunerals } from './query/get-funerals';

/**
 * Overview of all the funerals belonging to this user
 */
export const FuneralOverviewPage: React.FC<{}> = () => {
	const [selectedFuneral, setSelectedFuneral] = useSelectedFuneral();
	const history = useHistory();
	const { loading, data } = useFunerals();
	const [createFuneral, createProgress] = useCreateFuneral({ refetchQueries: ['funerals'], awaitRefetchQueries: true });
	useEffect(() => {
		if (selectedFuneral)
			setSelectedFuneral(undefined);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
    return (
        <>
            <Header />
			<Box
				as='form'
				onSubmit={e => e.preventDefault()}
				p={4}
				mx='auto'
				width={[1, 1, 1 / 3]}
				bg='#C4C4C4'
            >
				<Box maxHeight='400px' overflowY='scroll'>
					{loading ? (
						<Flex justifyContent='center'>
							Loading...
						</Flex>
					) : data && data.funerals.map((funeral, index) => (
							<Flex key={funeral.id}>
								<Box
									onClick={async () => {
										setSelectedFuneral(funeral.id);
										await history.push(`/overview`);
									}}
									width={1}
									p={3}
									mb={index + 1 === data.funerals.length ? '0px' : 4}
									bg='#A6A6A6'>
									Funeral {funeral.id}
								</Box>
							</Flex>
						))
					}
				</Box>
				<Flex
					px={2}
					pt={3}
					justifyContent='center'
				>
					<ProgressButton
						loading={createProgress.loading}
						bg='#A6A6A6'
						color='black'
						onClick={async () => createFuneral().then(async (result) => {
							// a new funeral has been created!
							const id = result.data?.createFuneral.id;
							setSelectedFuneral(id);
							await history.push(`/overview`);
						})}
					>
						Create new funeral
					</ProgressButton>
				</Flex>
			</Box>
        </>
    );
};