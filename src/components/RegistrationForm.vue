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
                    <label for="form__login" style="text-transform: capitalize;">{{loginTitle}}</label>
                    <input name="form__login" id="form__login" v-model="login">
                    <p v-if="errors.login" class="error">Заполните {{loginTitle}}</p>
                </div>
                <div class="field">
                        <label for="form__pass" style="text-transform: capitalize;" >{{passwordTitle}}</label>
                        <input name="form__pass" id="form__pass" v-model="password">
                        <small v-if="errors.login" class="error">Заполните {{passwordTitle}}</small>
                </div>
               
                <div class="two fields form__controls">
                    <div class="form__btn field">
                        <router-link id="login-form" :to="{ name: 'login-form' }">
                            <input type="button" value="Назад" class="ui button secondary" style="margin-top: 20px;">
                        </router-link>                    
                    </div>
                    <div class="form__btn field">
                        <input type="button" value="Регистрация" class="ui button secondary" style="margin-top: 20px;">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Noty from "noty";
import { showNoty } from "../utility";
import {mapState, mapGetters, mapActions} from 'vuex'
import 'semantic-ui-css/semantic.min.css';

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
        ...mapState({
        checkoutStatus: 'checkoutStatus'
        })
    },
    

    methods: {
      
        /**
         * Залогиниться задачи
         */
        async loginForm() {
            

        },

        checkForm(){
            console.log()
        }
    }
}
</script>

<style lang="scss" scoped> 


.login-form__wrapper{

    width: 100vw;
    min-height: 100vh;
    padding: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .form__inner{
        padding: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 450px;
        width: 30vw;

        .login-form{
            width: 20vw;

            input + p.error{
                color:red;
            }   

            .form__btn{
                display: flex;
                justify-content: center;
                align-items: top;
            }
        }

      
    }


    

}

</style>
