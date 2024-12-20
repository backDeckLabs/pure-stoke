/**
 * Functions for interacting with the Brevo API
 */

const headers = {
  'Content-Type': 'application/json',
}

export const brevoListIds = {
  testStokeList: '2',
}

const handleRequestError = (error: unknown) => {
  console.error(error)
}

/**
 * Create Contact in the Brevo Email System
 * https://developers.brevo.com/reference/createcontact
 */
export const createBrevoContact = async (
  email: string,
  firstName: string,
  lastName: string,
  listIds?: number[]
) => {
  const request = {
    email,
    firstName,
    lastName,
    listIds: listIds ?? [brevoListIds.testStokeList],
  }

  try {
    const response = await fetch('/api/brevoCreateContactApi', {
      headers,
      method: 'POST',
      body: JSON.stringify(request),
    })
    return await response.json()
  } catch (e) {
    handleRequestError(e)
  }
}

/**
 * Send a system email to Admins when a story is submitted
 */
export const sendStorySubmittedSystemEmail = async ({
  soulName,
  soulSlug,
  storySlug,
  storyTitle,
  storyAuthor,
}: {
  soulName: string
  soulSlug: string
  storySlug: string
  storyTitle: string
  storyAuthor: string
}) => {
  const request = {
    soulName,
    soulSlug,
    storySlug,
    storyTitle,
    storyAuthor,
  }

  try {
    const response = await fetch('/api/brevoSendDraftSubmittedEmail', {
      headers,
      method: 'POST',
      body: JSON.stringify(request),
    })
    return await response.json()
  } catch (e) {
    handleRequestError(e)
  }
}
