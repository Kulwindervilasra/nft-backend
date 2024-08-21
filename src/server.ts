import express from 'express';
import { config } from 'dotenv';

config(); // Load environment variables
import { setupSwagger } from './swagger';
import router from './router';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Setup Swagger
setupSwagger(app);
app.use('/api', router);

app.use("/", (req, res) => {
    res.status(200).json({ message: "Server is running" })
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
