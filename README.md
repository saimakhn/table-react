This repository contains source code of a react based single page application.
It implements rendering static data in tabular format.

## Features

### Sorting
User can sort individual columns in ascending as well as descending format
* Ticket - albhabetically
* Price - Numeral
* Asset Class - User customised(Equities, Macro, Credit)


## Implementations
* Reusable Error page Component: Data is currently served from a local JSON, but keeping in mind future scope of enhancement API call is used to fetch data. In case of any faliure user error page is displayed
* Reusable loader Component
* Negative Price field is highlighted in red
* Green rows indicate Credit , Blue for Equities and Macros in white
* UI is responsive to width - 250 


## Getting started

### Prerequisites

1. Git
1. Node
1. npm

## Installation
In order to use this application follow below steps  
```
git clone   

cd table-react

npm install 

npm start

```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.