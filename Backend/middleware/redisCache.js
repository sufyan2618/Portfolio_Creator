import { createClient } from 'redis';

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
    },
    password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
await redisClient.connect();

export const redisCache = async (req, res, next) => {
    if(req.method !== 'GET') {
        return next(); 
    }

    const key = "designs"

    try {
        const cachedData = await redisClient.get(key);
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }
        
        // If no cache, proceed to the next middleware
        req.redisClient = redisClient; 
        
        next();
    } catch (error) {
        console.error('Redis cache error:', error);
        next();
    }
}

