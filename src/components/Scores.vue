<template>
	<div class="score-table">
    <ul class="list">
      <li style="margin-bottom: 3%">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              IMIĘ
            </div>
            <div class="col-md-3">
              ZNAKI/MIN
            </div>
            <div class="col-md-3">
              SŁOWA/MIN
            </div>
            <div class="col-md-3">
              DOKŁ. %
            </div>
          </div>
        </div>
      </li>
      <li class="list-item" v-for="score in scores">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              {{ score.name }}
            </div>
            <div class="col-md-3">
              {{ score.characters }}
            </div>
            <div class="col-md-3">
              {{ score.words }}
            </div>
            <div class="col-md-3">
              {{ score.accuracy }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				scores: [], 
			}
		},
		methods: {
			sortScores() {
        function sortNumber(a, b) {
          if (b.characters == a.characters) {
            return b.accuracy - a.accuracy;
          } else {
            return b.characters - a.characters;
          }
        } 
        this.scores.sort(sortNumber);
      },
			renderScore() {
        this.$http.get('')
          .then(response => {
            this.scores = Object.values(response.data);
            this.sortScores();
            if (this.scores.length > 20) {
              this.scores = this.scores.slice(0, 20);
            }
          })
      },
      addScore() {
        const data = {
          name: this.$store.state.name, 
          words: this.$store.state.correctWords,
          characters: this.$store.state.charsPerMinute, 
          accuracy: this.$store.getters.accuracy
        };

        this.$http.post('', data)
          .then(response => {
            this.renderScore();
            this.$root.$emit('resetTest');
          });
      },
		}, 
		mounted() {
      this.renderScore();
      this.$root.$on('addScore', () => {
      	this.addScore();
      });
    }
	};
</script>

<style scoped>
	
	.score-table {
    width: 30vw;
    height: 100vh;
    padding: 1% 0;
    position: fixed;
    left: 0;
    top: 0;
    background-color: black;
    color: white;
    transform: translateX(-30vw);
    transition: 0.5s ease-in-out;
  }

  .score-table::after {
    width: 3vw;
    height: 10vh;
    content: "Wyniki";
    writing-mode: vertical-rl;
    position: absolute;
    right: -3vw;
    top: 20vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .score-table:hover {
    transform: translateX(0);
  }
</style>