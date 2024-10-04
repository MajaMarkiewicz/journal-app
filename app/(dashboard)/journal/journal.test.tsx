import { describe, expect, vi, beforeEach } from 'vitest'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import JournalPage from '@/app/(dashboard)/journal/page'
import * as authModule from '@/utils/auth'
import * as connectMongoModule from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'
import { Category } from '@/types/journalEntry'
import type { UserApiGet } from '@/types/user'

const routerPushMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: routerPushMock,
    refresh: vi.fn(),
  }),
}))

const mockedUser: UserApiGet = {
  _id: 'mocked-user-id',
  clerkId: 'mocked-clerk-id',
  email: 'mocked-email@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockedEntries = [
  {
    _id: 'entry1',
    title: 'First Entry',
    category: Category.Gratitude,
    content: 'I am grateful for...',
    userId: 'mocked-user-id',
    date: new Date('2024-10-04T03:24:00'),
  },
  {
    _id: 'entry2',
    title: 'Second Entry',
    category: Category.Satisfaction,
    additionalCategory: Category.Journal,
    userId: 'mocked-user-id',
    date: new Date('2024-10-06T03:24:00'),
  },
]

describe('Journal Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(connectMongoModule, 'default').mockResolvedValue(undefined)
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(mockedUser)
  })

  it('#1 Given user has entries, when user enters journal page and no filters are applied, then all entries are displayed', async () => {
    // GIVEN
    vi.spyOn(JournalEntry, 'find').mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockedEntries),
      // biome-ignore lint/suspicious/noExplicitAny: it is a mock not a real function
    } as any)

    // WHEN
    render(await JournalPage({ searchParams: {} }))

    // THEN
    const entryCards = screen.getAllByTestId('entry-card')
    expect(entryCards[0].textContent).toBe(
      `${mockedEntries[1].category}${mockedEntries[1].additionalCategory}${mockedEntries[1].date.toDateString()}${mockedEntries[1].title}EditDelete`,
    )
    expect(entryCards[1].textContent).toBe(
      `${mockedEntries[0].category}${mockedEntries[0].date.toDateString()}${mockedEntries[0].title}${mockedEntries[0].content}EditDelete`,
    )
    expect(screen.getAllByTestId('delete-button')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('edit-button')[0]).toBeInTheDocument()
  })

  it('#2 Given user has entries with different dates, when user enters journal page, then entries are displayed sorted by newest date', async () => {
    // GIVEN
    vi.spyOn(JournalEntry, 'find').mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockedEntries),
      // biome-ignore lint/suspicious/noExplicitAny: it is a mock not a real function
    } as any)

    // WHEN
    const searchParams = {}
    render(await JournalPage({ searchParams }))

    // THEN
    expect(screen.getAllByTestId('entry-card')[0].textContent).include(
      mockedEntries[1].title,
    )
    expect(screen.getAllByTestId('entry-card')[1].textContent).include(
      mockedEntries[0].title,
    )
  })

  it('#3 When user enters journal page, then add new entry functionality is available', async () => {
    vi.spyOn(JournalEntry, 'find').mockReturnValue({
      lean: vi.fn().mockResolvedValue([]),
      // biome-ignore lint/suspicious/noExplicitAny: it is a mock not a real function
    } as any)

    // WHEN
    render(await JournalPage({ searchParams: {} }))

    // THEN
    expect(screen.getByTestId('add-entry')).toBeInTheDocument()
  })

  describe('Filters', async () => {
    beforeEach(() => {
      vi.spyOn(JournalEntry, 'find').mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockedEntries),
        // biome-ignore lint/suspicious/noExplicitAny: it is a mock not a real function
      } as any)
    })

    it('#4 When user enters journal page, then category, date and important event filters are available', async () => {
      // WHEN
      const searchParams = {}
      render(await JournalPage({ searchParams }))

      // THEN
      expect(screen.getByTestId('start-date-filter')).toBeInTheDocument()
      expect(screen.getByTestId('end-date-filter')).toBeInTheDocument()
      expect(screen.getByTestId('category-filter')).toBeInTheDocument()
      expect(screen.getByTestId('important-filter')).toBeInTheDocument()
    })
    const filterScenarios = [
      {
        description: {
          no: '5',
          name: 'dates',
          result: 'events from the selected date range',
        },
        searchParams: { startDate: '2024-10-01', endDate: '2024-10-04' },
        expectedQuery: {
          userId: mockedUser._id,
          date: expect.objectContaining({
            $gte: new Date('2024-10-01'),
            $lte: new Date('2024-10-04'),
          }),
        },
        routerPushArgs: '?startDate=2024-10-01&endDate=2024-10-04',
      },
      // {
      //   description: {
      //     no: '6',
      //     name: 'start date',
      //     result: 'events from the selected date',
      //   },
      //   searchParams: { startDate: '2024-10-01' },
      //   expectedQuery: {
      //     userId: mockedUser._id,
      //     date: expect.objectContaining({
      //       $gte: new Date('2024-10-01'),
      //       $lte: new Date('2024-10-01'),
      //     }),
      //   },
      //   routerPushArgs: '?startDate=2024-10-01',
      // },
      // {
      //   description: {
      //     no: '7',
      //     name: 'end date',
      //     result: 'events from the selected date',
      //   },
      //   searchParams: { endDate: '2024-10-04' },
      //   expectedQuery: {
      //     userId: mockedUser._id,
      //     date: expect.objectContaining({
      //       $gte: new Date('2024-10-04'),
      //       $lte: new Date('2024-10-04'),
      //     }),
      //   },
      //   routerPushArgs: '?endDate=2024-10-04',
      // },
      {
        description: {
          no: '8',
          name: 'category',
          result: 'event from the category',
        },
        searchParams: { category: [Category.Gratitude] },
        expectedQuery: {
          userId: mockedUser._id,
          category: { $in: [Category.Gratitude] },
        },
        routerPushArgs: `?category=${Category.Gratitude}`,
      },
      {
        description: {
          no: '9',
          name: 'important events',
          result: 'important events',
        },
        searchParams: { importantEvent: true },
        expectedQuery: {
          userId: mockedUser._id,
          importantEvent: true,
        },
        routerPushArgs: '?importantEvent=true',
      },
      {
        description: {
          no: '10',
          name: 'important events and categories',
          result: 'important entries from that categories',
        },
        searchParams: {
          importantEvent: true,
          category: [Category.Gratitude, Category.Satisfaction],
        },
        expectedQuery: {
          userId: mockedUser._id,
          importantEvent: true,
          category: { $in: [Category.Gratitude, Category.Satisfaction] },
        },
        routerPushArgs: `?category=${Category.Gratitude}&category=${Category.Satisfaction}&importantEvent=true`,
      },
    ]

    for (const scenario of filterScenarios) {
      it(`#${scenario.description.no} When user enters journal page, and choose ${scenario.description.name} to be filtered, then only ${scenario.description.result} are displayed, information about the filter applied is visible, option to reset filters is available`, async () => {
        const journalFindSpy = vi.spyOn(JournalEntry, 'find')

        render(await JournalPage({ searchParams: {} }))

        await waitFor(() => {
          expect(journalFindSpy).toHaveBeenCalledTimes(1)
          expect(journalFindSpy).toHaveBeenCalledWith({
            userId: mockedUser._id,
          })
        })

        // WHEN
        if (scenario.searchParams.startDate) {
          const startDateInput = screen
            .getByTestId('start-date-filter')
            .querySelector('input')
          fireEvent.change(startDateInput!, {
            target: { value: scenario.searchParams.startDate },
          })
        }

        if (scenario.searchParams.endDate) {
          const endDateInput = screen
            .getByTestId('end-date-filter')
            .querySelector('input')
          fireEvent.change(endDateInput!, {
            target: { value: scenario.searchParams.endDate },
          })
        }

        const categoriesParam = scenario.searchParams.category
        if (categoriesParam && categoriesParam.length > 0) {
          const categoryFilterContainer = screen.getByTestId('category-filter')

          for (const category of categoriesParam) {
            const categorySelect = within(
              categoryFilterContainer,
            ).getByLabelText('Categories:')
            userEvent.click(categorySelect)

            await waitFor(() => {
              const categoryOption = within(categoryFilterContainer).getByText(
                category,
              )
              expect(categoryOption).toBeVisible()
              userEvent.click(categoryOption)
            })

            await waitFor(() => {
              expect(screen.getByTestId('category-filter')).toHaveTextContent(
                category,
              )
            })
          }
        }

        if (scenario.searchParams.importantEvent !== undefined) {
          const importantEventCheckbox = screen
            .getByTestId('important-filter')
            .querySelector('input')
          fireEvent.click(importantEventCheckbox!)
        }

        const applyFiltersButton = screen.getByTestId('filters-button')
        fireEvent.click(applyFiltersButton)

        // THEN
        await waitFor(() => {
          expect(routerPushMock).toHaveBeenCalledWith(scenario.routerPushArgs)
        })

        render(await JournalPage({ searchParams: scenario.searchParams }))

        await waitFor(() => {
          expect(journalFindSpy).toHaveBeenCalledTimes(2)
          expect(journalFindSpy).toHaveBeenCalledWith(
            expect.objectContaining(scenario.expectedQuery),
          )
        })

        // expect(screen.getByTestId('filters-applied-info')).toBeInTheDocument();
        // expect(screen.getByTestId('reset-filters')).toBeInTheDocument();
      })
    }
  })
})
