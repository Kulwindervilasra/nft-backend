import express, { Request, Response } from 'express';
import { uploadToIPFS, uploadJSONToIPFS } from './ipfsService';
import multer from 'multer';

const router = express.Router();
const upload = multer();

/**
 * @swagger
 * /api/upload-file:
 *   post:
 *     summary: Upload a file to IPFS
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded file to IPFS
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IpfsHash:
 *                   type: string
 */
router.post('/upload-file', upload.single('file'), async (req: Request, res: Response) => {
    const file = req.file?.buffer;
    const fileName = req.file?.originalname;

    if (!file || !fileName) {
        return res.status(400).json({ error: 'File is required' });
    }

    try {
        const result = await uploadToIPFS(file, fileName, req?.file?.mimetype as string);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload file to IPFS' });
    }
});

/**
 * @swagger
 * /api/upload-json:
 *   post:
 *     summary: Upload JSON metadata to IPFS
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully uploaded JSON to IPFS
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IpfsHash:
 *                   type: string
 */
router.post('/upload-json', async (req: Request, res: Response) => {
    const json = req.body;

    try {
        const result = await uploadJSONToIPFS(json);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload JSON to IPFS' });
    }
});

export default router;
