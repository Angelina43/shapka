Vue.component('user', {
    data() {
        return {
            login_user: {
                username: ''
            }
        };
    },

    template: `
    <div>
      <input placeholder="Логин" type="text" id="login" v-model="login_user.username">
      
      <button type="submit" @click="user_login">Войти</button>
    </div>
    `,

    methods: {
        user_login() {
            if (this.login_user.username) {
                this.login_user.id = Date.now();
                this.$emit('user_login', this.login_user);
            }
        }
    }
})

Vue.component('millionaire', {
    props: {
        users: {
            type: Array
        }
    },

    data() {
        return {
            message: "Приветствую на нашем шоу, в котором, мы проверим твои знания в сфере 'Электроника'! Желаю тебе удачи друг!",
            questionIndex: 0,
            questions: [
                {
                    question: 'Кто создал радио?',
                    answers: ['Александр Попов', 'Альберт Эйнштейн', 'Никола Тесла', 'Томас Эдисон'],
                    correctAnswerIndex: 0,
                    number: 1
                },
                {
                    question: 'Сколько ватт в розетке?',
                    answers: ['150', '220', '300', '100'],
                    correctAnswerIndex: 1,
                    number: 2
                },
                {
                    question: 'Кто придумал самый первый электричество?',
                    answers: ['Томас Эдисон', 'Шуйлер Уилер', 'Александр Попов', 'А. Вольта'],
                    correctAnswerIndex: 3,
                    number: 3
                },
                {
                    question: 'Когда была создана электрическая лампочка?',
                    answers: ['1879 году', '1900 году', '1838 году', '1850 году'],
                    correctAnswerIndex: 2,
                    number: 4
                },
                {
                    question: 'Кто изобрел первую электрическую лампочку?',
                    answers: ['Томас Эдисон ', 'Никола Тесла', 'Павел Яблочков', 'Жозефом Нисефором'],
                    correctAnswerIndex: 0,
                    number: 5
                },
            ],
        }
    },

    computed: {
        question() {
            return this.questions[this.questionIndex].question;
        },
        answers() {
            return this.questions[this.questionIndex].answers;
        },
        number() {
            return this.questions[this.questionIndex].number
        }
    },

    template: `
    <div>  
        <div class="polosa1"></div>
        <div class="polosa2"></div>
        <div class="polosa3"></div>
        <div class="polosa4"></div>
        <div class="polosa5"></div>
        <div class="polosa6"></div>
        
        <div class="questionBorder"></div>
        <div class="answerBorder"></div>
        
        <h1 class="question" >{{ question }}</h1>
        <p class="number">{{ number }}</p>
        
        <div class="robot_shadow"></div>        
        <div class="robot"></div>
        <div class="message"><p class="textMenu">{{message}}</p></div>
        
        <div class="alphabet">
            <div>A:</div>
            <div>C:</div>
            <div>B:</div>
            <div>D:</div>
        </div>
        
        <div class="answer">
            <div   v-for="(answer, index) in answers" :key="index" @click="checkAnswer(index)"> {{ answer }}</div>
        </div>
        
        <div class="raiting">
            <div v-for="(user, index) in users">
                    <div>
                        <p>{{user.username}}</p>
                        <p>{{user.score}}</p>
                    </div>
            </div>
        </div>
        
    </div>
`,
    methods: {
        checkAnswer(answerIndex) {
            this.questionIndex++;
            this.nextQuestion();
        },

        nextQuestion() {
            if (this.questionIndex === this.questions.length) {
                console.log(1)
            }
        }
    },
})

let app = new Vue({
    el: '#app',
    data: {
        users: [
            {
                id: 1,
                username: 'Shapka',
                score: 13
            },
            {
                id: 2,
                username: 'Ghost',
                score: 666
            }
        ],
        username: null,
        score: 0,
        buff_id: 0,
    },

    methods: {
        login(loginData){
            this.users.forEach(user => {
                if(user.username === loginData.username) {
                    console.log(user.id)
                }
            })
        }
    }
})

// loginUser(loginData) {
//     this.users.forEach(user => {
//         if (user.login === loginData.login && user.password === loginData.password) {
//             this.userLoginFormOn = false;
//             this.topBarOn = true;
//             this.userLogin = true;
//         }
//     });
// },