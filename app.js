const express = require("express");
const app = express();

// --роутінг у додатку
const myRouter = require("./my-router");

// Вбудуємо власне проміжне ПЗ у наш файл app.js перед викликом статики.
app.use((req, res, next) => {
  console.log("Наше проміжне ПЗ");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
// http://localhost:3000/

// Додамо обробник маршруту contact
// app.get("/contact", (req, res) => {
//   res.send("<h1>Contact page</h1>");
// });

//  http://localhost:3000/contact

// Додаток видає відповідь “Hello World!” у браузері на запити, адресовані кореневому URL (/) або маршруту. Для всіх інших шляхів відповіддю буде статус 404 - Not Found.
// Для обробки запитів, маршрутів, у Express визначено ряд вбудованих функцій. Маршрутизація визначає, як ваш додаток відповідає на клієнтський запит до конкретної адреси – URL.
// Визначення маршруту, згідно з документацією, має таку структуру:

// app.METHOD(PATH, HANDLER)

// Де:
// app — це екземпляр express програми.
// METHOD -— метод запиту HTTP (GET, POST, PUT, PATCH, DELETE).
// PATH —- шлях на сервері, у нашому випадку це корінь сайту '/'.
// HANDLER —- функція, що виконується при зіставленні маршруту.
// У нашому випадку функція HANDLER - колбек, приймає два параметри, об'єкт запиту req і об'єкт відповіді res.
// Для запуску сервера викликається метод app.listen(), до якого передається номер порту.

// коли надходить запит, Express зіставляє запитану адресу з кожним із маршрутів. При збігу маршруту викликається його функція обробник. Але визначення маршрутів, крім простих рядків, можуть також містити регулярні вирази чи спеціальні символи підстановок. Зокрема, ми можемо використовувати такі символи, як ?, +, * и ().

// Символ ? у маршруті вказує, що попередній символ може зустрічатися 1 раз або відсутній. Наведений нижче шлях маршруту зіставляє cotact та contact.
// app.get("/con?tact", (req, res) => {
//   res.send("<h1>Contact page</h1>");
// });

// Символ + вказує, що попередній символ може зустрічатися 1 і більше разів. Цей шлях маршруту зіставляє contact, conntact, connntact і т.д.

// app.get("/con+tact", (req, res) => {
//   res.send("<h1>Contact page</h1>");
// });

// Символ зірочка * вказує, що на місці цього символу може бути будь-яка кількість символів. Цей шлях маршруту зіставляє contact, conxtact, con123tact і т.д.

app.get("/con*tact", (req, res) => {
  res.send("<h1>Contact page</h1>");
});

// проміжне ПЗ - просто функція, що приймає три аргументи: об'єкт запиту (req), об'єкт відповіді (res) і функцію next
// Ця функція нічого не виконує, просто пропускає потік через себе, але в консоль завжди буде вискакувати наше повідомлення.
// Функції проміжної обробки виконують наступні завдання:

// виконують певний код.
// вносять зміни до об'єктів запитів та відповідей.
// можуть завершити цикл "запит-відповідь" та перервати обробку запиту.
// викликають наступну функцію проміжної обробки зі стеку, виконанням функції next().

// Передача даних на сервер
// Перший спосіб – передати через параметр.  У визначенні маршруту перед параметром ставиться знак двокрапки.
// Додамо наступний обробник для маршруту:

app.get("/contact/:id", (req, res) => {
  res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});
// якщо ми тепер звернемося за маршрутом /contact/123 то req.params.id міститиме значення 123

// редагування користувача може виглядати так
app.patch("/user/:userid", (req, res) => {
  const id = req.params.userid;
  // виконуємо необхідні дії
});

// Другий спосіб – це розбір рядка GET запиту.
// Після URL - адреси, по якій відбувається звернення на сервер, ставиться знак питання ?, за яким слідує список аргументів, розділених символами &.
// http://localhost:3000/contacts?skip=0&limit=10
// Без цього способу не обходиться жодна реалізація пагінації на сторінці. Результат такого запиту знаходиться в об'єкті req.query
// {
//   skip: 0,
//   limit: 10
// }
// Яущо у GET запиті HTTP параметри рядка запиту не задані, наприклад /search, а знака питання і після нього нічого немає, то req.query за замовчуванням містить порожній об'єкт: {}

// При надсиланні якихось даних на сервер зазвичай використовуються HTTP методи POST, PUT та PATCH.
//  як отримувати такі дані в Express
// Насамперед для отримання відправлених даних необхідно підключити парсер через проміжне ПЗ і він уже міститься у фреймворку. Для створення парсера даних від форм застосовується функція urlencoded().:

app.use(express.urlencoded({ extended: false }));
// У цю функцію передається об'єкт, який визначає параметри парсингу. Значення extended: false вказує, що результат парсингу буде являти собою набір пар ключ-значення, а кожне значення може бути представлене у вигляді рядка чи масиву. Коли цей параметр дорівнює true, парсер використовує іншу бібліотеку для розбору формату рядка.
// приймаємо інформацію від форми аутентифікації - email, password
// Браузер відправить на URL < урл нашого додатку > /login дані форми. Це будуть дві змінні: email та password. За це відповідають атрибути name у відповідних тегів input. Ці дані ми повинні прийняти на стороні сервера наступним обробником
// app.post('/login', (req, res, next) => {
//   const { email, password } = req.body;
//   // Виконуємо необхідні операції
// });

// В результаті сервер має отримати дані в об'єкті req.body, наступного виду:

// {
//   email: 'Значення, що було введено в поле input',
//   password: 'Значення, що було введено в поле input'
// }

// Передача JSON
// Парсер JSON у додатку підключається наступним чином.

app.use(express.json());
// Передати дані у вигляді JSON, можна клієнтським JavaScript, утилітою curl для linux систем або за допомогою спеціальної утиліти типу Postman.
// Після того як парсер JSON буде підключено, наші обробники запитів можуть інтерпретувати значення req.body як об'єкт JavaScript замість рядка.

app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  // Виконуємо необхідні операції
});
// Цей приклад припускає, що надіслано об'єкт JSON з властивостями email та password. І головне у запиту заголовок Content-Type повинен зберігати application/json, а ви повинні надіслати дійсну розмітку JSON.

