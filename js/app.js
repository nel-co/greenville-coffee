const startBtn     = document.querySelector('#start-btn'),
  noBtn            = document.querySelector('#no-btn'),
  yesBtn           = document.querySelector('#yes-btn'),
  greetingContain  = document.querySelector('.greeting-container'),
  questionsContain = document.querySelector('.questions-container'),
  resultsContain   = document.querySelector('.results-container');

const coffeeShops = [{
  name: 'Methodical Coffee',
  address: '101 N. Main St, Greenville, SC 29601',
  coords: {
    lat: 34.851971,
    lng: -82.399599
  },
  link: 'https://methodicalcoffee.com/'
}, {
  name: 'The Village Grind',
  address: '1263 Pendleton St, Greenville, SC 29611',
  coords: {
    lat: 34.84724,
    lng: -82.428969
  },
  link: 'https://www.facebook.com/thevillagegrind/'
}, {
  name: 'Coffee Underground',
  address: '1 East Coffee St, Greenville, SC 29601',
  coords: {
    lat: 34.851594,
    lng: -82.398338
  },
  link: 'http://www.coffeeunderground.info/'
}, {
  name: 'Spill the Beans',
  address: '531 South Main St, Greenville, SC 29601',
  coords: {
    lat: 34.845151,
    lng: -82.401664
  },
  link: 'https://www.stbdowntown.com'
}, {
  name: 'Grateful Brew',
  address: '501 S. Pleasantburg Dr, Greenville, SC 29607',
  coords: {
    lat: 34.829261,
    lng: -82.369617
  },
  link: 'http://www.gratefulbrewgvl.com/'
}];

let answers = [],
  quest1    = '',
  quest2    = '',
  quest3    = '',
  coords    = '',
  shop      = '';

startBtn.addEventListener('click', getQuestions);

function getQuestions() {
  greetingContain.style.display = 'none';
  questionsContain.style.display = 'flex';
  answerQuestions();
}

function answerQuestions() {
  yesBtn.addEventListener('click', function() {
    answers.push(true);
    checkAnswers();
  });
  noBtn.addEventListener('click', function() {
    answers.push(false);
    checkAnswers();
  });
}

function checkAnswers() {
  if (answers.length === 1) {
    quest1 = answers[0];
    document.querySelector('#q1').style.display = 'none';
    document.querySelector('#q2').style.display = 'flex';
  } else if (answers.length === 2) {
    quest2 = answers[1];
    document.querySelector('#q2').style.display = 'none';
    document.querySelector('#q3').style.display = 'flex';
  } else if (answers.length === 3) {
    quest3 = answers[2];
    questionsContain.style.display = 'none';
    resultsContain.style.display = 'flex';
    findShop();
  }
}

function findShop() {
  if (quest1 == true && quest2 == true && quest3 == true) { // Village Grind
    coords = coffeeShops[1].coords;
    shop = coffeeShops[1];
  } else if (quest1 == true && quest2 == false && quest3 == true) { // Methodical Coffee
    coords = coffeeShops[0].coords;
    shop = coffeeShops[0];
  } else if (quest1 == true && quest2 == true && quest3 == false) { // Spill the Beans
    coords = coffeeShops[3].coords;
    shop = coffeeShops[3];
  } else if (quest1 == false && quest2 == true && quest3 == false) { // Coffee Underground
    coords = coffeeShops[2].coords;
    shop = coffeeShops[2];
  } else if (quest1 == false && quest2 == false && quest3 == false) { // Grateful Brew
    coords = coffeeShops[4].coords;
    shop = coffeeShops[4];
  } else { // Random Coffee shop
    let randomNum = Math.floor(Math.random() * coffeeShops.length);
    coords = coffeeShops[randomNum].coords;
    shop = coffeeShops[randomNum];
  }
  generateResults();
}

function generateResults() {
  // Display loader
  document.querySelector('.loading-container').style.display = 'flex';
  setTimeout(function() {
    document.querySelector('.loading-container').style.display = 'none';
  }, 2500);
  // Display results and map
  initMap();
  initResults();
}

function initMap() {
  let center = new google.maps.LatLng(coords)
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: center,
    styles: [{ "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "color": "#ededed" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#101010" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#5c5c5c" }] }, { "featureType": "transit", "elementType": "labels", "stylers": [{ "visibility": "off" }, { "color": "#ededed" }] }, { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [{ "color": "#ededed" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "color": "#ededed" }] }, { "featureType": "transit", "elementType": "geometry.fill", "stylers": [{ "color": "#ededed" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "color": "#c9c9c9" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#8db089" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#195770" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }]
  });
  let marker = new google.maps.Marker({
    position: center,
    map: map
  });
}

function initResults() {
  // Create Title
  let title = document.createElement('span');
  title.className = 'results-title';
  title.appendChild(document.createTextNode(shop.name));
  document.querySelector('.results-info').appendChild(title);

  // Create Address
  let address = document.createElement('span');
  address.className = 'results-address';
  address.appendChild(document.createTextNode(shop.address));
  document.querySelector('.results-info').appendChild(address);

  // Create Link
  let link = document.createElement('a');
  link.className = 'results-link';
  link.setAttribute('href', shop.link);
  link.setAttribute('target', '_blank');
  link.appendChild(document.createTextNode('Visit Site'));
  document.querySelector('.results-info').appendChild(link);
}

// Reset App
document.querySelector('.restart').addEventListener('click', function() {
  location.reload(true);
})

