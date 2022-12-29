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
  const thesis = queries.thesis

  const openaiPrompt = `Prompt:\nDo you prefer to watch moves in theaters or on Netflix?\nThesis:\nWhile I love movies as much as ever, I find it more enjoyable to wait for a movie’s release on Netflix because of the inconvenience of going out, the temptations of the concession stand, and the behavior of some patrons.\nEssay:\n1. I am a movie fanatic. When friends want to know what picture won the Oscar in 2001, they ask me. When friends want to know who voiced Optimus Prime in Transformers, they ask me. However, my buddies have stopped asking me if I want to go out to the movies. While I love movies as much as ever, I find it more enjoyable to wait for a movie’s release on Netflix because of the inconvenience of going out, the temptations of the concession stand, and the behavior of some patrons.\n2. First of all, just getting to the theater presents difficulties. Leaving a home equipped with an HDTV and surround sound isn't attractive on a cold or rainy night. Even if the weather cooperates, there is the hassle of looking for a parking space and the lines. There is also the worry of whether you and your friends will get all your seats together. Although none of these hindrances are insurmountable, it’s much easier to stay seated on your sofa.\n3. Second, the theater offers tempting snacks that I don’t really need. At home I can control myself because there is no ice cream in the freezer, we don’t have sodas in the fridge, and my snacks tend to be healthy, like fruits, nuts, and juices. At the movies, even if I only buy a Diet Coke, the smell of fresh popcorn dripping with butter soon overcomes me. And what about the nachos with cheese and the Snickers and M&M’s? I’m better off without all those temptations.\n4. Finally, some of the other patrons are even more of a problem than the concession stand. Little kids race up and down the aisles, making noise. Teenagers try to impress their friends by talking back to the actors on the screen or otherwise making fools of themselves. Some adults aren’t any better, commenting loud enough to reveal plot twists that are supposed to be a secret until the movie’s end. What am I doing here, I ask myself.\n5. After arriving home from the movies one night, I decided I had had enough. I was not going to be a moviegoer anymore. I was tired of the problems involved in getting to the theater, resisting unhealthy snacks, and dealing with the patrons. The next day, I arranged to have premium movie channels added to my cable TV service, and I got a Netflix membership. I may now see movies a bit later than other people, but I’ll be more relaxed watching box office hits in the comfort of my own living room.\nPrompt:\nWhich do you like better, cats or dogs?\nThesis:\nDespite what dog lovers may believe, cats make excellent house pets because they are good companions, they are civilized members of the household, and they are easy to care for.\nEssay:\n1. Man's best friend has historically been considered a dog. But dogs are not the only animal friend whose camaraderie people enjoy. For many people, a cat is their best friend. Despite what dog lovers may believe, cats make excellent house pets because they are good companions, they are civilized members of the household, and they are easy to care for. Let me tell you why.\n2. Cats are good companions. They will snuggle up and ask to be petted or scratched under the chin, and who can resist a purring cat? If they're not feeling affectionate, cats are generally quite playful; they love to chase balls and feathers — or just about anything dangling from a string. And when they’re tired from chasing laser pointers, cats will curl up in your lap to nap. Cats are loyal housemates.\n3. Cats are also civilized housemates. Unlike dogs, cats don’t bark or make other loud noises; most cats don't even meow that often. Cats don't usually have accidents; mother cats train their kittens to use the litter box, and most cats will use it without fail from that time on. Cats do have claws, but a tall scratching post in a favorite cat area of the house will often keep the cat content to leave the furniture alone. Compared with other pets, cats are actually quite polite.\n4. Cats are easy to care for. They don’t have to be walked because they get plenty of exercise in the house as they play. Even cleaning their litter box can be a quick, painless procedure. Cats also take care of their own grooming; bathing a cat is almost never necessary because under ordinary circumstances cats clean themselves. Cats are so easy to care for they can be left home alone for a few hours without fear.\n5. Cats are low maintenance, civilized companions. People who have small living quarters appreciate having a cat. People who have less time for pet care appreciate having a cat. However, even people who have plenty of space and time still opt to have a cat because they love the cat personality. In many ways, cats are an ideal house pet.\nPrompt:\n${prompt}\nThesis:\n${thesis}\nEssay:\n`

  const configuration = new Configuration({
    organization: config.openAiOrgId,
    apiKey: config.openAiKey,
  })
  const openai = new OpenAIApi(configuration)
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: openaiPrompt,
    temperature: 0.7,
    top_p: 1,
    max_tokens: 1000,
  })

  const completion = response.data.choices[0].text

  res.status(200).json({ text: completion })
}