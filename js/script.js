// Створити сторінку, яка імітує стрічку новин соціальної мережі Twitter.
// Технічні вимоги:
// При відкритті сторінки необхідно отримати з сервера список всіх користувачів та загальний список публікацій. Для цього потрібно надіслати GET запит на наступні дві адреси:
// https://ajax.test-danit.com/api/json/users
// https://ajax.test-danit.com/api/json/posts
// Після завантаження всіх користувачів та їх публікацій необхідно відобразити всі публікації на сторінці.
// Кожна публікація має бути відображена у вигляді картки (приклад: https://prnt.sc/q2em0x), та включати заголовок, текст, а також ім'я, прізвище та імейл користувача, який її розмістив.
// На кожній картці повинна бути іконка або кнопка, яка дозволить видалити цю картку зі сторінки. При натисканні на неї необхідно надіслати DELETE запит на адресу https://ajax.test-danit.com/api/json/posts/${postId}. Після отримання підтвердження із сервера (запит пройшов успішно), картку можна видалити зі сторінки, використовуючи JavaScript.
// Більш детальну інформацію щодо використання кожного з цих зазначених вище API можна знайти тут.
// Цей сервер є тестовим. Після перезавантаження сторінки всі зміни, які надсилалися на сервер, не будуть там збережені. Це нормально, все так і має працювати.
// Картки обов'язково мають бути реалізовані у вигляді ES6 класів. Для цього необхідно створити клас Card. При необхідності ви можете додавати також інші класи.

const server1 = "https://ajax.test-danit.com/api/json/users";
const server2 = "https://ajax.test-danit.com/api/json/posts";
const twitterBlock = document.querySelector("#twitter");
async function getFetch(url) {
  twitterBlock.innerHTML = `<div class="news__loading">
    <img src="./img/Loading-bar.gif" alt="Loading...">
    </div>`;

  const responce = await fetch(url, {
    method: "GET",
  });
  try {
    if (responce.ok) {
      return await responce.json();
    } else {
      twitterBlock.innerHTML = responceResult.message;
      throw new Error("неповні дані");
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    twitterBlock.innerHTML = "";
  }
}

async function printTwits() {
  const users = await getFetch(server1);
  const posts = await getFetch(server2);
  // console.log(users, posts);
  users.forEach((user) => {
    posts.forEach((post) => {
      // console.log(user, post);
      if (user.id === post.userId) {
        let card = new Card(
          user.name,
          user.username,
          user.email,
          post.title,
          post.body
        );
        card.render();
        // console.log(user, post);
      }
    });
  });
}
class Card {
  constructor(name, username, email, title, body, id) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.title = title;
    this.body = body;
    this.id = id;
    this.btn = document.createElement("button");
  }
  render() {
    const cardUser = document.createElement("div");
    this.btn.className = "delete__button";
    this.btn.innerText = "delete";
    cardUser.innerHTML = `
  <h2> ${this.title} </h2>;
  <p>${this.body}</p>
  <h2>${this.name}</h2>
  <h2>${this.username}</h2>
  <a href="mailto:" >${this.email}</a>
 
 `;
    cardUser.append(this.btn);

    twitterBlock.appendChild(cardUser);
    this.delete();
  }
  delete() {
    this.btn.addEventListener("click", () => {
      const cardElement = this.btn.closest(".card");
      if (cardElement) {
        cardElement.remove();
      }
    });
  }
}

printTwits();
