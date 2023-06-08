import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './handlers/users'
import productRoutes from './handlers/products'
import orderRoutes from './handlers/orders'
import order_productsRoutes from './handlers/order_products'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('This is homepage of storefront project')
})

userRoutes(app)
productRoutes(app)
orderRoutes(app)
order_productsRoutes(app)

app.get('/test_cors', cors(corsOptions), function(req,res,next) {
    res.json({msg: `This is CORS-enabled with a middle ware`})
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

function cors(corsOptions: { origin: string; optionsSuccessStatus: number }): any {
    throw new Error('Function not implemented.')
}

export default app