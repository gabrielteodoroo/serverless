import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import db from "./database";

type IUserDTO = {
  name: string
  username: string
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { name, username } = JSON.parse(event.body!) as IUserDTO

  if (!name || !username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' }),
    }
  }

  const userAlreadyExists = await db('users').where({ username }).first()

  if (userAlreadyExists) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Username already exists' }),
    }
  }

  const result = await db('users').insert({ name, username }).returning('*')

  return {
    statusCode: 201,
    body: JSON.stringify(result),
  }
}