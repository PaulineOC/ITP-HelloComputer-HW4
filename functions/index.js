require('dotenv').config();

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const Sentiment = require('sentiment');
const random = require('random-name');
const words = require('categorized-words')

var axios = require("axios");

const { 
	LOVE_LANGUAGES,
	loveLanguagesToJobs,
	TIME_OF_DAY,
	timeOfDayToHobbies,
	randomHobbies,
	INDOORS,
	OUTDOORS,
	ALPHABET,
 } = require('./match.js');

var sentiment = new Sentiment();

const app = dialogflow();

app.intent("Default Welcome Intent", (conv) => {
	conv.ask("Thank you for contacting Cupid. How can I help you?");
});

app.intent("get_match", (conv, params) => {
	conv.data.name = params.name;
	conv.ask(
		`Nice to meet you, ${params.name}. Let's get started! 
		I'm going to ask you a series of questions to determine your ${params.match}.
		Question 1: What is your top love language?
	`);
});

app.intent("get_love_language", (conv, params) => {
	conv.data.loveLanguage = params.love_language;
	conv.ask(`
		Ahhh...Duly noted, ${conv.data.name}. 
		Okay, second question: "What is your favorite time of day?"
	`);
});

app.intent("get_favorite_time_of_day", async (conv, params) => {
	conv.data.timeOfDay = params.time_of_day;
	conv.data.favoriteSong = params.favorite_song;
	conv.data.loveAssociation = params.love_association; 

	const finalMatch = await findMatch(conv.data);
	conv.ask(`Ok. After some deliberation, I've found your perfect soulmate. ${finalMatch}`);
});

 const findMatch = (info) => {
 	const name = determineName();
 	const job = determineJob(info.loveLanguage);
	const hobby = determineHobby(info.timeOfDay);
	const date = determineDate(info.favoriteSong);
	//const favSong = await determineSong(info.loveAssociation);
	const adj = determineAdj(info.loveAssociation);

	return (`Their name is ${name}, and they're a ${job}. Their favorite hobbies are ${hobby}, and they would describe their life as ${adj}. Their idea of a perfect date is ${date}. You two are great for each other, you're welcome. Thanks for contacting me`);
};

const determineName = () => {
	return (`${random.first()} ${random.last()}.`);
}

const determineJob = (loveLanguage) => {
	let ind = Math.floor(Math.random() * 4);
	let hobbies = [];
	let job = ``;
	switch(loveLanguage){
		case "words_of_affirmation": 
			job = loveLanguagesToJobs["WORDS_OF_AFFIRMATION"][ind];
			break;
		case "quality_time": 
			job = loveLanguagesToJobs["QUALITY_TIME"][ind];
			break;
		case "physical_touch":
			job = loveLanguagesToJobs["PHYSICAL_TOUCH"][ind];
			break;
		case "acts_of_service":
			job = loveLanguagesToJobs["ACTS_OF_SERVICE"][ind];
		case "receiving_gifts":
			job = loveLanguagesToJobs["RECEIVING_GIFTS"][ind];
	}
	return job;
}

const determineHobby = (timeOfDay) => {
	let ind = Math.floor(Math.random() * 4);
	let hobbies = [];
	let hobby = ``;
	switch(timeOfDay){
		case "morning": 
			hobby = timeOfDayToHobbies["MORNING"][ind];
			break;
		case "midday": 
			hobby = timeOfDayToHobbies["MIDDAY"][ind];
			break;
		case "evening":
			hobby = timeOfDayToHobbies["EVENING"][ind];
			break;
		case "night":
			hobby = timeOfDayToHobbies["NIGHT"][ind];
	}
	const randHobby = randomHobbies[ind];
	return `${hobby} and ${randHobby}`
}

const determineDate = (favoriteSong) => {
	const sent = sentiment.analyze(favoriteSong);
	const ind = Math.floor(Math.random() * 3);
	if(sent.score <= 0){
		return INDOORS[ind];
	}
	return OUTDOORS[ind];
}

const determineAdj = (loveAssociation) => {
	const chars = loveAssociation.toLowerCase().split("");
	let sum = 0;
	for(let i = 0; i < chars.length; i++){
		sum += ALPHABET.indexOf(chars[i]) + 1;
	}
	sum *= chars.length;
	sum = sum > 14903 ? Math.floor(Math.random()*14903): sum;
	return words.A[sum];
};

//Doesn't work - keeps returning empty
const determineSong = async (loveAssociation) => {

	// const url= 
	// `https://api.musixmatch.com/ws/1.1/track.search?apikey=${process.env.MUSIX_MATCH_KEY}&q_track=${"roses"}&page=100&page=1`;
	// const { data } = await axios.get(url);

	// const allTracks = data.message.body;

	// //["track_list"]

	// return JSON.stringify(allTracks);
	
	//return allTracks[0]["track"];

	// const trackInd = Math.floor(Math.random() * allTracks.length);

	// const track = allTracks[trackInd]["track"];
	// const genres = track["primary_genres"]["music_genre_list"][0]["music_genre"]["music_genre_name"] || "Alternative";

	// return genres.toLowerCase();
};

exports.matchmaker = functions.https.onRequest(app);
