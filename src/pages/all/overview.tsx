import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Flex } from 'rebass';
import { Heading } from '../../atoms/heading';
import { ProgressButton } from '../../atoms/progress-button';
import { Spinner } from '../../atoms/spinner';
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
				mx='auto'
				pt={3}
				width={[1, 1, 1 / 3]}
				variant='box'
            >
				<Heading pl={3} level={1}>Funerals</Heading>
				<Box variant='scrollList' maxHeight='400px'>
					{loading ? (
						<Flex justifyContent='center'>
							<Spinner />
						</Flex>
					) : data && data.funerals.map(funeral => (
							<Flex key={funeral.id}>
								<Box
									variant='listItem'
									onClick={async () => {
										setSelectedFuneral(funeral.id);
										await history.push(`/overview`);
									}}
									width={1}
									p={3}
									py={3}
								>
									<Heading level={3} fontWeight='normal'>
										Funeral {funeral.id}
									</Heading>
								</Box>
							</Flex>
						))
					}
				</Box>
				<Flex
					px={2}
					py={3}
					justifyContent='center'
				>
					<ProgressButton
						loading={createProgress.loading}
						variant='primary'
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
