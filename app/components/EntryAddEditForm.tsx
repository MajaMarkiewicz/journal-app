'use client';

import { Category, type JournalEntryApiGet } from '@/types/journalEntry';
import type React from 'react';
import { useState } from 'react';

interface PropertyFormProps {
  entry?: JournalEntryApiGet;
  action: (formData: FormData) => Promise<void>;
  text: string;
}

const emptyEntry: JournalEntryApiGet = {
  _id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "",
  title: "",
  category: Category.Journal,
};

const EntryAddEditForm: React.FC<PropertyFormProps> = ({
entry = emptyEntry,
  action,
  text,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      await action(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    content,
    title,
    category,
    additionalCategory
  } = entry

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-3xl text-center font-semibold mb-6'>{text}</h2>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Title
        </label>
        <input
          type='text'
          id='title'
          name='title'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Entry title'
          defaultValue={title}
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='content'
          className='block text-gray-700 font-bold mb-2'
        >
          Description
        </label>
        <textarea
          id='content'
          name='content'
          className='border rounded w-full py-2 px-3'
          rows={4}
          placeholder='Add post content'
          defaultValue={content}
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='category' className='block text-gray-700 font-bold mb-2'>
          Category
        </label>
        <select
          id='category'
          name='category'
          className='border rounded w-full py-2 px-3'
          defaultValue={category}
          required
        >
          <option value=''>Select a category</option>
          <option value='Gratitude'>Gratitude</option>
          <option value='Satisfaction'>Satisfaction</option>
          <option value='Safety'>Safety</option>
          <option value='Connection'>Connection</option>
          <option value='Journal'>Journal</option>
        </select>
      </div>

      <div className='mb-4'>
        <label htmlFor='additionalCategory' className='block text-gray-700 font-bold mb-2'>
          Additional Category
        </label>
        <select
          id='additionalCategory'
          name='additionalCategory'
          className='border rounded w-full py-2 px-3'
          defaultValue={additionalCategory}
        >
          <option value=''>Select a category</option>
          <option value='Gratitude'>Gratitude</option>
          <option value='Satisfaction'>Satisfaction</option>
          <option value='Safety'>Safety</option>
          <option value='Connection'>Connection</option>
          <option value='Journal'>Journal</option>
        </select>
      </div>

      <div>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : text}
        </button>
      </div>
    </form>
  );
};

export default EntryAddEditForm;
