# Bookslist
Lists One million Books.

Inside the mybooks.zip you will find a JSON file with more than a million books entries. The data of the file where generated using: [Random Book JSON Generator](https://github.com/hugoruivo/randombookjsongenerator).

It is querying a Rest API to get books data ( 100 registers each time ). The mongodb is located at [mongolab](https://mongolab.com/).

Feel free to change this at your will ( can build your own API on your own server ), or try partial JSON file loading. ( One million register in a single shot where breaking things... ).

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

##Licence
This project is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License) so feel free to hack away :)
