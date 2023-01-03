import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/navbar'

const Editor: NextPage = () => {
  const router = useRouter()
  const query = router.query

  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState(query.prompt)
  const [thesis, setThesis] = useState(query.thesis)
  const [essay, setEssay] = useState([])

  const handleThesisChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setThesis(target.value)
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    // put page into loading state
    setIsLoading(true)

    // prevents form from redirecting on submit
    event.preventDefault()

    // send text to OpenAI to get essay outline
    const { data } = await axios({
      method: 'get',
      url: '/api/essay',
      params: {
        thesis,
        prompt,
      },
    })
    const essayString = data.text

    console.log(essayString)

    const essay = essayString.split('\n')

    console.log(essay)

    // after receiving outline from OpenAI, exit loading state
    setIsLoading(false)

    // set essay
    setEssay(essay)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-8">
        <Head>
          <title>Study Pal</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-col items-center justify-center px-20 text-center">
          <h1 className="text-3xl font-bold">
            <span>Question: </span>
            <span className="text-3xl font-normal">
              {prompt || 'undefined'}
            </span>
          </h1>
          <div className='pt-2 text-xl'>{thesis}</div>
          <button
              className={classnames(
                'mt-6 text-white font-medium py-4 px-8 rounded text-xl',
                { 'bg-blue-700': !isLoading, 'bg-blue-300': isLoading },
              )}
              onClick={() => router.push("/")}
            >
              Ask another question
            </button>
        </main>
      </div>
    </div>
  )
}

export default Editor
