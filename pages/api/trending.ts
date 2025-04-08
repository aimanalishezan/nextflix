import { NextApiRequest, NextApiResponse } from 'next';
import axios from '../../utils/axios';
import { Media, MediaType } from '../../types';
import { parse } from '../../utils/apiResolvers';

interface Response {
  type: 'Success' | 'Error';
  data: Media[] | string;
}

const apiKey = process.env.TMDB_KEY;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Response>
) {
  const { type, time } = request.query;

  try {
    const result = await axios().get(`/trending/${type}/${time}`, {
      params: {
        api_key: apiKey,
        watch_region: 'US',
      },
    });

    const data = parse(result.data.results, type as MediaType);
    response.status(200).json({ type: 'Success', data });
  } catch (error) {
    // Safely try to extract `.data` if it exists
    const message =
      typeof error === 'object' &&
      error !== null &&
      'data' in error &&
      typeof (error as any).data === 'string'
        ? (error as any).data
        : error instanceof Error
        ? error.message
        : 'An unexpected error occurred.';

    console.error('Error:', message);

    response.status(500).json({
      type: 'Error',
      data: message,
    });
  }
}
