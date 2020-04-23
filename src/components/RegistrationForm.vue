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
                    <p v-if="errors.login" class="error">Заполните {{loginTitle}}</p>
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
                            v-model="password" 
                        />
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
                            type="submit" 
                            value="Регистрация" 
                            class="ui button secondary"
                            @click.prevent="registerForm" 
                            style="margin-top: 20px;">
                    </div>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
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
    
    methods: {
      
        /**
         * Зарегистрироваться в системе
         */
        registerForm() {

            var seed = generateRandomSeed();
            var nowDate = new Date().toLocaleString('ru',
            {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            const db = firebase.firestore();
            const usersCollection = db.collection('users')

            var loginUser = this.login;
            var passwordUser = this.password;
            
            usersCollection.where("login", "==", loginUser)
                .get().then((foundUsers)=>{
                    var user;
                    var result = foundUsers.docs.some(function (doc) {
                        user = doc.data();
                        console.log(user);
                        if(user.login == loginUser){
                            console.log("Такой пользователь уже есть "+ loginUser);
                            return true;
                        }
                    });
                    
                    if(!result){
                        var user = {
                            seed: seed,
                            login: loginUser,
                            password: passwordUser,
                            date: nowDate,
                        }
                        this.insertUsertoDatabase(user, 'users');
                    }
                    
                    
        
                })
        },

        checkForm(){
            console.log("checkForm");

        },

        insertUsertoDatabase(user, collectionName){
            const db = firebase.firestore();
            const collection = db.collection(collectionName);

            collection.doc('user_'+ user.seed).set({
                id_user: 'user_'+ user.seed,
                login: user.login,
                password: user.password,
                date_registered: user.date,
            }).then(() =>{
                console.log("Успешно зарегистрирован")
                var loginedLocal = localStorage.getItem("isLogined");
                console.log(loginedLocal, "loginedLocal");
                if(!loginedLocal){
                    localStorage.setItem("isLogined", "true");
                    localStorage.setItem("userLogin", user.login);
                }
            })
        },
    },
}

</script>

<style lang="scss" scoped> 
    @import "../scss/components/RegistrationForm.scss";
</style>
