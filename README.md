
## Welcome

This is a fullstack stock portfolio app.

With this project the users can sign up for accounts and then login to buy stocks,monitor their transactions and show a portfolio of stocks

Check it out at : https://stockport-ttp.herokuapp.com

## How to run 

The project is separated into client and server folders

### To run client:

Simply switch to the client folder from the root directory with 'cd client' and the run 'npm start'
This will boot the react app

### To run the backend:

Simply switch to the server folder from the root directory with 'cd server' and then run 'npm run dev'
This will spin up the express server

To run both:
Simply use the command "docker-compose up --build" from the root directory

## Technologies Used

The front end was built using React and and material UI.

The backend was built using node.js/express with data being stored with postgres and interacted with the sequelize orm.

Authentication is done using JWTs

The app runs in a docker container and hosted on Heroku

## Find and Buy stocks

Once logged in the user can search for a for a stock using it's ticker symbol. If the ticker symbol exists then it's price will
appear along with a text field to indicate the amount of shares you want.

After hitting buy the transaction begins. Using postgres transactions the backend will deduct the total from you balance if possible,
then add the stock to your portfolio and finally log the transaction. If any of these steps fail the transaction will be rolledback
and the user will be informed of the error.

## Audit stocks with your Portforlio

The user can audit their stocks with their portfolio. Each stock that you own is listed. The ticker , shares , total ,opening price , 
current price and profit (money made if you sold today).If the stock price is lower than it's open day price then the ticker 
displayed in red , green if higher and grey if unchanged.


## Transactions

This lists all of the transaction you have done so far. With a drop down list the each transaction is listed. It contains the ticker name
the shares, the total price , the cost per share and the date you did the transaction.


## Balance

Each account starts with $5000.00 and the total is changed when the user buys a stock.

## Features under development

The selling feature is currently under development. This will allow users to flip stocks and have their balance updated in order to
reflect the amount they sold for.

Fetching the stock should be tied with the buying feature in the backend. Currently, the frontend fetches the info then sends it over to
the backend.

The logout feature is currently only client side. To make it more robust the tokens should be 
blacklisted with redis using the ttl feature.

The token should be stored in a https-only cookie

The UI is very bland and will be improved.