app.use("/my-router", myRouter);
// Цей додаток тепер зможе обробляти запити, адресовані ресурсам /my-router та /my-router/about.

// Основні методи маршрутизації
// get
// post
// put
// delete
// patch

//  особливий метод маршрутизації, app.all().
//  використовується для завантаження функцій проміжної обробки у дорозі для всіх методів запитів. Він буває корисний коли нам треба реагувати на будь-яке звернення до сервера.

// У наведеному нижче прикладі обробник буде запущений для запитів, адресованих /anything, незалежно від того, чи використовується GET, POST, PUT, DELETE або будь-який інший метод запиту HTTP, підтримуваний у модулі http.

app.all("/anything", (req, res, next) => {
  console.log("Anything method.");
  next(); // передаємо управління далі
});

// Методи відповіді
// Методи в об'єкті відповіді (res), перелічені в таблиці нижче можуть передавати відповідь клієнту та завершувати цикл “запит-відповідь”. Якщо жоден із цих методів не буде викликано з обробника маршруту, клієнтський запит зависне.
// res.download()	Запрошення на завантаження файлу
// res.end()	Завершення процесу відповіді
// res.json()	Надсилання відповіді JSON
// res.jsonp()	Надсилання відповіді JSON з підтримкою JSONP
// res.redirect()	Перенаправлення відповіді
// res.render()	Виведення шаблону представлення
// res.send()	Надсилання відповіді різних типів
// res.sendFile()	Надсилання файлу у вигляді потоку відповідей

// Ланцюжки методів
// Метод app.route() дозволяє створювати обробники маршрутів, що утворюють ланцюжки для конкретного шляху маршруту.

app
  .route("/blog")
  .get((req, res) => {
    res.send("Get a list of blog");
  })
  .post((req, res) => {
    res.send("Add a record to blog");
  })
  .put((req, res) => {
    res.send("Update blog");
  });
