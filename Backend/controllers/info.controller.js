import Info from '../models/info.model.js';

export const StoreInfo = async (req, res) => {
    try {
        const infoData = req.body;
        const info = new Info(infoData);
        await info.save();
        res.status(201).json({ message: 'Information stored successfully', info });
    } catch (error) {
        console.error('Error storing information:', error);
        res.status(500).json({ message: `Error storing information: ${error.message}` });
    }
}

