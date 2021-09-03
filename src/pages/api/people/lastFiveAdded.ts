import dbConnect from 'utils/dbConnect'
import { PersonModel } from 'models/Person'
import { Response } from 'types/Response'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  dbConnect()

  try {
    const people = await PersonModel.find({}).sort({ createdAt: -1 }).limit(5)

    return res.status(200).json({ success: true, data: people })
  } catch (err) {
    return res.status(400).json({ success: false })
  }
}
