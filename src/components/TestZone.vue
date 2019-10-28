<template>
	<div class="test-zone" @keydown="disableKeys">
    <div class="test-input-group">
      <div class="testedWords" ref="testedWords">
      </div>
      <div class="input" spellcheck="false" ref="input" @keypress="checkTyping" @keydown.delete="removeChars" :contenteditable="contenteditable">
      </div>
    </div>
    <div class="typedText" @click="focusInput">
      {{ wordsToBeTested }}
    </div>
  </div>
</template>

<script>
	import randomWords from 'random-words'

	export default {
		data() {
			return {
				exercise: randomWords(10),
				deletedChars: '',
        remainingChars: '',
        interval: 0, 
        nextWordLength: 0, 
        lastCharCorrect: false, 
        contenteditable: true
			}
		},
		computed: {
			wordsToBeTested() {
				return `${this.exercise.join('\xa0')}`;
			}
		},
		methods: {
			focusInput() {
        this.$refs.input.focus();
      },
      runTime() {
        this.interval = setInterval(() => {
          this.$store.state.timeLeft --
          if (this.$store.state.timeLeft == 0) {
            clearInterval(this.interval);
            this.contenteditable = false;
          }
        }, 1000);
      },
			removeChars() {
        setTimeout(() => {
          let input, goal;
          input = this.$refs.input.innerHTML.replace(/&nbsp;/g,'');
          goal = `${this.deletedChars}${this.exercise[0]}`;

          if (input == goal) {
            this.exercise = this.exercise.slice(1);
            this.remainingChars = '';
            this.exercise.unshift(this.remainingChars);
            this.deletedChars = input;
            this.$refs.input.style.textDecoration = 'none';
            this.lastCharCorrect = true;
          } else if (goal.includes(input) && goal.length > input.length && this.deletedChars != '') {
            if (this.lastCharCorrect == true) {
              this.exercise = this.exercise.slice(1);
              this.remainingChars = this.deletedChars.split("").reverse()[0] + this.remainingChars;
              this.exercise.unshift(this.remainingChars);
              this.deletedChars = input;
            }
            this.$refs.input.style.textDecoration = 'none';
            this.lastCharCorrect = true;
          } else if (!goal.includes(input)) {
            this.$refs.input.style.textDecoration = 'line-through';
          } 
        });
      },
      checkTyping(event) {
        if (this.interval == 0) this.runTime();
        if (this.nextWordLength == 0) this.nextWordLength = this.exercise[0].length;
        this.$refs.input.style.textDecoration = 'none';
        
        setTimeout(() => {
          let input, goal, passed;
          input = this.$refs.input.innerHTML.replace(/&nbsp;/g,'').replace(/ /g, '');
          goal = `${this.deletedChars}${this.exercise[0]}`;
          passed = this.$refs.testedWords.innerHTML;

          if (event.code == 'Space') {
            if (input != goal) {
              this.$refs.testedWords.innerHTML = passed + '<span class="crossed-span">' + input + '</span>&nbsp;&nbsp;';
              this.updateScore(false);
            } else if (input == goal) {
              this.$refs.testedWords.innerHTML = passed + '<span>' + input + '</span>&nbsp;&nbsp;';
              this.updateScore(true);
            }

            this.$refs.input.innerHTML = '';
            this.deletedChars = '';
            this.exercise = this.exercise.slice(1);
            this.exercise.push(randomWords());
          } else {
            if (goal.includes(input) && goal[0] == input [0]) {
              this.lastCharCorrect = true;
              if (this.exercise[0][0] != undefined) this.deletedChars += this.exercise[0][0];
              this.remainingChars = this.exercise[0].slice(1);
              this.exercise = this.exercise.slice(1);
              this.exercise.unshift(this.remainingChars);
            } else {
              this.$refs.input.style.textDecoration = 'line-through';
              this.lastCharCorrect = false;
            }
          }
        })
      }, 
      updateScore(isSuccessfull) {
        if (isSuccessfull) {
          this.$store.state.charsPerMinute += this.nextWordLength;
          this.$store.state.correctWords++
        } 
        this.nextWordLength = this.exercise[1].length;
        this.$store.state.wordsTotal++
      }, 
      disableKeys(event) {
        if (event.key == 'Enter') {
          event.preventDefault();
        } else if (event.code == 'Space' && this.$refs.input.innerHTML.length == 0) {
          event.preventDefault();
        }
      }, 
      resetTest() {
        this.$refs.input.innerHTML = '';
        this.$refs.testedWords.innerHTML = '';
        this.exercise = randomWords(10);
        this.interval = 0; 
        this.deletedChars = '';
        this.remainingChars = '';
        this.contenteditable = true;
        this.$store.commit('resetScore');
      }, 
		}, 
		mounted() {
			this.focusInput();
			this.$root.$on('resetTest', () => {
				this.resetTest();
			});
		}
	};
</script>

<style>
	 
	.test-zone {
		display: flex;
	}

	.test-input-group {
		height: 10vh;
		width: 50vw;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.test-input-group .input {
		height: 10vh;
		min-width: 1px;
		flex-shrink: 0;
		line-height: 6vh;
		padding: 2vh 0;
		outline: none;
		text-align: right;
		font-family: 'Merriweather', serif;
		font-size: 2rem;
		color: #ff7590;
		overflow: hidden;
		white-space: nowrap;
	}

  .crossed-span {
    text-decoration: line-through;
  }

	.testedWords {
		white-space: nowrap;
	}

	.testedWords span {
		font-family: 'Merriweather', serif;
		font-size: 2rem;
		color: #ff7590;
		line-height: 6vh;
		padding: 2vh 0;
	}

	.typedText {
		height: 10vh;
		width: 50vw;
		line-height: 6vh;
		padding: 2vh 0;
		background-color: white;
		font-family: 'Merriweather', serif;
		font-size: 2rem;
		white-space: nowrap;
		overflow-x: hidden; 
		cursor: text;
	}
</style>