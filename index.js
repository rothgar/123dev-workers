async function handleRequest(request) {
  // Return a new Response based on a URL's hostname
  const url = new URL(request.url)
  // redirect twitterbot
  const userAgent = request.headers.get("User-Agent") || ""
  console.log(userAgent)
  if (userAgent.includes("twitterbot")) {
    console.log("matched twitterbot")
    var re = /posts/gi
    console.log(url.replace(re, "embed"))
    return Response.redirect(url.replace(re, "embed"))
  }

  return fetch(request)
}

addEventListener("fetch", event => {
  // NOTE: can’t use fetch here, as we’re not in an async scope yet
  event.respondWith(handleRequest(event.request))
})
