import connectToMongo from '../../../utils/connectToMongo'

connectToMongo()

export default function handler(req, res) {
  res.status(200).json('repuestos')
}