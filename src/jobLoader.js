export const jobLoader = async ({ params, request }) => {
  const response = await fetch(`/api/jobs/${encodeURIComponent(params.id)}`, {
    signal: request.signal,
  })
  if (!response.ok) throw response
  return response.json()
}
