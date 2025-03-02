import express from 'express';
import { checkResult, getQuestion, loadQuestion } from './handler.js';
import { sendErrorHttpResponse } from '../../utils/errorHelper.js';
import { authMiddleware } from '../middleware.js';

const router = express.Router();

router.post('/load-questions', authMiddleware, async(request, response) => {
    try {
        const result = await loadQuestion();
        response.status(200).json(result);
    } catch (error) {
        sendErrorHttpResponse(response, error);
    }
});

router.get('/question', async(request, response) => {
    try {
        const result = await getQuestion();
        response.status(200).json(result);
    } catch (error) {
        sendErrorHttpResponse(response, error);
    }
});

router.get('/result/:questionId', async(request, response) => {
    try {
        const result = await checkResult(request?.params?.questionId, request?.userId, request?.query?.answer);
        response.status(200).json(result);
    } catch (error) {
        sendErrorHttpResponse(response, error);
    }
});


export default router;