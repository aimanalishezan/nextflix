import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from '../../utils/apiResolvers'; // assuming you have this
import { Media, MediaType } from '../../types';

const apiKey = process.env.TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface Response {
  type: 'Success' | 'Error';
  data: Media[] | string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ type: 'Error', data: 'Missing query.' });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
        query
      )}&language=en-US&include_adult=false`
    );

    if (!response.ok) throw new Error('TMDB request failed.');

    const json = await response.json();
    const results = parse(json.results, 'multi' as MediaType);
    res.status(200).json({ type: 'Success', data: results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      type: 'Error',
      data: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
