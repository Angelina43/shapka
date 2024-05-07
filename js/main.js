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

//Викторина
Vue.component('millionaire', {
    props: {
        users: {
            type: Array
        },
        number_mini_game: {
            type: Number
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
    <div class="body_millionaire">  
        <div class="polosa1"></div>
        <div class="polosa2"></div>
        <div class="polosa3"></div>
        <div class="polosa4"></div>
        <div class="polosa5"></div>
        <div class="polosa6"></div>
        
        <div class="questionBorder"></div>
        <div class="answerBorder"></div>
        
        <h1 class="question_millionaire" >{{ question }}</h1>
        <p class="number">{{ number }}</p>
        
        <div class="robot_shadow"></div>        
        <div class="robot"></div>
        <div class="message_millionaire"><p class="textMenu_millionaire">{{message}}</p></div>
        
        <div class="alphabet">
            <div>A:</div>
            <div>C:</div>
            <div>B:</div>
            <div>D:</div>
        </div>
        
        <div class="answer_millionaire">
            <div   v-for="(answer, index) in answers" :key="index" @click="checkAnswer(index)"> {{ answer }}</div>
        </div>
    </div>
`,
    methods: {
        checkAnswer(answerIndex) {
            this.questionIndex++;

            if (this.questionIndex === this.questions.length) {
                this.$emit('score_plus', this.number_mini_game);
            }
        },
    },
})

//Термины
Vue.component('terms', {
    data() {
        return {
            termin: [
                {
                    question: 'Электрический ток',
                    number: '1',
                    isOtvet1: false,
                },
                {
                    question: 'Явления природы',
                    number: '2',
                    isOtvet1: false,
                },
                {
                    question: 'Географическая карта',
                    number: '3',
                    isOtvet1: false,
                },
                {
                    question: 'Борная, лимонная, моющие средства',
                    number: '4',
                    isOtvet1: false,
                },
                {
                    question: 'Бактерии, грибы, растения, животные',
                    number: '5',
                    isOtvet1: false,
                },
            ],

            puma: [
                {
                    answer: 'Направленный поток электронов',
                    number: '1',
                    isOtvet2: false,
                },
                {
                    answer: 'Живое и неживое',
                    number: '2',
                    isOtvet2: false,
                },
                {
                    answer: 'Изображение земной поверхности на плоскости',
                    number: '3',
                    isOtvet2: false,
                },
                {
                    answer: 'Кислоты и щелочи',
                    number: '4',
                    isOtvet1: false,
                },
                {
                    answer: 'Царства живой природы',
                    number: '5',
                    isOtvet1: false,
                },
            ],
            firstCard: null,
            secondCard: null,
            message: "",
            cardIndex: 0,
        }
    },
    template: `
    <div class="body_terms">
        <div class="Hafanana">       
             <div class="column">
                <div class="termin" v-for="(ter, id) in termin" :id=id :key="termin.number" @click="dog(id)" :class="{ 'otvet1': ter.isOtvet1 }">
                    <p class="question_terms">{{ ter.question }}</p>
                </div>
            </div>
            <div class="column">
                <div class="puma" v-for="(pum, id) in puma" :id="id" :key="pum.number" @click="cat(id)" :class="{ 'otvet2': pum.isOtvet2 }">
                    <p class="answer_terms">{{ pum.answer }}</p>
                </div>
            </div>
            <div class="robot_shadow"></div>
            <div class="robot"></div>
            <div class="message_terms"><p class="textMenu_terms">{{message}}</p></div>          
        </div>
    </div>
    `,
    methods: {
        dog(id) {
            if (this.firstCard == null) {
                this.$set(this.termin[id], 'isOtvet1', true);
                this.firstCard = this.termin[id].number
            } else {
                this.message = "Вы уже выбрали термин, пожалуйста, выберите ответ"
            }
        },
        cat(id) {
            if (this.secondCard == null) {
                this.$set(this.puma[id], 'isOtvet2', true);
                this.secondCard = this.puma[id].number;
            }

            if (this.firstCard === this.secondCard) {
                this.message = "Ура! Вы ответили правильно!"
                this.firstCard = null
                this.secondCard = null
                this.cardIndex++

                setTimeout(() => {
                    this.message = 'Привет! Ой, кажется листики порвались! Помоги, пожалуйста, соединить их!'
                }, 2000)

                this.nextQuestion()
            } else {
                this.secondCard = null
                this.message = "К сожалению, вы не правы, попробуйте еще раз найти правильный ответ"
                setTimeout(() => {
                    this.$set(this.puma[id], 'isOtvet2', false);
                }, 1000)
            }
        },
        nextQuestion() {
            if (this.cardIndex === 5) {
                this.$emit('score_plus', this.number_mini_game);
            }
        },
    },

    mounted() {
        this.termin.sort(() => Math.random() - 0.5);
        this.puma.sort(() => Math.random() - 0.5);

        this.message = 'Привет! Ой, кажется листики порвались! Помоги, пожалуйста, собрать их!'
    }
})

//Планеты
Vue.component('planets', {
    data() {
        return {
            poryadokPlanet: [],
            pravylnyPoryadokPlanet: ["sun", "merkury", "venus" ,"earth", "mars", "jupiter", "saturn", "uran", "pluto"],
            moveSun: false,
            blackSun: false,
            moveMerkury: false,
            blackMerkury: false,
            moveVenus: false,
            blackVenus: false,
            moveEarth: false,
            blackEarth: false,
            moveMars: false,
            blackMars: false,
            moveJupiter: false,
            blackJupiter: false,
            moveSaturn: false,
            blackSaturn: false,
            moveUran: false,
            blackUran: false,
            movePluto: false,
            blackPluto: false,
            sunClickable: true,
            merkuryClickable: true,
            venusClickable: true,
            earthClickable: true,
            marsClickable: true,
            jupiterClickable: true,
            saturnClickable: true,
            uranClickable: true,
            plutoClickable: true,
            message: ''
        }
    },
    template: `
        <div class="body_planets">
            <div class="sun" @click="sunClick" :class="{ moveSun }" @mouseover="thisSun()"></div>
            <div :class="{ blackSun }"></div>
            <div class="merkury" @click="merkuryClick" :class="{ moveMerkury }" @mouseover="thisMerkury()"></div>
            <div :class="{ blackMerkury }"></div>
            <div class="venus" @click="venusClick" :class="{ moveVenus }" @mouseover="thisVenus()"></div>
            <div :class="{ blackVenus }"></div>
            <div class="earth" @click="earthClick" :class="{ moveEarth }" @mouseover="thisEarth()"></div>
            <div :class="{ blackEarth }"></div>
            <div class="mars" @click="marsClick" :class="{ moveMars }" @mouseover="thisMars()"></div>
            <div :class="{ blackMars }"></div>
            <div class="jupiter" @click="jupiterClick" :class="{ moveJupiter }" @mouseover="thisJupiter()"></div>
            <div :class="{ blackJupiter }"></div>
            <div class="saturn" @click="saturnClick" :class="{ moveSaturn }" @mouseover="thisSaturn()"></div>
            <div :class="{ blackSaturn }"></div>
            <div class="uran" @click="uranClick" :class="{ moveUran }" @mouseover="thisUran()"></div>
            <div :class="{ blackUran }"></div>
            <div class="pluto" @click="plutoClick" :class="{ movePluto }" @mouseover="thisPluto()"></div>
            <div :class="{ blackPluto }"></div>
            <button @click="proverka" class="proverka" value="проверить">Проверить</button>
            
            <div class="robot_shadow"></div>
            <div class="robot"></div>
            
            <div class="message_planets"><p class="textMenu_planets">{{message}}</p></div>
        </div>
    `,
    methods: {

        sunClick() {
            this.positionSun();
            this.sunWasClicked();
        },

        positionSun() {
            this.moveSun = !this.moveSun
            this.poryadokPlanet.push('sun')

            if(this.poryadokPlanet[0] === 'sun') this.blackSun = true
        },

        sunWasClicked() {
            this.sunClickable = false
        },

        thisSun() {
            this.message = 'Солнце'

            setTimeout(() => {
                this.message = 'Привет! Ой, кажется все планеты потерялись в Космосе! Помоги, пожалуйса, расставить их по местам!'
            }, 3000)
        },

        merkuryClick() {
            this.positionMerkury();
            this.merkuryWasClicked()
        },

        positionMerkury() {
            this.moveMerkury = !this.moveMerkury
            this.poryadokPlanet.push('merkury');

            if(this.poryadokPlanet[1] === 'merkury') this.blackMerkury = true
        },

        merkuryWasClicked() {
            this.merkuryClickable = false
        },

        thisMerkury() {
            this.message = 'Меркурий'

            setTimeout(() => {
                this.message = 'Привет! Ой, кажется все планеты потерялись в Космосе! Помоги, пожалуйса, расставить их по местам!'
            }, 3000)
        },

        venusClick() {
            this.positionVenus();
            this.venusWasClicked()
        },

        positionVenus() {
            this.moveVenus = !this.moveVenus
            this.poryadokPlanet.push('venus');

            if(this.poryadokPlanet[2] === 'venus') this.blackVenus = true
        },

        venusWasClicked() {
            this.venusClickable = false
        },

        thisVenus() {
            this.message = 'Венера'

            setTimeout(() => {
                this.message = 'Привет! Ой, кажется все планеты потерялись в Космосе! Помоги, пожалуйса, расставить их по местам!'
            }, 3000)
        },

        earthClick() {
            this.positionEarth();
            this.earthWasClicked()
        },

        positionEarth() {
            this.moveEarth = !this.moveEarth
            this.poryadokPlanet.push('earth');

            if(this.poryadokPlanet[3] === 'earth') this.blackEarth = true
        },

        earthWasClicked() {
            this.earthClickable = false
        },

        thisEarth() {
            this.message = 'Земля'

            setTimeout(() => {
                this.message = 'Привет! Ой, кажется все планеты потерялись в Космосе! Помоги, пожалуйса, расставить их по местам!'
            }, 3000)
        },

        marsClick() {
            this.positionMars();
            this.marsWasClicked()
        },

        positionMars() {
            this.moveMars = !this.moveMars
            this.poryadokPlanet.push('mars');

            if(this.poryadokPlanet[4] === 'mars') this.blackMars = true
        },

        marsWasClicked() {
            this.marsClickable = false
        },

        thisMars() {
            this.message = 'Марс'

            setTimeout(() => {
                this.message = 'Привет! Ой, кажется все планеты потерялись в Космосе! Помоги, пожалуйса, расставить их по местам!'
            }, 3000)
        },

        jupiterClick() {
            this.positionJupiter();
            this.jupiterWasClicked()
        },

        positionJupiter() {
            this.moveJupiter = !this.moveJupiter
            this.poryadokPlanet.push('jupiter');

            if(this.poryadokPlanet[5] === 'jupiter') this.blackJupiter = true
        },

        jupiterWasClicked() {
            this.jupiterClickable = false
        },

        thisJupiter() {
            this.message = 'Юпитер'

            setTimeout(() => {
                this.message = 'Привет! Ой, кажется все планеты потерялись в Космосе! Помоги, пожалуйса, расставить их по местам!'
            }, 3000)
        },

        saturnClick() {
            this.positionSaturn();
            this.saturnWasClicked()
        },

        positionSaturn() {
            this.moveSaturn = !this.moveSaturn
            this.poryadokPlanet.push('saturn');

            if(this.poryadokPlanet[6] === 'saturn') this.blackSaturn = true
        },

        saturnWasClicked() {
            this.saturnClickable = false
        },

        thisSaturn() {
            this.message = 'Сатурн'

            setTimeout(() => {
                this.message = 'Привет! Ой, кажется все планеты потерялись в Космосе! Помоги, пожалуйса, расставить их по местам!'
            }, 3000)
        },

        uranClick() {
            this.positionUran();
            this.uranWasClicked()
        },

        positionUran() {
            this.moveUran = !this.moveUran
            this.poryadokPlanet.push('uran');

            if(this.poryadokPlanet[7] === 'uran') this.blackUran = true
        },

        uranWasClicked() {
            this.uranClickable = false
        },

        thisUran() {
            this.message = 'Уран'

            setTimeout(() => {
                this.message = 'Привет! Ой, кажется все планеты потерялись в Космосе! Помоги, пожалуйса, расставить их по местам!'
            }, 3000)
        },

        plutoClick() {
            this.positionPluto();
            this.plutoWasClicked()
        },

        positionPluto() {
            this.movePluto = !this.movePluto
            this.poryadokPlanet.push('pluto');

            if(this.poryadokPlanet[8] === 'pluto') this.blackPluto = true
        },

        plutoWasClicked() {
            this.plutoClickable = false
        },

        thisPluto() {
            this.message = 'Плутон'

            setTimeout(() => {
                this.message = 'Привет! Ой, кажется все планеты потерялись в Космосе! Помоги, пожалуйса, расставить их по местам!'
            }, 3000)
        },

        proverka() {
            if (this.moveSun === true && this.moveMerkury === true && this.moveVenus === true &&
                this.moveEarth === true && this.moveMars === true && this.moveJupiter === true &&
                this.moveSaturn === true && this.moveUran === true && this.movePluto === true) {

                if (this.poryadokPlanet.join() === this.pravylnyPoryadokPlanet.join()) {
                    window.location.replace("../index.html");
                    document.location.href='../index.html'
                } else {

                    if(this.poryadokPlanet[0] === 'sun') this.blackSun = false
                    if(this.poryadokPlanet[1] === 'merkury') this.blackMerkury = false
                    if(this.poryadokPlanet[2] === 'venus') this.blackVenus = false
                    if(this.poryadokPlanet[3] === 'earth') this.blackEarth = false
                    if(this.poryadokPlanet[4] === 'mars') this.blackMars = false
                    if(this.poryadokPlanet[5] === 'jupiter') this.blackJupiter = false
                    if(this.poryadokPlanet[6] === 'saturn') this.blackSaturn = false
                    if(this.poryadokPlanet[7] === 'uran') this.blackUran = false
                    if(this.poryadokPlanet[8] === 'pluto') this.blackPluto = false

                    this.moveSun = !this.moveSun
                    this.moveMerkury = !this.moveMerkury
                    this.moveVenus = !this.moveVenus
                    this.moveEarth = !this.moveEarth
                    this.moveMars = !this.moveMars
                    this.moveJupiter = !this.moveJupiter
                    this.moveSaturn = !this.moveSaturn
                    this.moveUran = !this.moveUran
                    this.movePluto = !this.movePluto
                    this.poryadokPlanet = []

                    this.sunClickable = true
                    this.merkuryClickable = true
                    this.venusClickable = true
                    this.earthClickable = true
                    this.marsClickable = true
                    this.jupiterClickable = true
                    this.saturnClickable = true
                    this.uranClickable = true
                    this.plutoClickable = true
                }
            }
        },

        menu() {
            console.log(1)
        }
    },

    mounted() {
        this.message = 'Привет! Ой, кажется все планеты потерялись в Космосе! Помоги, пожалуйса, расставить их по местам!'
    }

})

//Точки
Vue.component('point', {
    data() {
        return {
            massive: [
                {item: 1, class: 1},
                {item: 2, class: 1},
                {item: 3, class: 2},
                {item: 4, class: 2},
                {item: 5, class: 3},
                {item: 6, class: 3},
                {item: 7, class: 4},
                {item: 8, class: 4},
            ],

            isOne: false,
            isOne1: false,
            isTwo: false,
            isTwo1: false,
            isThree: false,
            isThree1: false,
            isFour: false,
            isFour1: false,
            isFive: false,
            isFive1: false,
            isSix: false,
            isSix1: false,
            isSeven: false,
            isSeven1: false,
            isEight: false,
            isEight1: false,

            massiveIndex: 0,
        }
    },

    template: `
<div>
    <div class="body_point"> 
        <div class="massive1" @click=but(id) v-for="(elem, id) in massive" :id=id :key="elem.item">
                <div v-if="elem.item === 1">{{ elem.item }}</div> 
                <div v-if="elem.item === 2">{{ elem.item }}</div>
                <div v-if="elem.item === 3">{{ elem.item }}</div>
                <div v-if="elem.item === 4">{{ elem.item }}</div>
                <div v-if="elem.item === 5">{{ elem.item }}</div>
                <div v-if="elem.item === 6">{{ elem.item }}</div>
                <div v-if="elem.item === 7">{{ elem.item }}</div>
                <div v-if="elem.item === 8">{{ elem.item }}</div>
        </div>
        
        <div class="block" v-if="this.isOne && this.isOne1"></div>
        <div class="block1" v-if="this.isTwo && this.isTwo1"></div>
        <div class="block2" v-if="this.isThree && this.isThree1"></div>
        <div class="block3" v-if="this.isFour && this.isFour1"></div>
        <div class="block4" v-if="this.isFive && this.isFive1"></div>
        <div class="block5" v-if="this.isSix && this.isSix1"></div>
        <div class="block6" v-if="this.isSeven && this.isSeven1"></div>
        <div class="block7" v-if="this.isEight && this.isEight1"></div>
        </div>
        
        <div class="robot_shadow"></div>
        <div class="robot"></div>
</div>     

`,
    methods: {
        but(id) {
            let number = this.massive[id]

            if (number.class === 1 && number.item === 1) {
                this.isOne = true
                this.massiveIndex++
            }

            if (number.class === 1 && number.item === 2) {
                this.isOne1 = true
                this.isTwo = true
                this.massiveIndex++
            }

            if (number.class === 2 && number.item === 3) {
                this.isTwo1 = true
                this.isThree = true
                this.massiveIndex++
            }


            if (number.class === 2 && number.item === 4) {
                this.isThree1 = true
                this.isFour = true
                this.massiveIndex++
            }

            if (number.class === 3 && number.item === 5) {
                this.isFour1 = true
                this.isFive = true
                this.massiveIndex++
            }

            if (number.class === 3 && number.item === 6) {
                this.isFive1 = true
                this.isSix = true
                this.massiveIndex++
            }

            if (number.class === 4 && number.item === 7) {
                this.isSix1 = true
                this.isSeven = true
                this.massiveIndex++
            }


            if (number.class === 4 && number.item === 8) {
                this.isSeven1 = true
                this.isEight = true
                this.massiveIndex++
            }

            if (number.class === 1 && number.item === 1) {
                this.isEight1 = true
                this.massiveIndex++
            }

            this.nextPage()
        },
        nextPage() {
            if (this.massiveIndex > this.massive.length) {
                console.log(1)
            }
        }
    },
})

//Опрос
Vue.component('survey', {
    data() {
        return {
            questionIndex: 0,
            answerIndex: 0,
            questions: ['What is the capital of France?', 'What is the capital of Russia?'],
            answer: [['Paris', 'paris'], ['Moscow', 'moscow']],
            correctAnswer: null,
            message: null,
        }
    },

    computed: {
        question() {
            return this.questions[this.questionIndex].question;
        },
        answers() {
            return this.questions[this.questionIndex].answers;
        }
    },

    template: `
    <div class="survey">
        <h1>{{ questions[questionIndex] }}</h1>
            <input  v-model="correctAnswer" placeholder="введите ответ" v-on:keyup.enter="submitAnswers">
        <p>Введённое сообщение: {{ correctAnswer }}</p>
        <p v-if="message_survey">{{message}}</p>
    </div>
`,
    methods: {
        submitAnswers() {

            let currentQuestion = this.questions[this.questionIndex];
            let currentAnswer = this.answer[this.questionIndex];

            if(this.correctAnswer === null){
                this.message = 'Заполните поле для ответа'
            }
            setTimeout(() => {
                this.message = null
            }, 1000)

            if (this.correctAnswer.toLowerCase() === currentAnswer[0] || this.correctAnswer.toLowerCase() === currentAnswer[1]) {
                this.correctAnswer = ""

                this.questionIndex++;

                this.answerIndex++;

                this.nextQuestion();
            } else {
                this.message = "неправильный овтет"
            }
            setTimeout(() => {
                this.message = null
            }, 1000)
        },

        nextQuestion() {
            if (this.questionIndex === this.questions.length) {
                console.log(1)
            }
        }
    },
})

//Робот
Vue.component('robot', {
    data() {
        return {
            position: {
                x: 115,
                y: 740
            },
            step: 40,
            border: null,
        }
    },

    computed: {
        blockStyle() {
            return {
                position: 'absolute',
                width: '50px',
                height: '50px',
                background: 'blue',
                top: `${this.position.y}px`,
                left: `${this.position.x}px`,
                'z-index': 2,

            };
        },
    },

    template: `
   <div>

    <div ref="block" :style="blockStyle"></div>
    <button @click="moveBlock('up')">Вверх</button>
    <button @click="moveBlock('down')">Вниз</button>
    <button @click="moveBlock('left')">Влево</button>
    <button @click="moveBlock('right')">Вправо</button>
    <button @click="resetPosition">Назад</button>
  </div>
`,
    methods: {
        moveBlock(direction) {
            switch (direction) {
                case 'up':
                    if (this.position.y > this.polosa.top + 50) {
                        this.position.y -= this.step;
                    }

                    if (this.position.x === 515) {
                        if (this.position.y > this.polosa2.top + 50) {
                            this.position.y -= this.step;
                        }
                    }
                    if (this.position.x === 875) {
                        if (this.position.y > this.polosa3.top + 30) {
                            this.position.y -= this.step;
                        }
                    }
                    break;

                case 'down':
                    if (this.position.y < this.polosa.bottom - 55) {
                        this.position.y += this.step;
                    }
                    if(this.position.x === 875){
                        if (this.position.y > this.polosa3.top + 185) {
                            this.position.y -= this.step;
                        }
                    }
                    break;

                case 'left':

                    if (this.position.x > this.polosa.left + 15) {
                        this.position.x -= this.step;
                    }

                    if(this.position.y === 660) {
                        if (this.position.x < this.polosa1.left - 10){
                            this.position.x += this.step;
                        }
                    }

                    if(this.position.y === 380){
                        if (this.position.x < this.polosa2.left){
                            this.position.x += this.step;
                        }
                    }

                    if(this.position.y === 220){
                        if (this.position.x > this.polosa3.left + 20) {
                            this.position.x -= this.step;
                        }
                        else {
                            console.log(1)
                        }
                    }
                    break;

                case 'right':
                    if(this.position.y === 500) {
                        if (this.position.x < this.polosa.right - 100) {
                            this.position.x += this.step;
                        }
                    }
                    if(this.position.y === 660){
                        if (this.position.x < this.polosa1.right - 90){
                            this.position.x += this.step;
                        }
                    }
                    if (this.position.y === 380) {
                        if (this.position.x < this.polosa3.right - 70){
                            this.position.x += this.step;
                        }
                    }
                    if (this.position.y === 220) {
                        if (this.position.x < this.polosa3.right - 80){
                            this.position.x += this.step;
                            console.log(this.position.x)
                            console.log(this.polosa3.right - 80)
                        }
                    }
                    break;
            }
        },
        resetPosition() {
            this.position.x = 115;
            this.position.y = 740;
        }
    },

    mounted() {

        let start = document.createElement("div");
        start.classList.add("start");
        document.body.append(start);
        this.start = start.getBoundingClientRect()

        let finish = document.createElement("div");
        finish.classList.add("finish");
        document.body.append(finish);
        this.finish = finish.getBoundingClientRect()

        let polosa = document.createElement("div");
        polosa.classList.add("polosa");
        document.body.append(polosa);
        this.polosa = polosa.getBoundingClientRect()

        let polosa1 = document.createElement("div");
        polosa1.classList.add("polosa1");
        document.body.append(polosa1);
        this.polosa1 = polosa1.getBoundingClientRect()

        let polosa2 = document.createElement("div");
        polosa2.classList.add("polosa2");
        document.body.append(polosa2);
        this.polosa2 = polosa2.getBoundingClientRect()

        let polosa3 = document.createElement("div");
        polosa3.classList.add("polosa3");
        document.body.append(polosa3);
        this.polosa3 = polosa3.getBoundingClientRect()

        let polosa5 = document.createElement("div");
        polosa5.classList.add("polosa5");
        document.body.append(polosa5);
        this.polosa5 = polosa5.getBoundingClientRect()
    }
})

//Задача на JS
Vue.component('task', {
    data() {
        return {
            userCode: '', // Хранит код, введенный пользователем
            savedCode: `let i = 0 i++ console.log(i)`, // Пример сохраненного кода
            comparisonResult: null // Результат сравнения кодов (null - по умолчанию)
        }
    },
    template: `
        <div>
        <!-- Текстовое поле для ввода кода -->
    <textarea v-model="userCode" placeholder="Введите ваш JavaScript код сюда..."></textarea>
    
    <!-- Кнопка для сравнения кода -->
    <button @click="compareCode">Сравнить код</button>
   

    <!-- Результат сравнения -->
    <div v-if="comparisonResult !== null">
      <h2>Результат сравнения:</h2>
      <p v-if="comparisonResult">Коды совпадают!</p>
      <p v-else>Коды не совпадают.</p>
    </div>
  </div>
        </div>
    `,
    methods: {
        compareCode() {
            // Убедимся, что коды не пусты
            if (this.userCode.trim() === '' || this.savedCode.trim() === '') {
                alert('Введите код для сравнения');
                return;
            }

            // Сравним введенный пользователем код с сохраненным
            const cleanedUserCode = this.userCode.trim().replace(/\s+/g, '');
            const cleanedSavedCode = this.savedCode.trim().replace(/\s+/g, '');

            if (cleanedUserCode === cleanedSavedCode) {
                this.comparisonResult = true; // Коды совпадают
                console.log(1)
            } else {
                this.comparisonResult = false; // Коды не совпадают
            }
        }
    },
})

//Меню
Vue.component('menu_mini_games', {
    data() {
        return {
        }
    },
    template: `
    <div class="body_menu_mini_games">
        <div class="button_menu_mini_games">
            <button @click="go_to_terms">Термины</button>
            <button @click="go_to_point">Соединение по точка</button>
            <button @click="go_to_millionaire">Миллионер</button>
            <button @click="go_to_planets">Планеты</button>
            <button @click="go_to_survey">Опросник</button>
            <button @click="go_to_robot">Робот по линии</button>
            <button @click="go_to_task">Задача на Java Script</button>
        </div>
    </div>
    `,
    methods: {
        go_to_millionaire(){
            this.$emit('go_to_millionaire', this.number_mini_game);
        },
        go_to_terms(){
            this.$emit('go_to_terms', this.number_mini_game);
        },
        go_to_planets(){
            this.$emit('go_to_planets', this.number_mini_game);
        },
        go_to_point(){
            this.$emit('go_to_point', this.number_mini_game);
        },

        go_to_survey(){
            this.$emit('go_to_survey', this.number_mini_game);
        },

        go_to_robot(){
            this.$emit('go_to_robot', this.number_mini_game);
        },

        go_to_task(){
            this.$emit('go_to_task', this.number_mini_game);
        },
    }
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
        number_mini_game: 0,
    },

    methods: {
        login(loginData){
            this.users.forEach(user => {
                if(user.username === loginData.username) {
                    console.log(user.id)
                }
            })
        },

        plus(){
            this.number_mini_game += 1
            console.log(this.number_mini_game)
        },

        terms(){
            this.number_mini_game = 1
        },

        point(){
            this.number_mini_game = 2
        },

        millionaire(){
            this.number_mini_game = 3
        },

        planets(){
            this.number_mini_game = 4
        },

        survey(){
            this.number_mini_game = 5
        },

        robot(){
            this.number_mini_game = 6
        },

        task(){
            this.number_mini_game = 7
        },
    },
})