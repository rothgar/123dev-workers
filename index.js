async function handleRequest(request) {
  // Return a new Response based on a URL's hostname
  let url = new URL(request.url);
  url = `${url}`;
  const statusCode = 301
  
  const { searchParams } = new URL(request.url)
  let auto_play = searchParams.get('auto_play')

  if (auto_play) {
    // replace 123dev.email/posts/1 with 123dev.email/embed/posts/1
    var re = /embed/gi
    console.log(`returning ${url}`)
    return fetch(url.replace(re, "embed/posts"));
  }

  // redirect twitterbot
  const userAgent = request.headers.get("User-Agent") || ""
  if (userAgent.includes("Twitterbot")) {
    if (request.url.includes("posts") && !request.url.includes("embed")) {
      //replace 123dev.email/posts/1 with 123dev.email/embed/posts/1
        var re = /posts/gi
        console.log(`Redirecting twitterbot to ${url.replace(re, "embed/posts")}`)
        return Response.redirect(url.replace(re, "embed/posts"), statusCode)
    } else if (request.url == "https://123dev.email/") {
      console.log(`Shared home page`)
      return Response.redirect("https://123dev.email/embed/posts/1/", statusCode)
    }
  }
  if (request.url.includes("embed")) {
    if (!userAgent.includes("Twitterbot")) {
      //replace 123dev.email/embed/posts/1 with 123dev.email//posts/1
      var re = /embed/gi
      console.log(`Redirecting user to ${url.replace(re, "")}`)
      return Response.redirect(url.replace(re, ""), statusCode)
    }
  }
  console.log(`returning ${url}`)
  return fetch(url);
}

addEventListener("fetch", event => {
  // NOTE: can’t use fetch here, as we’re not in an async scope yet
  console.log(`Received new request: ${event.request.url}`)
  event.respondWith(handleRequest(event.request))
})
