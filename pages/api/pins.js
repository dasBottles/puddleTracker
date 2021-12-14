import dbConnect from "../../lib/dbConnect"
import Pin from "../../models/Pin"

export default async function handler (req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const pins = await Pin.find({})
                res.status(200).json({ success: true, data: pins })
              } catch (error) {
                res.status(400).json({ success: false })
              }
              break
            case 'POST':
              try {
                const pin = await Pin.create(req.body)
                res.status(201).json({ success: true, data: pin })
              } catch (error) {
                res.status(400).json({ success: false })
              }
              break
            default:
              res.status(400).json({ success: false })
              break
          }
}