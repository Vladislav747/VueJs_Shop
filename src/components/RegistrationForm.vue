<template>
    <div class="login-form__wrapper">
        <div class="form__inner form-container ui segment piled">
            <form 
                class="login-form ui form"
                @submit="checkForm"
                action="https://vuejs.org/"
                method="post"
            >

                <h1>{{title}}</h1>
                <div class="field">
                    <label 
                        for="form__login" 
                        style="text-transform: capitalize;">{{loginTitle}}
                    </label>
                    <input
                        name="form__login" 
                        id="form__login" 
                        v-model="login">
                    <p v-if="errors.login" class="error">Заполните {{loginTitle}}</p>
                </div>
                <div class="field">
                        <label 
                            for="form__pass" 
                            style="text-transform: capitalize;" >{{passwordTitle}}</label>
                        <input 
                            name="form__pass" 
                            id="form__pass" 
                            v-model="password">
                        <small 
                            v-if="errors.login" 
                            class="error">Заполните {{passwordTitle}}</small>
                </div>
               
                <div class="two fields form__controls">
                    <div class="form__btn field">
                        <router-link id="login-form" :to="{ name: 'login-form' }">
                            <input type="button" value="Назад" class="ui button secondary" style="margin-top: 20px;">
                        </router-link>                    
                    </div>
                    <div class="form__btn field">
                        <input 
                            type="button" 
                            value="Регистрация" 
                            class="ui button secondary"
                            @click.prevent="registerForm" 
                            style="margin-top: 20px;">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Noty from "noty";
import { showNoty, generateRandomSeed } from "../utility";
import {mapState, mapGetters, mapActions} from 'vuex'
import 'semantic-ui-css/semantic.min.css';
import firebase from 'firebase/app';

export default {
    name: "RegistrationForm",

    data() {
        return {
            title: "Регистрация",
            loginTitle: "Email (Логин)",
            passwordTitle: "Пароль",
            errors: [],
            login:"",
            password:"",
        };
    },

    computed: {
        // ...mapState({
        // checkoutStatus: 'checkoutStatus'
        // })
    },
    

    methods: {
      
        /**
         * Зарегистрироваться в системе
         */
        registerForm() {
           
            console.log((this.login, this.password),"registerForm");
            var seed = generateRandomSeed();
            

            var nowDate = new Date().toLocaleString('ru',
            {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            const db = firebase.firestore();
            const usersCollection = db.collection('users')

            usersCollection.doc('user_'+ seed).set({
                id_user: 'user_'+ seed,
                login: this.login,
                password: this.password,
                date_registered: nowDate,
            }).then(() =>{
                console.log("Успешно зарегистрирован")
                var loginedLocal = localStorage.getItem("isLogined");
                console.log(loginedLocal, "loginedLocal");
                if(!loginedLocal){
                    localStorage.setItem("isLogined", "true");
                }
            })
        },

        checkForm(){
            console.log()
        }
    }
}
</script>

<style lang="scss" scoped> 
    @import "../scss/components/RegistrationForm.scss";
</style>
