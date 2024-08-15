class Book {
    constructor(name) {
        this.name = name;
        this.rankScore = 0;
    }
}

class BookRanking {
    constructor(books) {
        this.books = books;
        this.currentIndex = 0;
        this.currentPair = [0, 1];
    }

    compareBooks(choiceIndex) {
        const [book1Index, book2Index] = this.currentPair;
        if (choiceIndex === 0) {
            this.books[book1Index].rankScore++;
        } else {
            this.books[book2Index].rankScore++;
        }
        this.nextComparison();
    }

    nextComparison() {
        const [book1Index, book2Index] = this.currentPair;
        if (book2Index < this.books.length - 1) {
            this.currentPair[1]++;
        } else if (book1Index < this.books.length - 2) {
            this.currentPair[0]++;
            this.currentPair[1] = this.currentPair[0] + 1;
        } else {
            this.showResults();
        }
        this.updateQuestion();
    }

    updateQuestion() {
        if (this.currentPair[0] < this.books.length - 1) {
            document.getElementById('question').innerText = `Which book do you like better: ${this.books[this.currentPair[0]].name} or ${this.books[this.currentPair[1]].name}?`;
            document.getElementById('option1').innerText = this.books[this.currentPair[0]].name;
            document.getElementById('option2').innerText = this.books[this.currentPair[1]].name;
        }
    }

    showResults() {
        const sortedBooks = this.books.sort((a, b) => b.rankScore - a.rankScore);
        const resultList = document.getElementById('result-list');
        sortedBooks.forEach(book => {
            const listItem = document.createElement('li');
            listItem.innerText = book.name;
            resultList.appendChild(listItem);
        });
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const books = [
        new Book("Harry Potter and the Philosopher's Stone"),
        new Book("Harry Potter and the Chamber of Secrets"),
        new Book("Harry Potter and the Prisoner of Azkaban"),
        new Book("Harry Potter and the Goblet of Fire"),
        new Book("Harry Potter and the Order of the Phoenix"),
        new Book("Harry Potter and the Half-Blood Prince"),
        new Book("Harry Potter and the Deathly Hallows")
    ];

    const bookRanking = new BookRanking(books);

    document.getElementById('start-button').addEventListener('click', () => {
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('question-container').style.display = 'block';
        bookRanking.updateQuestion();
    });

    document.getElementById('option1').addEventListener('click', () => {
        bookRanking.compareBooks(0);
    });

    document.getElementById('option2').addEventListener('click', () => {
        bookRanking.compareBooks(1);
    });
});