import {
  TransactionalEmailsApi,
  SendSmtpEmail,
  TransactionalEmailsApiApiKeys,
} from '@getbrevo/brevo'
import { NextApiRequest, NextApiResponse } from 'next'

const apiInstance = new TransactionalEmailsApi()
apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_EMAIL_API_KEY as string
)

const brevoSendStorySubmittedApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // Ensure the API route only allows POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  // Extract required data from the request body
  const { soulName, soulSlug, storySlug, storyTitle, storyAuthor } = req.body

  if (!soulName && !soulSlug && !storyTitle && !storyAuthor) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const sendSmtpEmail = new SendSmtpEmail()
  sendSmtpEmail.subject = 'New story submitted by: {{ params.storyAuthor }}'
  sendSmtpEmail.htmlContent = `<html>
      <body>
        <h2>Draft story submitted</h2>
        <h3>Title: {{params.storyTitle}}</h3>
        <h3>Author: {{params.storyAuthor}}</h3>
        <p>
          <a href="https://staging--purestoke.netlify.app/api/preview?secret=stokeret&slug=/story/{{params.storySlug}}" target="_blank">
            View Staging Preview
          </a>
        </p>
        <p>
          <a href="https://studio-us-west-2.hygraph.com/4ac9c1a7-9663-47e5-9cbd-5b6dbb0c0927/ff3365d5efc54027bc94bd775871cc53/content/4e78b5a583f844b3af27c023fb697fb9/b45cacf2eeb14af4a939e565afa8786e" target="_blank">
            Hygraph Draft Stories
          </a>
        </p>
        
      </body>
    </html>`
  sendSmtpEmail.sender = {
    name: 'Pure Stoke System',
    email: 'cbaxter713@gmail.com',
  }
  sendSmtpEmail.to = [
    { email: 'cbaxter713@gmail.com', name: 'Web Admin' },
    { email: 'lindsayrsimpson@gmail.com', name: 'Web Admin' },
  ]
  sendSmtpEmail.params = {
    soulName,
    soulSlug,
    storySlug,
    storyTitle,
    storyAuthor,
  }

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function () {
        // console.log(
        //   'API called successfully. Returned data: ' + JSON.stringify(data)
        // )
      },
      function (error) {
        console.error(error)
      }
    )
    res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ error: '' })
}

export default brevoSendStorySubmittedApi
