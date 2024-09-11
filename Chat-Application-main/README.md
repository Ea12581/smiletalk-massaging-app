Chat-Application
CS BIU 2023 2nd Semester Project in Advanced Programing 2:

to run the client:

open /chat/src

run npm install and then npm start

to run the server:

if you want to run the swagger server, open it's folder and run dotnet Chat.dll

if you want to run the node.js server, open server/src and run pm i express body-parser cors custom-env mongoose jsonwebtoken ws

then run npm start

also, start the database in /server/src with mongod

The App contains a register screen to register new users.

A log in screen for the users to log in.

And then a chat screen, with the ability to add contacts (by name).

To remove a chat, click the chat you want to remove, then press the 3 dots in the top right corrner of the conversation and then "delete chat".

Send messages to contacts, and switch between contacts pages.

From the chat screen, the user can log out back to the log in screen.

The data is saved in the database, and if the node.js is used, the data gets to the user via sockets even if he is idle

