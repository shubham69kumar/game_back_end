import express from 'express';
import { createUser, getUser } from './handler.js';
import { sendErrorHttpResponse } from '../../utils/errorHelper.js';

const router = express.Router();

router.post('/create', async(request, response) => {
	try {
		const result = await createUser(request.body);
		response.status(200).json(result);
	} catch (error) {
		sendErrorHttpResponse(response, error);
	}
});

router.post('/login', async(request, response) => {
	try {
		const result = await getUser(request.body);
		response.status(200).json(result);
	} catch (error) {
		sendErrorHttpResponse(response, error);
	}
});

export default router;