import { NextApiResponse, NextApiRequest } from 'next';

import { parse } from '../../utils/apiResolvers';
import { MediaType, Media } from '../../types';
import getInstance from '../../utils/axios';

interface Response {
  type: 'Success' | 'Error';
  data: Media[] | { message: string };
}

const apiKey = process.env.TMDB_KEY;

export default async function handler(request: NextApiRequest, response: NextApiResponse<Response>) {
  const axios = getInstance();
  const { type, genre } = request.query;

  try {
    const result = await axios.get(`/discover/${type}`, {
      params: {
        api_key: apiKey,
        with_genres: genre,
        watch_region: 'US',
        with_networks:'213',
      }
    });
    const data = parse(result.data.results, type as MediaType);

    response.status(200).json({ type: 'Success', data });
  } catch (error: any) {
    console.log(error?.data || error?.message || error);
    response.status(500).json({ 
      type: 'Error', 
      data: error?.data || { message: 'An error occurred while fetching data' }
    });
  }
}