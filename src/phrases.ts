import { Phrases } from './types'

const phrases: Phrases = {
	// Information [Team]
	up: {
		// I got it!
		up: ['My ball bro.', "I said it's mine!", "I'm there.", 'Move aside.'],
		// Need boost!
		left: ['Tank is empty.', 'Boost total dropped to critical levels.', 'Why does the total say 0?', '12 boost and a dream.'],
		// All yours.
		right: ['All yours.', 'Your ball bro.', 'Keep chasing.', "You've got it."],
		// In position.
		down: ["I'm over here.", 'Pass the ball!', 'Right here!', 'Cross the ball!']
	},
	// Compliments
	left: {
		// Nice one!
		up: ['Nice one!'],
		// Great pass!
		left: ['Great pass!'],
		// Thanks!
		right: ['Thanks!'],
		// What a save!
		down: [
			'What an amazing save!',
			'This save was insane!',
			'Save! Save! Save!',
			'Incredible defence there.',
			'Saved by the keeper.',
			'Defended just in time.',
			'Saved the unsaveable!',
			'Well standing defense.',
			'Saved from the goal line!',
			'Too slow...'
		]
	},
	// Reactions
	right: {
		// Faking.
		up: [
			'What a whiff!',
			'Nice whiff.',
			'Whiff-Counter reached 100',
			'More whiffes than hits!',
			'Nearly touched it.',
			'Almost. Almost. Almost.',
			'That miss was incredible.',
			'What a miss!',
			'Not even close.',
			'I swear the car touched it.',
			'That was a ghost hit.',
			"It's not a whiff. It's a fake.",
			'A close miss is still a miss.',
			'Just off is still off.'
		],
		// Calculated.
		left: ['I save those.', 'Where is he going?', 'Where is the keeper?', 'The replay is under review.'],
		// Okay.
		right: [
			'Clearly a foul.',
			"That's clearly offside.",
			'The ref must be blind.',
			'The net was in the wrong place.',
			'The other net is smaller.',
			'Offside.',
			'That was just unlucky.',
			"It's in?",
			"That's not good.",
			'I did not calculate that!',
			'Has the game continued?',
			'Does that count?'
		],
		// Close one!
		down: ['What is the defender doing?', 'What is the keeper doing?', 'Did you see me on the replay?', 'I was on the replay!']
	},
	// Apologies
	down: {
		// My bad...
		up: ['My bad...'],
		// No problem.
		left: ['No problem.'],
		// Whoops...
		right: ['Whoops...'],
		// Sorry!
		down: ['Sorry!']
	}
}

export default phrases
