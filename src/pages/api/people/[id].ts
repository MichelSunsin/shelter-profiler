import dbConnect from 'utils/dbConnect'
import { PersonModel } from 'models/Person'
import { Response } from 'types/Response'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  dbConnect()
  const {
    method,
    query: { id },
  } = req

  switch (method) {
    case 'GET':
      try {
        const person = await PersonModel.findById(id)

        if (!person) {
          return res.status(404).json({ success: true })
        }

        return res.status(200).json({ success: true, data: person })
      } catch (err) {
        return res.status(400).json({ success: false })
      }
    case 'PUT':
      try {
        const person = await PersonModel.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })

        if (!person) {
          return res.status(400).json({ success: false })
        }

        return res.status(200).json({ success: true, data: person })
      } catch (err) {
        return res.status(400).json({ success: false })
      }
    case 'DELETE':
      try {
        const deletedPerson = await PersonModel.findByIdAndDelete(id)

        if (!deletedPerson) {
          return res.status(400).json({ success: false })
        }

        return res.status(200).json({ success: true })
      } catch (err) {
        return res.status(400).json({ success: false })
      }
    default:
      return res.status(400).json({ success: false })
  }
}
