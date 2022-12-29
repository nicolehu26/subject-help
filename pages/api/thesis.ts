// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import { config } from '../../lib/config'

type Data = {
  text: string | undefined
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const queries = req.query
  const prompt = queries.prompt

  const openaiPrompt =
    'Write a one to five sentence paragraph that answers the question "' +
    prompt +
    '"'

  const configuration = new Configuration({
    organization: config.openAiOrgId,
    apiKey: config.openAiKey,
  })
  const openai = new OpenAIApi(configuration)
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: openaiPrompt,
    temperature: 0.7,
    top_p: 1,
    max_tokens: 200,
  })

  const completion = response.data.choices[0].text

  res.status(200).json({ text: completion })
}
