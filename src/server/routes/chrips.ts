import * as express from 'express';
import db from '../db';
// import logger from '../utils/logger';

const router = express.Router();

// GET /api/chirps/1 or GET /api/chirps
router.get('/:id?', async (req, res, next) => {
	const id = Number(req.params.id);
	if (id) {
		try {
		//	logger.silly(`getting chirp ${id}`);
			const [chrip] = await db.chrips.one(id);
			res.json(chrip);
		} catch (error) {
		//	logger.warn('get one chirp failed');
			next(error);
		}
	} else {
		try {
			//logger.silly('getting all chirps');
			const chirps = await db.chrips.all();
			res.json(chirps);
		} catch (error) {
			//logger.warn('get all chirps failed');
			next(error);
		}
	}
});

// POST /api/chirps/
router.post('/', async (req, res, next) => {
	const chirp = req.body;
	try {
	//	logger.silly('adding a chirp');
		const result = await db.chrips.insert(chirp.userid, chirp.content);
		// sends { id: 1 } if it inserted chirp id 1
		res.json({ id: result.insertId });
	} catch (error) {
	//	logger.warn('post a chirp failed');
		next(error);
	}
});

// PUT /api/chirps/1
router.put('/:id', async (req, res, next) => {
	const id = Number(req.params.id);
	const chirp = req.body;
	try {
	//	logger.silly(`editing chirp id ${id}`);
		await db.chrips.update(id, chirp.content);
		res.json({ msg: 'edited', id });
	} catch (error) {
	//	logger.warn('edit a chirp failed');
		next(error);
	}
});

// DELETE /api/chirps/1
router.delete('/:id', async (req, res, next) => {
	const id = Number(req.params.id);
	try {
	//	logger.silly(`deleting chirp id ${id}`);
		await db.chrips.destroy(id);
		res.json({ msg: 'destroyed' });
	} catch (error) {
	//	logger.warn('delete a chirp failed');
		next(error);
	}
});

export default router;