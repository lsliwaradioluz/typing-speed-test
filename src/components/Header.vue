<template>
	<div class="header">
      <div class="test-score-group">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12 title">
              TEST PRĘDKOŚCI PISANIA
            </div>
            <div class="col-md-4 words-per-minute">
              <div class="number">
                {{ this.$store.state.correctWords }}
              </div>
              <div class="caption">
                SŁOWA/MIN
              </div>
            </div>
            <div class="col-md-4 chars-per-minute">
              <div class="number">
                {{ this.$store.state.charsPerMinute }}
              </div>
              <div class="caption">
                ZNAKI/MIN
              </div>
            </div>
            <div class="col-md-4 accuracy">
              <div class="number">
                {{ accuracy }}
              </div>
              <div class="caption">
                DOKŁADNOŚĆ %
              </div> 
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 offset-md-4 time-left">
              <div class="number">
                {{ this.$store.state.timeLeft }}
              </div>
              <div class="caption">
                SEKUND
              </div>
            </div>
          </div>
          <transition name="fade">
            <div class="row button-container" v-if="this.$store.state.timeLeft == 0">
              <div class="col-md-4 offset-md-2 button text-center" @click="emmitResetTest">
                Powtórz test
              </div>
              <div class="col-md-4 button text-center" @click="manageNameModal">
                Zapisz wynik
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
	export default {
		computed: {
			accuracy() {
				return this.$store.getters.accuracy;
			}
		}, 
		methods: {
			manageNameModal() {
		    	this.$store.commit('manageNameModal');
		    }, 
			emmitResetTest() {
				this.$root.$emit('resetTest');
			}
		}
	};
</script>

<style scoped>
	.header {
    padding-top: 5vh;
    height: 55vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    background: linear-gradient(90deg, #fceb2f, #ff7590);
  }

  .test-score-group {
    width: 30vw;
    text-align: center;
  }

  .test-score-group .title {
    text-align: center;
    font-size: 2.5rem;
    font-family: 'Dosis', sans-serif;
    padding-bottom: 2vh;
    color: rgb(234, 42, 67);
    letter-spacing: -2px;
    animation: blur 3s infinite;
  }

  .test-score-group .number {
    color: white;
    font-size: 3rem;
  }

  .test-score-group .caption {
    color: white;
    padding-bottom: 2vh;
    font-size: 0.9rem;
  }

  .button-container {
    color: white;
    padding-top: 2vh;
  }

  .button {
    cursor: pointer;
    border: 1px solid white;
    padding: 1vh 0;
    transition: all 0.1s ease-in;
  }

  .button:hover {
    border: 1px solid #ff7590;
    color: #ff7590;
  }
</style>