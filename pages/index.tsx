import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Navbar from '../components/navbar'

const Home: NextPage = () => {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handlePromptChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setPrompt(target.value)
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    // put page into loading state
    setIsLoading(true)

    // prevents form from redirecting on submit
    event.preventDefault()

    // send text to OpenAI to get essay outline
    const { data } = await axios({
      method: 'get',
      url: '/api/thesis',
      params: {
        prompt: prompt,
      },
    })
    const thesis = data.text

    // after receiving outline from OpenAI, exit loading state
    setIsLoading(false)

    // redirect to new page putting outline in query (https://stackoverflow.com/questions/72221255/how-to-pass-data-from-one-page-to-another-page-in-next-js)
    Router.push({ pathname: '/editor', query: { thesis, prompt } })
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-44">
        <Head>
          <title>Study Buddy</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-col items-center justify-center px-20 text-center">
          <h1 className="text-3xl font-regular">
            Ask Study Buddy a question
          </h1>

          <form
            className="mt-6 flex w-full flex-1 flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <input
              className={classnames(
                'border border-gray-400 rounded w-full max-w-2xl pt-2 p-2 text-2xl',
                { 'text-gray-400': isLoading },
              )}
              type="text"
              placeholder="What is the Pythagorean theorem?"
              minLength={10}
              onChange={handlePromptChange}
              disabled={isLoading}
              required
            />
            <button
              className={classnames(
                'mt-6 text-white font-medium py-4 px-8 rounded text-xl',
                { 'bg-blue-700': !isLoading, 'bg-blue-300': isLoading },
              )}
              type="submit"
              disabled={isLoading}
            >
              Answer
            </button>
            <div role="status">
              <svg
                className={classnames(
                  'mt-6 inline mr-2 w-10 h-10 text-gray-200 animate-spin fill-blue-700',
                  { invisible: !isLoading },
                )}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default Home
