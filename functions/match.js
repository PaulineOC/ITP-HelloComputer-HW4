const LOVE_LANGUAGES = Object.freeze({
	WORDS_OF_AFFIRMATION: `WORDS_OF_AFFIRMATION`,
	QUALITY_TIME: `QUALITY_TIME`,
	PHYSICAL_TOUCH: `PHYSICAL_TOUCH`,
	ACTS_OF_SERVICE: `ACTS_OF_SERVICE`,
	RECEIVING_GIFTS: `RECEIVING_GIFTS`,
});

const loveLanguagesToJobs = Object.freeze({
	WORDS_OF_AFFIRMATION: [`lawyer`,`writer`,`teacher`],
	QUALITY_TIME: [`salesperson`,`actor`,`chef`],
	PHYSICAL_TOUCH: [`doctor`,`artist`,`professional athlete`],
	ACTS_OF_SERVICE: [`social worker`,`police officer`,`fire fighter`],
	RECEIVING_GIFTS: [`hedgefund manager`,`engineer`,`software developer`],
});

const TIME_OF_DAY = Object.freeze({
	MORNING: "MORNING",
	MIDDAY: "MIDDAY",
	EVENING: "EVENING",
	NIGHT: "NIGHT"
});


const timeOfDayToHobbies = Object.freeze({
	MORNING: ["foraging", "glass-blowing", "scuba diving", "bird watching"],
	MIDDAY: ["pyrography", "sky-diving", "bee-keeping", "gold-prospecting"],
	EVENING: ["puppetry", "lego building", "wine tasting", "palmistry"],
	NIGHT: ["taxidermy", "DJing", "twitch streaming", "journaling"],
});

const randomHobbies = [
	"competitive dog grooming",
	"geocaching",
	"beetle fighting",
	"amateur geology",
	"soap carving",
	"witchcraft",
];

const INDOORS = ["spa day", "fancy home-cooked meal", "movie marathon night"];
const OUTDOORS = ["romantic candlelit dinner in Paris", "spend the day in Disney", "day retreat upstate that includes apple-picking"];

const ALPHABET = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

module.exports = {
	LOVE_LANGUAGES,
	loveLanguagesToJobs,
	TIME_OF_DAY,
	timeOfDayToHobbies,
	randomHobbies,
	INDOORS,
	OUTDOORS,
	ALPHABET
};