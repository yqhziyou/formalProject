import 'dotenv/config';

export default {
    backend: process.env.PORT,
    openaiapi: process.env.OPENAI_API_KEY,
    mongodb_url: process.env.MONGODB_URI,
    tls: true,
};
