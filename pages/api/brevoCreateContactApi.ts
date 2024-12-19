import { ContactsApi, CreateContact, ContactsApiApiKeys } from '@getbrevo/brevo'
import { NextApiRequest, NextApiResponse } from 'next'

const apiInstance = new ContactsApi()
apiInstance.setApiKey(
  ContactsApiApiKeys.apiKey,
  process.env.BREVO_EMAIL_API_KEY as string
)

const brevoCreateContactApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // Ensure the API route only allows POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  // Extract required data from the request body
  const { email, listIds, firstName, lastName } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Missing required fields: email' })
  }

  const newContact = new CreateContact()
  newContact.email = email
  newContact.listIds = listIds || []
  newContact.attributes = {
    FIRSTNAME: firstName || '',
    LASTNAME: lastName || '',
  }

  try {
    const response = await apiInstance.createContact(newContact)
    res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ error: '' })
}

export default brevoCreateContactApi
