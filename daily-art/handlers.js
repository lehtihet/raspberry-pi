
const path = require('path');

const handleRootRequest = (req, res) => {

	const date = new Date();
	const todaysDate = path.join(
		date.getFullYear().toString(), 
		(date.getMonth()+1).toString(), 
		date.getDate().toString()); 

	const imagePath = path.join(todaysDate, 'image.jpg');
	const audioPath = path.join(todaysDate, 'audio_basic.mp3');
	
	res.render('index', { imagePath, audioPath});
};

module.exports = {
	handleRootRequest
}