import * as React from 'react';
import { chirpsService } from '../../server/utils/types';
import type { IChirp } from '../../server/utils/types';
import ChirpCard from '../components/chirps/ChirpCard';

const Home: React.FC<HomeProps> = props => {
	const [chirps, setChirps] = React.useState<IChirp[]>([]);

	React.useEffect(() => {
		(async () => {
			const chirps = await ('lfetchocalhost:3000/api')
			setChirps(chrips);
		})();
	}, []);

	return (
		<main className="container-fluid" id="child">
			<section className="row my-2">
				{chirps.map(chirp => <ChirpCard key={`chirp-card-${chirp.id}`} chirp={chirp} />)}
			</section>
		</main>
	);
};

interface HomeProps {}

export default Home;