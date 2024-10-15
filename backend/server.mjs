import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from './services/logger.service.mjs'

// Routes import
import productRoutes from './api/product/product.routes.mjs'
import { authRoutes } from './api/auth/auth.routes.mjs'
import { userRoutes } from './api/user/user.routes.mjs'

const app = express()
const http = (await import('http')).createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve static files from 'public' in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://127.0.0.1:4200',
            'http://localhost:4200'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
