import dbConnect from 'utils/dbConnect'
import { PersonModel } from 'models/Person'
import { Response } from 'types/Response'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  dbConnect()
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const people = await PersonModel.find({})

        return res.status(200).json({ success: true, data: people })
      } catch (err) {
        return res.status(400).json({ success: false })
      }
    case 'POST':
      try {
        body.createdAt = new Date()
        const person = await PersonModel.create(body)
        return res.status(201).json({ success: true, data: person })
      } catch (err) {
        return res.status(400).json({ success: false })
      }
    default:
      return res.status(400).json({ success: false })
  }
}
