let data;

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    console.log(data); 
  })
  .catch(error => console.error('Error loading JSON:', error));


const typeColorMap = {
  'Fairy':'#f7cbdf',
  'Steel':'#b8b8d2',
  'Normal':'#acaa7a',
  'Flying':'#9e90c5',
  'Water':'#6e8bc5',
  'Ice':'#98d6d5',
  'Fire':'#f27f2e',
  'Dragon':'#6457a6',
  'Electric':'#f6d233',
  'Rock':'#b9a238',
  'Ground':'#e0c166',
  'Grass':'#79c151',
  'Psychic':'#f05889',
  'Fighting':'#c4312a',
  'Bug':'#aabb39',
  'Poison':'#9f439a',
  'Ghost':'#72599a'
};

const statNames = ['HP','Atk','Def','Sp.Atk','Sp.Def', 'Speed'];
const statColors = ["#9ee865",
                   "#f5de69",
                   "#f09a65",
                   "#66d8f6",
                   "#899eea",
                   "#e46cca"];

let titles = Object.keys(data);
let type_filter =
{'Normal':false,
  'Flying':false,
  'Water':false,
  'Ice':false,
  'Fire':false,
  'Dragon':false,
  'Electric':false,
  'Rock':false,
  'Ground':false,
  'Grass':false,
  'Psychic':false,
  'Fighting':false,
  'Bug':false,
  'Poison':false,
  'Ghost':false,
};

let sortStyle = "id";
// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (var i = 0; i < titles.length; ++i) {
    let imageURL = "https://www.serebii.net/scarletviolet/pokemon/new/small/" + titles[i].slice(2) + ".png";
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, data[titles[i]]['name'], titles[i], data[titles[i]]['types'], imageURL, data[titles[i]]['stats']); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newTitle, ID, types, newImageURL, stats) {
  card.style.display = "block";
  card.style.borderColor = typeColorMap[types[0]];
  
  const cardTitleContainer = card.querySelector(".row-container");
 cardTitleContainer.style.borderColor = typeColorMap[types[0]];
  
  const cardHeader = card.querySelector(".row-title");
  cardHeader.textContent = newTitle;
  
  const cardID = card.querySelector(".row-id");
  cardID.textContent = ID;
  
  const cardTypes = card.querySelector(".type-row");
  cardTypes.innerHTML = "";
   for (let i = 0; i < types.length; i++) {
    const typeDiv = document.createElement('div');
    typeDiv.className = 'typing';
    typeDiv.textContent = types[i];
    typeDiv.style.backgroundColor = typeColorMap[types[i]];
    cardTypes.appendChild(typeDiv);
  }

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Poster";

  
  const cardStats = card.querySelector(".stat-row");
  cardStats.innerHTML = "";
   for (let i = 0; i < stats.length; i++) {
    const statDiv = document.createElement('div');
    statDiv.className = 'stat-box';
    // statDiv.textContent =  statNames[i] + "<br>" + "2";
     statDiv.innerHTML = statNames[i] + "<br>" + stats[i];
    statDiv.style.backgroundColor = statColors[i];
    cardStats.appendChild(statDiv);
  }
  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
  alert("please grade ");
}

function removeLastCard() {
  titles.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}

function type_check(id) {

  for (let i = 0; i < data[id].types.length; i++){ 
    if (type_filter[data[id].types[i]]) {
      return;
    }
  }
  titles.push(id);
}

function filter(typing) {
  if (type_filter[typing]) {
    type_filter[typing] = false;
    titles = []
    
    Object.keys(data).forEach(type_check);
    const button = document.getElementById("filter-" + typing);
    button.style.backgroundColor = typeColorMap[typing];
    
  //Add the type back in   
  }
  else {
    const filtered = titles.filter(id => !data[id]['types'].includes(typing));
    titles = filtered;
    const button = document.getElementById("filter-" + typing);
    button.style.backgroundColor = "rgb(51,51,51)";
    type_filter[typing] = true;
  }
  
  sort(sortStyle);
  showCards();
}


function sort(style) {
  if (style == sortStyle) {return;}
  const button = document.getElementById(sortStyle + "_sort");
    button.style.fontWeight = "normal";

  sortStyle = style;
  const button2 = document.getElementById(style + "_sort");
    button2.style.fontWeight = "bold";

  let key = 0;
  if (style == "HP") {
    key = 0;
  }
  else if (style == "Atk") {
    key = 1;
  }
  else if (style == "Def") {
    key = 2;
  }
  else if (style == "Sp.Atk") {
    key = 3;
  }
  else if (style == "Sp.Def") {
    key = 4;
  }
  else if (style == "Speed") {
    key = 5;

  }
  else if (style == "id") {titles.sort();
                          return;
                          }
  titles = titles.sort((a, b) => {
  if (Number(data[a]["stats"][key]) < Number(data[b]["stats"][key])) {return -1;}
  if (Number(data[a]["stats"][key]) > Number(data[b]["stats"][key])) {return 1;}
  return 0;
});
  
  showCards();
}

function reset() {
  Object.keys(type_filter).forEach(key => {
  type_filter[key] = false;  
});
  
  
  Object.keys(typeColorMap).forEach(key => {
  const button = document.getElementById("filter-" + key);
    button.style.backgroundColor = typeColorMap[key]; 
});
  
  Object(statNames).forEach(key => {
      const button = document.getElementById(key + "_sort");
    button.style.fontWeight = "normal";
});
  const button = document.getElementById("id_sort");
    button.style.fontWeight = "bold";
  
  
  titles = Object.keys(data);
  showCards();
  
}
