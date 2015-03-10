# Bookslist
Lists One million Books.

Inside the mybooks.zip you will find a JSON file with more than a million books entries. The data of the file where generated using: [Random Book JSON Generator](https://github.com/hugoruivo/randombookjsongenerator).

It is querying a Rest API to get books data ( 100 registers each time ). The mongodb is located at [mongolab](https://mongolab.com/).

The data is loaded by scrolling the list to the bottom.

Feel free to change this at your will ( can build your own API on your own server ), or try partial JSON file loading. ( One million register in a single shot where breaking things... ).

Clicking on the "Book Title:" column will sort the list by book name ( ASC or DESC ). Same goes with the "Book Author:" column.

You can apply two types of filters, by author gender ( male / female ) and by book genre.

To clear the filters click the clear filters button, in the same way click the clear sorts button to clear the sort order.

##Book JSON Format
```html
{
	"name":"Book Title",
	"author":
	{
		"name":"Author Name",
		"gender":"male or female"
	},
	"genre":"Book genre",
	"publish_date":"Date in format: yyyy-mm-dd"
}
```

##Setup
In the globals.js you find everything you need to setup things:
```html
//Change it to your own Rest api if needed
var BASE_URL = "https://api.mongolab.com/api/1/databases/";
//Change the mongodb name -> this is used by the BASE_URL
var DB = "library";
//Change the mongodb collection name -> this is used by the BASE_URL
var COLLECTION = "books";
//API_KEY -> it's the mongolab APIKEY, change to your needs.
var API_KEY = "NWtw3AMdRxfGN7iGTujH0Oh-HzrbEcwU";
//Controls the minimum number of entries to load each time
var MIN_ENTRIES_TO_LOAD = 100;
```
After that put all your content inside your http server and load it.

##Licence
This project is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License) so feel free to hack away :)
