import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		name: '', 
		showNameModal: false, 
		charsPerMinute: 0, 
        wordsTotal: 0,
        correctWords: 0,
        timeLeft: 60
	},
	getters: {
		accuracy(state) {
	        if (state.wordsTotal == 0) { 
	          return 0;
	        } else {
	          return Math.round((state.correctWords / state.wordsTotal)*100);
	        }
	    }, 
	    exercise(state) {
	    	return `${state.exercise.join('\xa0')}`;
	    }, 
	},
	mutations: {
		manageNameModal(state) {
			state.showNameModal = !state.showNameModal;
		}, 
		setName(state, name) {
			state.name = name;
		}, 
		resetScore(state) {
			state.charsPerMinute = 0;
	        state.wordsTotal = 0;
	        state.correctWords = 0;
	        state.timeLeft = 60;
	        state.name = '';
	        state.showNameModal = false;
		}
	}
})