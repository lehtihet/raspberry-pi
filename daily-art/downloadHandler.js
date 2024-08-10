const axios = require('axios');
const fs = require('fs');
const path = require('path'); 

function saveMedia(audio, fileName) {
	const date = new Date();
	const dirPath = path.join(
		'assets',
		date.getFullYear().toString(), 
		(date.getMonth()+1).toString(), 
		date.getDate().toString()); 

	if (!fs.existsSync(dirPath)) {
    	fs.mkdirSync(dirPath, { recursive: true });
    }

	fs.writeFile(path.join(dirPath, fileName), audio, (err) => {
		if (err) {
        	console.error('Error writing file:', err);
      	} else {
        	console.log(fileName, 'saved');
        }
    });
}

function getBasicAudio(message) {
	const url = 'https://cloudtts.com/api/get_audio';
 
	const payload = {
		rate: 1,
		volume: 1,
		text: message,
		voice: 'en-US-AvaNeural',
		with_speechmarks: false,
		recording: false
	};
 
	const headers = {
		'Content-Type': 'application/json',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
		'Accept': '*/*',
		'Origin': 'https://cloudtts.com',
		'Referer': 'https://cloudtts.com/u/index.html'
	};

	axios.post(url, payload, { headers })
  	.then(response => {
    	const audioBase64 = response.data.data.audio;
    	const audioData = Buffer.from(audioBase64, 'base64');
    	saveMedia(audioData, 'audio_basic.mp3');
    })
  	.catch(error => {
    	console.error(`Error: ${error.response ? error.response.status : error.message}`);
    });

}

function pickPaintingObject(source) {

	const imageBaseUrl = 'https://www.artic.edu/iiif/2';
	const imageUrlSuffix = 'full/1686,/0/default.jpg'

	if (!fs.existsSync(source)) {
    	console.error('Error: source directory not found');
    	return;
    }

	const files = fs.readdirSync(source).filter(f => f.endsWith('.json'));
	const file = files[Math.floor(Math.random() * files.length)];
	const imagePath = path.join(source, file);

	try {
		const data = fs.readFileSync(imagePath, 'utf8');
		const jsonData = JSON.parse(data);

		const title = jsonData.title;
		const artist = jsonData.artist_title;
		const description = jsonData.description.replace(/<[^>]*>/g, ''); // Clear description of HTML tags
		const image_id = jsonData.image_id;
		const message = title + ' by ' + artist + '. ' + description;

		axios.get(path.join(imageBaseUrl, image_id, imageUrlSuffix), {
			responseType: 'arraybuffer'
		})
  		.then(response => {
  			const imageBinary = response.data;
    		const imageData = Buffer.from(imageBinary, 'binary');
    		saveMedia(imageData, 'image.jpg');
    	})
  		.catch(error => {
    		console.error(`Error: ${error.response ? error.response.status : error.message}`);
    	});

  		const targetDir = path.join(source, '..', 'used');
  		if (!fs.existsSync(targetDir)) {
    		fs.mkdirSync(targetDir, { recursive: true });
    	}
    	fs.rename(imagePath, path.join(source, '..', 'used', file), (err) => {
    		if (err) throw err;
    		console.log('Artwork information file moved to used directory');
    	});

    	getBasicAudio(message);

	} catch (err) {
		console.error(err);
	}

}

function getImageAndAudio() {
	const sourceDir = path.join(__dirname, 'artworks_filtered', 'unused');
	pickPaintingObject(sourceDir);
}


module.exports = {
	getImageAndAudio
}

