var GenderType = function(type, txt) {
	this.gender = type;
	this.genderText = txt;
};

var BooksListViewModel = function() {
	var self = this;
	self.myBooks = ko.observableArray([]);
	self.totalBooks = ko.observable(0);

	self.bookGenres = ko.observableArray(BOOK_GENRES_ARR);

	self.availableGenders = [
		new GenderType("", "-All-"),
		new GenderType("male", "Male"),
		new GenderType("female", "Female")
	];
	self.selectedAuthorGender = ko.observable(-1);
	self.selectedBookGenre = ko.observable(-1);

	self.authorNameOrder = 0;
	self.bookNameOrder = 0;

	self.authorGender = ko.observableArray(self.availableGenders);

	// Load initial state from server.
	$.getJSON(NO_FILTERS_GET_URL, function(myBooksJson) {
		self.myBooks(myBooksJson);
	});

	$.get(TOTAL_DOCS_GET_URL, function(numDocs) {
		self.totalBooks(numDocs);
	});

	self.scrolled = function(data, event) {
		var elem = event.target;
		if (elem.scrollTop > (elem.scrollHeight - elem.offsetHeight - 200)) {
			self.getItems(false);
		}
	};
	self.maxId = 0;
	self.pendingRequest = ko.observable(false);
	self.bookGenreFilter = "-1";
	self.authorGenderFilter = "-1";


	self.getItems = function(reset) {
		if (!self.pendingRequest()) {
			self.pendingRequest(true);

			var skip = "";
			if (reset) {
				self.myBooks([]);
			}
			skip =  "&sk=" + self.myBooks().length;

			var getNextContentUrl = BASE_GET_URL + skip;

			var queryFilter = "";
			var hasQuery = false;
			var multipleQuery = false;
			if (self.bookGenreFilter != "-1") {
				var find = ' ';
				var re = new RegExp(find, 'g');

				queryFilter = "{%22genre%22%3A%22" + encodeURIComponent(self.bookGenreFilter.replace(re, '_')) + "%22}";
				hasQuery = true;
			}
			if (self.authorGenderFilter != "-1") {
				var tmpGenderQuery = "{%22author.gender%22%3A%22" + self.authorGenderFilter.gender + "%22}";
				if (hasQuery) {
					multipleQuery = true;
					queryFilter = "{$and:%20[" + queryFilter + ",%20" + tmpGenderQuery + "]}";
				}
				else {
					hasQuery = true;
					queryFilter = tmpGenderQuery;
				}
			}
			if (hasQuery) {
				getNextContentUrl = getNextContentUrl + "&q=" + queryFilter;
			}

			var sortStr = "";

			if(self.authorNameOrder != 0) {
				sortStr = "&s={%22author.name%22:" + self.authorNameOrder + "}";
			}
			if(self.bookNameOrder != 0) {
				if(sortStr == "") {
					sortStr = "&s={%22name%22:" + self.bookNameOrder + "}";
				}
				else {
					sortStr = sortStr.substring(0, sortStr.length - 1);
					sortStr = sortStr + ", %22name%22:" + self.bookNameOrder + "}";
				}
			}
			if(sortStr != "") {
				getNextContentUrl = getNextContentUrl + sortStr;
			}

			$.getJSON(getNextContentUrl, function(myBooksJson) {
				self.myBooks($.merge(self.myBooks(), myBooksJson));
				self.pendingRequest(false);
			});

			var countUrl = getNextContentUrl + "&c=true";

			$.get(countUrl, function(numDocs) {
				self.totalBooks(numDocs);
			});
		}
	};

	self.bookGenreChanged = function(event) {
		self.bookGenreFilter = "-1";
		if(self.selectedBookGenre() != "-All-") {
			self.bookGenreFilter = self.selectedBookGenre();
		}
		self.getItems(true);
	};

    self.genderChanged = function(event) {
		self.authorGenderFilter = "-1";
		if(self.selectedAuthorGender() != "-All-") {
			self.authorGenderFilter = self.selectedAuthorGender();
		}
		self.getItems(true);
	};

	self.addAditionalCssClass = function (publishDate, bookGenre) {
		var cssClass = "";
		if (bookGenre.toLowerCase() == "horror") {
			//Only process if it is horror genre
			cssClass = self.getClassHorrorAndHalloweenDate(publishDate, bookGenre);
		}
		if (bookGenre.toLowerCase() == "business_&_economics") {
			//Only process if it is business & economics genre
			cssClass = self.getClassFinanceLastMonthFriday(publishDate, bookGenre);
		}

		return cssClass;
	};

    self.getClassHorrorAndHalloweenDate = function(publishDate, bookGenre) {
		if (publishDate.length > 4) {
			var tmpDate = new Date(publishDate);
			if (tmpDate.getMonth() == 9 && tmpDate.getDate() == 31 && bookGenre.toLowerCase() == "horror") {
				return "horror-halloween-date";
			}
		}
		return "";
    };

    self.getClassFinanceLastMonthFriday = function (publishDate, bookGenre) {
    	if (publishDate.length > 4) {
			var tmpDate = new Date(publishDate);
			var lastFriday = self.lastFridayForDate(tmpDate);

			if ( (tmpDate.getFullYear() == lastFriday.getFullYear() && tmpDate.getMonth() == lastFriday.getMonth() && tmpDate.getDate() == lastFriday.getDate()) && bookGenre.toLowerCase() == "business_&_economics") {
				return "last-friday-month-finance-date";
			}
		}
		return "";
    };

    self.lastFridayForDate = function (mDate) {
		var year = mDate.getFullYear();
		var month = mDate.getMonth();    //meant for july (based 0), reminder: js month based 0;
		var day = new Date(year, month + 1, 1);    //first day of next month (month based 0)
		var ddiff=(day.getDay() + 1) % 7 + 1;    //day difference to subtract
		var d_lastfriday = new Date(year, month + 1, 1 - ddiff);
		return d_lastfriday;
    };

	self.sortByBookTitle = function (item, event) {
		if (self.bookNameOrder == 0) {
			self.bookNameOrder = 1;
		}
		else {
			self.bookNameOrder *= -1;
		}

		var $clickedItem = $(event.target);
		$clickedItem.removeClass("no-sort");
		$clickedItem.removeClass("sort-asc");
		$clickedItem.removeClass("sort-desc");

		switch(self.bookNameOrder) {
			case 0:
				$clickedItem.addClass("no-sort");
				break;
			case 1:
				$clickedItem.addClass("sort-asc");
				break;
			case -1:
				$clickedItem.addClass("sort-desc");
				break;
			default:
				$clickedItem.removeClass("no-sort");
		}

		self.getItems(true);
	};

	self.sortByAuthor = function () {
		if (self.authorNameOrder == 0) {
			self.authorNameOrder = 1;
		}
		else {
			self.authorNameOrder *= -1;
		}

		var $clickedItem = $(event.target);
		$clickedItem.removeClass("no-sort");
		$clickedItem.removeClass("sort-asc");
		$clickedItem.removeClass("sort-desc");

		switch(self.authorNameOrder) {
			case 0:
				$clickedItem.addClass("no-sort");
				break;
			case 1:
				$clickedItem.addClass("sort-asc");
				break;
			case -1:
				$clickedItem.addClass("sort-desc");
				break;
			default:
				$clickedItem.removeClass("no-sort");
		}

		self.getItems(true);
	};

	self.clearFilters = function () {
		self.bookGenreFilter = "-1";
		self.selectedBookGenre("-All-");

		self.authorGenderFilter = "-1";
		self.selectedAuthorGender(self.availableGenders[0]);

		self.getItems(true);
	};

	self.clearSort = function () {
		self.authorNameOrder = 0;
		self.bookNameOrder = 0;

		$(".no-sort").removeClass("no-sort");
		$(".sort-asc").removeClass("sort-asc");
		$(".sort-desc").removeClass("sort-desc");

		self.getItems(true);
	};

}

ko.applyBindings(new BooksListViewModel());