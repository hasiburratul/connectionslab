export const shuffle = (cards) => {
	//function to shuffle cards array
	for (let i = cards.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
	}
};