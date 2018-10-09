# Bubblink React App

Project 3 - CWRU Full-Stack Web Development Bootcamp
October 2018

Daniel Kelley, Brad Hersey, Joe Wancho, Melinda Russell, Rhonda Johnson

## Overview

MongoNewsScraper is a web app that lets users view and leave comments on the latest news from the New York Times.  
It incorporates Mongoose and Cheerio to scrape the website

Handlebars are used to generate the HTML.

# Link to deployed project
https://mongoscraper199.herokuapp.com/

# Links to GitHub
https://github.com/rmxjohnson/MongoNewsScraper.git

https://rmxjohnson.github.io/MongoNewsScraper/

# Built with:
 * Node.js
 * express NPM package
 * express-Handlebars
 * body-parser NPM Package
 * mongoose
 * request

## Home Page

![home.png](client/src/assets/images/home.png)

## "Login" Page

![login.png](client/src/assets/images/login.png)

## "SignUp" Page

![signup.png](client/src/assets/images/signup.png)

## "Profile" Page

![profile.png](client/src/assets/images/profile.png)

## "Community Chat" Page

![communitychat.png](client/src/assets/images/communitychat.png)



# Additional Features
 * Article headlines are unique - duplicates are not added to the database
 * Users can leave comments on articles that have been "saved"
 * Comments are saved to the database and associated with their corresponding articles
 * Users can delete comments left on articles
 * All stored comments are visible to every user
 * Users can select "Remove All Articles" to remove all article and comments from the database
