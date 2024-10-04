'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Category } from '@/types/journalEntry'
import Select from 'react-select'

const JournalFilters: React.FC = () => {
  const router = useRouter()
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    categories: [] as Category[],
    importantEvent: false,
  })

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleCategoryChange = (selectedOptions: any) => {
    setFilters((prev) => ({
      ...prev,
      categories: selectedOptions
        ? selectedOptions.map((option: any) => option.value)
        : [],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const query = new URLSearchParams()

    if (filters.startDate) query.set('startDate', filters.startDate)
    if (filters.endDate) query.set('endDate', filters.endDate)
    if (filters.categories.length > 0) {
      filters.categories.forEach((category) => {
        query.append('category', category)
      })
    }
    if (filters.importantEvent)
      query.set('importantEvent', filters.importantEvent.toString())

    router.push(`?${query.toString()}`)
  }

  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      categories: [] as Category[],
      importantEvent: false,
    })
    router.push('?')
  }

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-6 text-blue-800">Filter Entries</h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end"
      >
        <div data-testid="start-date-filter" className="flex flex-col">
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Start Date:
          </label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
          />
        </div>

        <div data-testid="end-date-filter" className="flex flex-col">
          <label className="block mb-2 text-lg font-medium text-gray-700">
            End Date:
          </label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="w-full p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
          />
        </div>

        <div data-testid="category-filter" className="col-span-1 flex flex-col">
          <label htmlFor="category-select" className="block mb-2 text-lg font-medium text-gray-700">
            Categories:
          </label>
          <Select
            isMulti
            inputId="category-select"
            name="categories"
            options={Object.values(Category).map((category) => ({
              value: category,
              label: category,
            }))}
            value={filters.categories.map((cat) => ({
              value: cat,
              label: cat,
            }))}
            onChange={handleCategoryChange}
            className="w-full shadow-sm border-gray-300 rounded-md focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center col-span-1" data-testid="important-filter">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="importantEvent"
              checked={filters.importantEvent}
              onChange={handleFilterChange}
              className="mr-2 h-5 w-5 focus:ring-blue-500"
            />
            <span className="text-lg font-medium">Important Event</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            data-testid="filters-button"
          >
            Apply Filters
          </button>
          <button
            type="button"
            className="w-full p-2 bg-gray-400 text-white rounded-lg shadow-sm hover:bg-gray-500 focus:ring-2 focus:ring-gray-400"
            data-testid="reset-filters"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  )
}

export default JournalFilters
