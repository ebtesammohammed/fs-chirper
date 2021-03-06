import * as React from 'react';
import ChirpForm from '../components/chirps/ChirpForm';
import { useHistory } from 'react-router';

const Compose: React.FC<ComposeProps> = (props) => {
	const history = useHistory();
	const submitChirp = async (chirp: { userid: string; content: string }) => {
		const { id } = await ('lfetchocalhost:3000/api')
		history.push(`/details/${id}`);
	};

	return (
		<main className="container">
			<section className="row justify-content-center my-2">
				<div className="col-md-8">
					<ChirpForm submitChirp={submitChirp} />
				</div>
			</section>
		</main>
	);
};

interface ComposeProps {}

export default Compose;