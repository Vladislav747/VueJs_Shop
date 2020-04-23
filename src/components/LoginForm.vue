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
                        id="form__login"
                        type="email"
                        required
                        placeholder="Введите логин"
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
                            id="form__login"
                            type="password"
                            required
                            placeholder="Введите пароль"
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
import { showNoty } from "../utility";
import {mapState, mapActions} from 'vuex'
import 'semantic-ui-css/semantic.min.css';
import firebase from 'firebase/app';

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

            // console.log((this.login, this.password),"loginForm");
            
            const db = firebase.firestore();
            const usersCollection = db.collection('users')
            var user;
            var password = this.password;

            usersCollection.where("login", "==", this.login)
            .get().then((docs)=>{
                docs.forEach(function (doc) {
                    user = doc.data();
                    // console.log(user)
                    if(user.password == password){
                        // console.log("Залогинен", "loginForm");
                            localStorage.setItem("isLogined", "true");
                            localStorage.setItem("userLogin", user.login);
                            localStorage.setItem("boughtItems", JSON.stringify(user.goods));
                        

                    }else{
                        console.log("Ошибка с паролем", "loginForm");
                        
                    }
                })
            })

        },

        checkForm(){
            
        }
    }
}
</script>

<style lang="scss" scoped> 
@import "../scss/components/LoginForm.scss";

</style>
