/* Vraca niz displayed results koji je isti po svemu, osim sto ce knjiga sa 
pritisnutim favorite button imati "favorite: true" prop*/
function setFavoriteProp(displayedBooks, currentBook) {
  const newBooks = displayedBooks.map((displayedBook) => {
    if (displayedBook.id === currentBook.id) {
      return { ...displayedBook, favorite: !currentBook.favorite };
    }
    return displayedBook;
  });

  return newBooks;
}

export default setFavoriteProp;
