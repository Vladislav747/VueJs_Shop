<template>
    <div class="login-form__wrapper">
        <div class="form__inner form-container ui segment piled">
            <b-form
                class="login-form ui form"
                @submit="checkForm"
                action="https://vuejs.org/"
                method="post"
            >
                <h1>{{title}}</h1>
                <div class="field">
                    <b-form-group
                        id="input-group-1"
                        :label="loginTitle"
                        label-for="form__login"
                        style="text-transform: capitalize;"
                    />

                    <b-form-input 
                        name="form__login"
                        type="email"
                        required
                        placeholder="Введите логин"
						autoComplete="current-password"
                        v-model="login" 
                    />

                    <p 
                        v-if="errors.login" 
                        class="error">Заполните {{loginTitle}}</p>
                </div>
                <div class="field">
                        <b-form-group
                            id="input-group-1"
                            :label="passwordTitle"
                            label-for="form__pass"
                            style="text-transform: capitalize;"
                        />
                        <b-form-input 
                            name="form__login"
                            type="password"
                            required
                            placeholder="Введите пароль"
							autoComplete="current-password"
                            v-model="password" />
                        <small 
                            v-if="errors.login" 
                            class="error">Заполните {{passwordTitle}}</small>
                </div>
                <div class="form__row">
                    <div class="form__link-reg">
                        <router-link id="register" :to="{ name: 'register' }">
                            <span class="link__reg" href="#">Регистрация</span>
                        </router-link>
                    </div>
                </div>
                <div class="field form__controls">
                    <div class="form__btn">
                        <input 
                            type="button" 
                            value="Логин"
                            @click="loginForm"
                            class="ui button secondary" 
                            style="margin-top: 20px;">
                    </div>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import firebase from 'firebase/app';
// import 'semantic-ui-css/semantic.min.css';

import { showNoty } from "@/helpers";
import {bus} from '@/helpers/bus.js'

export default {
	name: "LoginForm",

	data() {
		return {
			title: "Авторизация",
			loginTitle: "Логин",
			passwordTitle: "Пароль",
			errors: [],
			login:"",
			password:"",
		};
	},

	computed: {
		...mapState({
			checkoutStatus: 'checkoutStatus'
		})
	},


	methods: {		
		/**
		 * Залогиниться задачи
		 */
		async loginForm() {
			const db = firebase.firestore();
			const usersCollection = db.collection('users')
			var user;
			var password = this.password;
			usersCollection.where("login", "==", this.login)
				.get()
				.then((docs)=>{
					docs.forEach(function (doc) {
						user = doc.data();
						if (user.password === password){
							localStorage.setItem("isLogined", "true");
							localStorage.setItem("userLogin", user.login);
							localStorage.setItem("boughtItems", JSON.stringify(user.goods));

							showNoty("Поздравляю " + user.login + " вы успешно вошли", "success");
							bus.$emit('loginStatusChanged');

						} else {
							showNoty("Неверный пароль " + user.login + " попробуйте еще раз");
							throw new Error("Ошибка с паролем", "loginForm");
						}
					});
				});
		},
	}
}
</script>

<style lang="scss" scoped> 
@import "./LoginForm.scss";
</style>
