import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import db from "./database"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const result = await db('users').select('*')

  return {
    statusCode: 201,
    body: JSON.stringify(result),
  }
}