const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }
  return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }

  const response = await fetch(baseUrl, options)

  const data = await response.json() 

  // 2. Check if the request failed (status 400/500)
  if (!response.ok) {
    // 3. Create a custom error to throw
    const error = new Error('Failed to create')
    
    // 4. Attach the backend data to this error object
    // We structure it like Axios (error.response.data) so your App.jsx code works!
    error.response = { data: data } 
    
    // 5. Throw it so React Query triggers 'onError'
    throw error
  }

  return data

  return await response.json()
}

export const updateAnecdote = async (updatedAnecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }

  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update note')
  }

  return await response.json()
}