import jwt from "jsonwebtoken";

import { users } from "../data/index.js";
import { SECRET } from "../config.js";

export const checkTokenMiddleware = function (req, res, next) {
    if (req.method === 'OPTIONS') next()

    if (req.path === '/login' || req.path === '/registration') {
        next()
    }

    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            throw new Error('Unauthorized')
        }

        const verified = jwt.verify(accessToken, SECRET);
        const user = users.find((user) => user.username === verified.username);

        if (!verified || !user) {
            throw new Error('Unauthorized')
        }

        next()
    } catch (e) {
        console.error(e, 'Unauthorized')
        return res.status(401).json(e)
    }
}