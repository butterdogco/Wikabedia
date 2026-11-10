# What's Wikabedia?

hi

Wikabedia is an open-source and free online enyclopedia. Anyone can post articles onto Wikabedia.

## How it works

When you post an article using the article creator page on our website, it sends it to our API which then adds your article to a Google Sheet. Then, when you view an article, the same API is used to get data from that sheet. Why Google Sheets? Our website used to rely on Google Forms for posting articles, where then we would manually go through responses and create their page on Wikabedia. Then, we switched to using Google's APIs to read from that sheet to avoid manually creating article pages.
