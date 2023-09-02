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
    cardUser.className = "card";
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
