<template>
	<div class="modal-container">
        <div class="modal-body">
          <div class="close-modal-button" @click="manageNameModal"><i class="fas fa-times"></i></div>
          <h3>Wpisz swoje imię:</h3>
          <input v-model="name" ref="nameInput">
          <div class="alert" :style="{ visibility: alert }">Imię musi mieć co najmniej jedną literę</div>
          <button class="btn btn-success" @click="emmitAddScore">Zapisz wynik</button>
        </div>
      </div>
</template>

<script>
	export default {
		data() {
			return {
				alert: 'hidden'
			}
		},
		computed:{
			name: {
				set(name) {
					this.$store.commit('setName', name);
				}, 
				get() {
					return this.$store.state.name;
				}
			}
		},
		methods: {
			manageNameModal() {
				this.$store.commit('manageNameModal');
			},
			emmitAddScore() {
				if (this.$store.state.name == '') {
					this.alert = 'visible';
				} else {
					this.$root.$emit('addScore');
				}
				
			}
		},
		mounted() {
			this.$refs.nameInput.focus();
		}
	};
</script>

<style scoped>
	
	.modal-container {
		background: rgba(0, 0, 0, 0.7);
		transition: opacity 0.3s ease;
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-body {
		background-color: white;
		border: 1px solid black;
		width: 30%;
		height: 30%;
		flex-grow: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.modal-body input {
		text-align: center;
		border: none;
		outline: none;
		margin: 5%;
	}

	.close-modal-button {
		margin-right: 5px;
		position: absolute;
		top: 0;
		right: 0;
		color: black;
		cursor: pointer;
	}

	.alert {
		color: red;
		margin: 0;
	}

</style>