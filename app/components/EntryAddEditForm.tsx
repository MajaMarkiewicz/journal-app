'use client'

import { Category, type JournalEntryApiGet } from '@/types/journalEntry'
import type React from 'react'
import { useState } from 'react'

interface PropertyFormProps {
  entry?: JournalEntryApiGet
  action: (formData: FormData) => Promise<void>
  text: string
}

const emptyEntry: JournalEntryApiGet = {
  _id: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  date: new Date(),
  userId: '',
  title: '',
  category: Category.Journal,
  content: '',
  additionalCategory: undefined,
  importantEvent: false,
}

const EntryAddEditForm: React.FC<PropertyFormProps> = ({
  entry = emptyEntry,
  action,
  text,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      await action(formData)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const { content, title, category, additionalCategory, date, importantEvent } =
    entry

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-8 mx-auto overflow-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-blue-900 text-left">
        {text}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border border-gray-300 rounded-lg w-full p-2 sm:p-3 md:p-4 text-base sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            defaultValue={date.toISOString().split('T')[0]}
            required
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-gray-300 rounded-lg w-full p-2 sm:p-3 md:p-4 text-base sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Entry title"
            defaultValue={title}
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
          >
            Description
          </label>
          <textarea
            id="content"
            name="content"
            className="border border-gray-300 rounded-lg w-full p-2 sm:p-3 md:p-4 text-base sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows={7}
            placeholder="Add post content"
            defaultValue={content}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="border border-gray-300 rounded-lg w-full p-2 sm:p-3 md:p-4 text-base sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              defaultValue={category}
              required
            >
              <option value="">Select a category</option>
              <option value="Gratitude">Gratitude</option>
              <option value="Satisfaction">Satisfaction</option>
              <option value="Safety">Safety</option>
              <option value="Connection">Connection</option>
              <option value="Journal">Journal</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="additionalCategory"
              className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
            >
              Additional Category
            </label>
            <select
              id="additionalCategory"
              name="additionalCategory"
              data-testid="additional-category"
              className="border border-gray-300 rounded-lg w-full p-2 sm:p-3 md:p-4 text-base sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              defaultValue={additionalCategory}
            >
              <option value="">Select a category</option>
              <option value="Gratitude">Gratitude</option>
              <option value="Satisfaction">Satisfaction</option>
              <option value="Safety">Safety</option>
              <option value="Connection">Connection</option>
              <option value="Journal">Journal</option>
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <input
            data-testid="important"
            type="checkbox"
            id="importantEvent"
            name="importantEvent"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            defaultChecked={importantEvent}
          />
          <label
            htmlFor="importantEvent"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            Mark as Important Event
          </label>
        </div>

        <div>
          <button
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            data-testid="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : text}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EntryAddEditForm
