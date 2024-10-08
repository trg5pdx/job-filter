# Job Filter

A web app for filtering job listings to find relevant jobs. This app pulls from
other job sites, and allows for the user to filter out jobs that aren't as 
relevant to them. The site provides a link to the original posting on the job 
site so the user can apply on there.

## How to Install

For this project, you need npm and git installed on your machine.

To run it, pull the repository using git, then move into the new directory,
install all dependencies needed, and then run the software to get the react
server up and running.

```
git clone https://github.com/trg5pdx/job-filter
cd job-filter
npm i
npm run dev
```

Afterwards, the program should print out where the web app is hosted, which by
default should be `http://localhost:5173`

## About this Project

I've been looking for jobs for a while and I've been frustrated by the lack of
filtering controls from job board sites, so I wanted to create something that
would allow for me to parse the job listings and find jobs that better fit my
skills and experience and filter out the ones I'm less interested in. 

## Todo

- [ ] Get the search query to actually send a query to the related job sites,
      and then filter based on their settings
- [x] Add a search field for filtering based on industry
- [x] Filter out punctuation that ends up as code and replace it with the
      appropriate punctuation
  - [ ] Support hexadecimal codes
- [x] HTML sanitized and displayed correctly within a card
- [ ] Parse the job postings and pull information like YOE from them
  - [ ] Add a YOE field into the search form
- [ ] Save searches into the users browser so they can go back to them later
- [ ] Add controls that allow users to block companies from the results
  - [ ] Add controls for blocking out specific industries form a search
  - [ ] Save the blocked companies into the users browser, and allow for them
        to manage the block list and remove companies/industries as needed
- [ ] Clean up code style and making naming scheme for functions, classes,
      vars, etc. consistent (I've been using camel case and underscores
      interchangably, oops)
- Long term:
  - [ ] Maybe build a backend and database and have the backend make the
        requests, and save the results in the database to prevent job listings
        from getting processed again when another user has that job listing in
        their query
  - [ ] Allow users to sign in using Google, Github, etc. and save their
        settings to their account so they can access it on other computers
  - [ ] Group together the same posts from other job boards to remove duplicate
        posts

## Credits

- Thank you to [Jobicy](https://jobicy.com/) for making their API public, that
  has made starting this project much easier
