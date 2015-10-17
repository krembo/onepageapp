# OnePageApp

OnePageApp is a simple vanilla js application, leans on html files, loaded from server.
For curent version to work you should have the basic page (let's call it layout),
that will hold all the scripts and css, and basic layout.
Then you need to load this script and initiate it with **OnePageApp.init()**

--

### Init()
**init** function need to receive 3 parameters and 2 optional:
* **menu** - Menu element, that holds links to all pages you want to load asynchronously
* **container** - Container element for changing content
* **tpl** - default html content file, e.g *'/templates/main.html'* 
* **tplBase** - (optional - default to '/'), base path for content html files, e.g *'/templates/'*
* **basePath** - (optional -default to '/'), base path for one page app, e.g. *'/onepageapp'*

--

### What does this code actually do?

For the moment it gives you the ability to load page once and only change content part when menu links clicked.
It also updates browser history and location bar, so back and forward buttons work correctly.

If you configure your back-end to serve basic page for all paths, you will also get the nice feature of loading right page for different paths. 
For example: *'/main'* will load content from *'/templates/main.html'*, *'/second'* will load content from *'/templates/second.html'*.

Another good thing as that once your content was loaded it saved in browser, so while user navigating around your site visited pages will be served lightning fast!

--

### Next stage

There are several things that need to be fixed, to make this code more flexible, and less dependent. I'm working on it :)
You can use this code as base for your AJAXified emplementations or whatever. Have fun!

--

### Parts

The app has 3 modules:

1. **ajax** - simple emplementation of get and post asynchoronus functions
2. **dom** - dom updates happens here
3. **cache** - simple variable-based cache engine
