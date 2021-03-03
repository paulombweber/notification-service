import AWS from 'aws-sdk';

const ses = new AWS.SES({
  'region': 'sa-east-1'
});

async function sendMail(event, context) {
  const record = event.Records[0];

  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Source: process.env.MAIL_SOURCE,
    Destination: {
      ToAddresses: [
        recipient
      ]
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }
      },
      Subject: {
        Data: subject
      }
    },
  };

  console.log(params);

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const handler = sendMail;


