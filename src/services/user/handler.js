import { User } from "../../models/user.js";
import { generateBadRequestResponse, generateInternalServerErrorRepsonse } from "../../utils/errorHelper.js";
import { v4 as uuidv4 } from 'uuid';


export async function createUser(userDetails) {
	try {
        const user = await User.findOne({ userName: userDetails.userName });
        if (!user){
            const res = await User.create({userName: userDetails.userName})
            return Promise.resolve(res)
        }
        return Promise.reject(
            generateBadRequestResponse(new Error(), 'Name unavailable')
        );
	} catch (error) {
		return Promise.reject(
			await generateInternalServerErrorRepsonse(error, 'createUser')
		);
	}
}

export async function getUser(userDetails) {
	try {
        const user = await User.findOne({ userName: userDetails.userName });
        if (!user){
            return Promise.reject(
                generateBadRequestResponse(new Error(), 'User not found')
            );
        }
        user.sessionId = uuidv4();
        await user.save();
        return Promise.resolve(user)
	} catch (error) {
		return Promise.reject(
			await generateInternalServerErrorRepsonse(error, 'getUser')
		);
	}
}

export async function removeUser(userDetails) {
	try {
        const user = await User.findOne({ userName: userDetails.userName });
        if (!user){
            return Promise.reject(
                generateBadRequestResponse(new Error(), 'User not found')
            );
        }
        await User.findOneAndDelete({
            userName: userDetails.userName
        });
        return Promise.resolve(user)
	} catch (error) {
		return Promise.reject(
			await generateInternalServerErrorRepsonse(error, 'getUser')
		);
	}
}