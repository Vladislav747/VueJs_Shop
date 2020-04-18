<template>
    <div class="checkout__success">
        <p>Благодарим вам за заказ. Ваш заказ оформлен</p>
        <router-link to="/">
            <button class="shop-cart">Вернуться в каталог</button>
        </router-link>
    </div>
</template>

<script>

export default {
    name: "Checkout",

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
        
    },
    

    methods: {
      
        /**
         * Залогиниться задачи
         */
        async loginForm() {

            console.log((this.login, this.password),"loginForm");
            
            const db = firebase.firestore();
            const usersCollection = db.collection('users')
            var user;
            var password = this.password;

            usersCollection.where("login", "==", this.login)
            .get().then((docs)=>{
                docs.forEach(function (doc) {
                    user = doc.data();
                    console.log(user)
                    if(user.password == password){
                        console.log("Залогинен", "loginForm");
                        var loginedLocal = localStorage.getItem("isLogined");
                        console.log(loginedLocal, "loginedLocal");
                        if(!loginedLocal){
                            localStorage.setItem("isLogined", "true");
                            localStorage.setItem("userLogin", user.login);
                            // localStorage.setItem("boughtProducts", );
                        }

                    }else{
                        console.log("Ошибка с паролем", "loginForm");
                    }
                })
            })

             localStorage.setItem("isLogined", "true");
            localStorage.setItem("userLogin", this.login);

        },

        checkForm(){
            console.log()
        }
    }
}
</script>

<style lang="scss" scoped> 
@import "../scss/components/Checkout.scss";

</style>
