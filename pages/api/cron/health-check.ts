import type { NextApiRequest, NextApiResponse } from 'next';

type HealthCheckResponse = {
  success: boolean;
  timestamp: string;
  backendStatus?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthCheckResponse>
) {
  // Only allow GET requests (Vercel cron jobs use GET)
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      timestamp: new Date().toISOString(),
      error: 'Method not allowed'
    });
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://onurcopur-tattoo-search-engine.hf.space';
  const healthEndpoint = `${backendUrl}/health`;

  try {
    // Fetch the health endpoint with a 10-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(healthEndpoint, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    // Log success for monitoring
    console.log(`[Health Check] ${new Date().toISOString()} - Backend is ${data.status || 'healthy'}`);

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      backendStatus: data.status || 'healthy'
    });

  } catch (error) {
    // Log the error but still return 200 to Vercel
    // This prevents Vercel from retrying and ensures the cron runs on schedule
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[Health Check] ${new Date().toISOString()} - Failed:`, errorMessage);

    return res.status(200).json({
      success: false,
      timestamp: new Date().toISOString(),
      error: errorMessage
    });
  }
}
