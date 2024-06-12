import { getCurrentUser } from "@/actions";



type RequestBody = {
    [key: string]: any;
  };
  
  type ResponseData = {
    [key: string]: any;
  };
  
  const fetchWithHeaders = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    // Define common headers
    const user = await getCurrentUser()
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      // Add any other common headers here
      'Authorization': `Bearer ${user?.id}`, // Assuming getToken() returns the token
    };
  
    // Merge common headers with options hea    ers, if provided
    options.headers = { ...headers, ...options.headers };
  
    // Perform the fetch request with the modified options
    return fetch(url, options).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  };
  

  export default fetchWithHeaders