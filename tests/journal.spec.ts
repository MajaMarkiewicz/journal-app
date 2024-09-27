import { test, expect } from '@playwright/test'

test('#1 Given user is not logged in, when try to go to journal, then is redirected to sign in page', async ({
  page,
}) => {
  // WHEN
  await page.goto('http://localhost:3000/journal')

  // THEN
  await expect(page.url()).toBe(
    'http://localhost:3000/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fjournal',
  )
})

test('#2 Given logged in user on journal, when clicks new entry, fills the form and clicks submit, then new entry is added to database, he is redirected to journal page, and change is visible on journal page', async ({
  page,
}) => {
  // GIVEN
    // todo mock that user is logged in
  await page.goto('http://localhost:3000/journal')
  await expect(page.url()).toBe('http://localhost:3000/journal')

  // WHEN
    // user clicks new entry
    // user fills the form
    // user clicks submit

  // THEN
    // fn to save new entry in the database is run with correct data
    // user is redirected to journal page
    // change is visible on journal page
})

test('#3 Given logged in user on journal page with entries, when clicks an entry, change sth in the form and clicks submit, then entry is updated in database and on journal page', async ({
  page,
}) => {
  // GIVEN
    // todo mock that user is logged in
    // mock mongoDB and an entry in the database
  await page.goto('http://localhost:3000/journal')
  await expect(page.url()).toBe('http://localhost:3000/journal')

  // WHEN
    // user clicks an entry
    // user change sth in the form
    // user clicks submit

  // THEN
    // fn to update entry in the database is run with correct data
    // change is visible on journal page
})
