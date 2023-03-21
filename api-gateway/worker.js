/**
 * CloudFlare worker CORS proxy/API gateway
 */
export default {
  async fetch(request) {
    const allowOrigin = 'https://starling-roundup-test.surge.sh';
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,OPTIONS',
      'Access-Control-Max-Age': '86400',
    };

    // The URL for the remote third party API you want to fetch from
    // but does not implement CORS
    const API_HOSTNAME = 'api-sandbox.starlingbank.com';

    async function handleRequest(request) {
      const url = new URL(request.url);
      url.hostname = API_HOSTNAME;

      // Rewrite request to point to API URL. This also makes the request mutable
      // so you can add the correct Origin header to make the API server think
      // that this request is not cross-site.
      request = new Request(url, request);
      // request.headers.set('Origin', new URL(apiUrl).origin);
      let response = await fetch(request);

      // Recreate the response so you can modify the headers
      response = new Response(response.body, response);

      // Set CORS headers
      response.headers.set('Access-Control-Allow-Origin', allowOrigin);

      // Append to/Add Vary header so browser will cache response correctly
      response.headers.append('Vary', 'Origin');

      return response;
    }

    async function handleOptions(request) {
      if (
        request.headers.get('Origin') !== null &&
        request.headers.get('Access-Control-Request-Method') !== null &&
        request.headers.get('Access-Control-Request-Headers') !== null
      ) {
        // Handle CORS preflight requests.
        return new Response(null, {
          headers: {
            ...corsHeaders,
            'Access-Control-Allow-Headers': request.headers.get(
              'Access-Control-Request-Headers'
            ),
          },
        });
      } else {
        // Handle standard OPTIONS request.
        return new Response(null, {
          headers: {
            Allow: 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
          },
        });
      }
    }

    if (request.method === 'OPTIONS') {
      // Handle CORS preflight requests
      return handleOptions(request);
    } else {
      // Handle requests to the API server
      return handleRequest(request);
    }
  },
};
