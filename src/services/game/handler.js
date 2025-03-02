import { Questions } from "../../models/gameQuestion.js";
import { GAMEDATA } from "../../utils/data.js";
import { generateBadRequestResponse, generateInternalServerErrorRepsonse } from "../../utils/errorHelper.js";
import { mongoose } from "../../config/database.js";
import { faker } from '@faker-js/faker';
import { User } from "../../models/user.js";

export async function loadQuestion() {
    try {
        const data = GAMEDATA;
        await Questions.deleteMany({});
        await Questions.insertMany(data);
        return Promise.resolve("Questions loaded... ")
    } catch (error) {
        return Promise.reject(
            await generateInternalServerErrorRepsonse(error, 'loadQuestion')
        );
    }
}

export async function getQuestion() {
    try {
        const question = await Questions.aggregate([{ $sample: { size: 1 } }, { $project: { country: 0 } }]);
        const randomCities = Array.from({ length: 5 }, () => faker.location.city());
        question[0].options = randomCities;
        question[0].options.push(question[0].city);
        delete question[0].city
        return Promise.resolve(question)
    } catch (error) {
        return Promise.reject(
            await generateInternalServerErrorRepsonse(error, 'getQuestion')
        );
    }
}

export async function checkResult(questionId, userId, answer) {
    try {
       const result = await Questions.findById(new mongoose.Types.ObjectId(questionId));
       if (!result) {
           return Promise.reject(generateBadRequestResponse(new Error(),'Question not found'));
        }
        if (result.city === answer) {
            // await User.findByIdAndUpdate(userId, { $inc: { correctScrore: 1 } });
            return Promise.resolve({ correct: true, fun_fact: result.fun_fact, result: result.city });
        }
        // await User.findByIdAndUpdate(userId, { $inc: { incorrectScrore: 1 } });
        return Promise.resolve({ correct: false, fun_fact: result.fun_fact, result: result.city });
    } catch (error) {
        if (error?.name === 'CastError') {
            return Promise.reject(generateBadRequestResponse(new Error(),'Invalid question ID'));
        }
        return Promise.reject(
            await generateInternalServerErrorRepsonse(error, 'getResult')
        );
    }
}