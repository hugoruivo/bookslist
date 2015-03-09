var BASE_URL = "https://api.mongolab.com/api/1/databases/";
var DB = "library";
var COLLECTION = "books";
var API_KEY = "NWtw3AMdRxfGN7iGTujH0Oh-HzrbEcwU";
var MIN_ENTRIES_TO_LOAD = 100;

var NO_FILTERS_GET_URL = BASE_URL + DB + "/collections/" + COLLECTION + "?sk=0&l=" + MIN_ENTRIES_TO_LOAD + "&apiKey=" + API_KEY;
var BASE_GET_URL = BASE_URL + DB + "/collections/" + COLLECTION + "?l=" + MIN_ENTRIES_TO_LOAD + "&apiKey=" + API_KEY;

var TOTAL_DOCS_GET_URL = BASE_URL + DB + "/collections/" + COLLECTION + "?c=true&apiKey=" + API_KEY;

var BOOK_GENRES_ARR = ["-All-", "Business & Economics", "Asia", "Psychology", "Architecture", "Political Science", "Literary Criticism", "", "Social Science", "Science", "Health & Fitness", "Philosophy", "Education", "Language Arts & Disciplines", "History", "Art", "Computers", "Games", "Medical", "Performing Arts", "Cooking", "Feudalism", "Biography & Autobiography", "England", "Cookery", "Literary Collections", "Body, Mind & Spirit", "Music", "Drama", "Juvenile Fiction", "Fiction", "Technology & Engineering", "Humor", "Nature", "Religion", "Mathematics", "MEDICAL", "Sports & Recreation", "Law", "POLITICAL SCIENCE", "Reference", "Juvenile Nonfiction", "Voyages around the world", "Humanitarian assistance", "Non-Fiction", "Erotic", "Magic", "Speculative", "Epistolary", "Fantasy", "Romance", "Political", "Adventure", "Superhero", "Paranoid", "Saga", "Philosophical", "realism", "Mystery", "Historical", "Horror", "Comic", "Docufiction", "Thriller", "Urban", "Crime", "Satire", "Western"];

function Book(name, author, genre, publish_date) {
	this.name = name;
	this.author = author;
	this.genre = genre;
	this.publish_date = publish_date;
}
function Author(name, gender) {
	this.name = name;
	this.gender = gender;
}
