

# Accent - A MERN app based on a platform for creators

Accent is a platform for creators. It uses MERN stack along with add-ons like Firebase, Redux, etc., to provide an interactive platform to creators to share their posts and explore other creators <br>

### Demo: https://accentapp.netlify.app/home

<br>
<br>

## Key Features

<br>

Upload your accents, as well as edit and delete them. <br>
Like, comment and save a creators accents. <br>
Edit your profile information like username, name, bio, profile picture <br>
Add a donation page link as a creator to enable your followers to send you tips! <br>
Search up other creators by their usernames or first names. <br>
View all your saved accents. <br>
Naive users won't be able to right-click and save your image nor drag the image to a new tab to open it. Also screenshots are useless because a watermark is applied on every accent with the creators username. <br>
Fully responsive - can be viewed on desktops, laptops, tablets as well as smartphones. <br>

<br>

## User Interfaces and Screens

<br>

- ### Authentication Pages

  - Login Page <br>
    <br>
    ![login-page](https://i.imgur.com/zja3gdp.png)
    <br>
    <br>

  - Registration Page <br>
    <br>
    ![resgistration-page](https://i.imgur.com/aJGprVs.png)
    <br>
    <br>

- ### Homepage

  - After successful login, the user is greeted with the Homepage <br>
    <br>
    ![homepage](https://i.imgur.com/skyQ19b.png)
    <br>
    <br>

  - The left panel has the user's profile card and their followers <br>
    <br>
    ![leftpanel](https://i.imgur.com/RzB9LLw.png)
    <br>
    <br>

  - The user has the choice to select the type of feed they want to see.

    - "Following" - Feed only shows accents by creators whom the user follows as well as the user's posts. This is selected by default if the user follows atleast one creator.
    - "Popular" - Feed shows the most popular accents based on the number of likes. This is selected by default when the user does not follow anyone.
    - "Newest" - Feed shows the most recent posts first <br>
      <br>
      ![feedtype](https://i.imgur.com/m6c9diS.png)
      <br>
      <br>
      <br>

  - The Navbar has the logo on the left, the nav links in the middle and the upload button on the right as well as the options of settings and logout can be viewed on clicking the profile icon.<br>
    <br>
    ![navbar](https://i.imgur.com/rzykX8v.png)
    <br>
    <br>

  - Post Card - Each post card has the post image, the username and buttons for liking and saving the post. The edit option is also available for the post's created by the user themselves.

    - Other creator's Accent
      <br>
      <br>
      ![postcard](https://i.imgur.com/rCWBMAi.png)
      <br>
      <br>

    - Current user's Accent with update and delete options when clicked
      <br>
      <br>
      ![userpostcard](https://i.imgur.com/MKDNw42.png)
      <br>
      <br>

    - Edit Modal
      <br>
      <br>
      ![editmodal](https://i.imgur.com/XetQxkC.png)<br><br>
    - Delete Modal <br><br>
      ![deletemodal](https://i.imgur.com/95NkVn0.png) <br><br>

- ### Search Page

  - Users can search for other creators using their username, firstname or lastname.<br><br>
    ![searchpage](https://i.imgur.com/Prh84dy.png)<br><br><br>

- ### Saved Page

  - Users can view their saved accents from this page<br><br>
    ![savedpage](https://i.imgur.com/GutgHKy.png)<br><br><br>

- ### Profile Page

  - Users can view their posts, followers and following on this page<br><br>
    ![profilepage](https://i.imgur.com/aYdPl9l.png)<br><br><br>

- ### Upload Page

  - Users can upload their accents on this page<br><br>
    ![uploadpage](https://i.imgur.com/NpKAsQo.png)<br><br><br>

- ### Setting Page
  - Users can change their account settings on this page<br><br>
    ![settingspage](https://i.imgur.com/PtU5rC1.png)<br><br><br>

<br><br>

## Tech Stack

<br>

1. `Figma` - UI Design
2. `React` - Entire Frontend
3. `Redux Toolkit` - State Management
4. `Node & Express` - Backend Server
5. `MongoDB` - Database for users' and accents' data
6. `Firebase Storage` - CDN for Accent images
7. `JWT` - Authentication
8. `Netlify` - Frontend App Hosting
9. `Cyclic` - Backend Server Hosting

<br><br>
