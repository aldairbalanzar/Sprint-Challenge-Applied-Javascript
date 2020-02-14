// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

const cardsContainer = document.querySelector('.cards-container');

axios.get(`https://lambda-times-backend.herokuapp.com/articles`)
.then(res => {
    let articles = res.data.articles;
    createCard(articles);
})
.catch(res => {
    console.log(`no cards`, res);
})

function createCard(obj) {
    for(let prop in obj) {
        obj[prop].forEach( item => {

            let card = document.createElement('div'),
                cardHeadline = document.createElement('div'),
                cardAuthor = document.createElement('div'),
                imgContainer = document.createElement('div'), 
                img = document.createElement('img'),
                byWho = document.createElement('span');

            card.classList.add('card');
            cardHeadline.classList.add('headline');
            cardAuthor.classList.add('author');
            imgContainer.classList.add('img-container');
            
            cardHeadline.textContent = item.headline;
            cardAuthor.textContent = item.authorName;
            img.setAttribute('src', item.authorPhoto);
            byWho.textContent = `By ${item.authorName}`;

            imgContainer.append(img);
            cardAuthor.append(imgContainer);
            console.log(card);
            card.append(cardHeadline, cardAuthor, byWho);
            return cardsContainer.append(card);
        });
    }
}