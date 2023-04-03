// store the current switch selection
let selection = "official";

// switch between official and 3rd party wallets
function toggle() {

    // switch to 3rd party
    if (selection === "official") {
        selection = "thirdparty";
        document.getElementById("type").checked = true;
        window.location.hash = ("#thirdparty")

        // change switch able color
        document.getElementById("official-label").style.opacity = .5;
        document.getElementById("thirdparty-label").style.opacity = 1;

        // switch the visible div
        document.getElementById("official").style.display = "none";
        document.getElementById("third").style.display = "block";


    // switch to official
    } else {
        selection = "official";
        document.getElementById("type").checked = false;
        history.replaceState({}, document.title, window.location.href.split('#')[0]);

        // change switch able color
        document.getElementById("official-label").style.opacity = 1;
        document.getElementById("thirdparty-label").style.opacity = .5;

        // switch the visible div
        document.getElementById("official").style.display = "block";
        document.getElementById("third").style.display = "none";
    };
};

// bookmark a section into the url on click
function bookmark(section) {
    history.replaceState({}, document.title, window.location.href.split('#')[0]);
    const nextURL = window.location.href + "#" + section;
    const nextTitle = section;
    const nextState = { additionalInformation: section };
    window.history.pushState(nextState, nextTitle, nextURL);
    document.querySelectorAll('.wallet-container').forEach(e => e.style.border = "1px solid transparent")

    document.getElementById(section).style.border = "1px solid var(--pirate-neon)"
};

// utility function to generate the wallet links
function genrateLink(link, img, target) {
  element = document.getElementById(target);
  var title = link.split("/").pop();
  var anchor = document.createElement('a');
    anchor.setAttribute('href',link);
    anchor.setAttribute('title',title);
    anchor.innerHTML = '<img src="'+BASEURL+'assets/img/wallets/' + img + '" />';
    element.appendChild(anchor);
};


// object of github wallet api data
let wallets = {
  'treasure-chest':{
    'reponame': "pirate",
    'updated': false,
    'links': [{
        "icon": BASEURL + "assets/img/icons/blockchain.svg",
        "os": "Resources",
        "name": "ARRR-bootstrap.tar.gz",
        "link": "https://eu.bootstrap.dexstats.info/ARRR-bootstrap.tar.gz"}]     
  },
  'lite-wallet':{
    'reponame': "PirateWallet-Lite",
    'updated': false,
    'links': []
  },
  'skull-island':{
    'reponame': "Skull-Island",
    'updated': false,
    'links': []
  },
  'paper-wallet':{
    'reponame': "piratepaperwallet",
    'updated': false,
    'links': [{
        "icon": BASEURL + "assets/img/wallets/windows.svg",
        "os": "Windows",
        "name": "Windows launcher (.bat file)",
        "link": "https://github.com/lilszi/piratepaperwallet/releases/download/1.0/generate_addresses.bat"}]
  },
  'cli-wallet':{
    'reponame': "pirate",
    'updated': false,
    'links': [{
        "icon": BASEURL + "assets/img/icons/blockchain.svg",
        "os": "Resources",
        "name": "ARRR-bootstrap.tar.gz",
        "link": "https://eu.bootstrap.dexstats.info/ARRR-bootstrap.tar.gz"}]
  } 
};



// detirmine which os from filename 
function getOS(name) {
  let icon = '';
  let osname = '';

  name = name.toLowerCase();
  let ext = name.split('.').pop();

  // guess what OS 
  if (name.includes("aarch")) {
    osname = "ARM Linux";
    icon = BASEURL + "assets/img/wallets/arm.svg";
  
  } else if (name.includes("macos")) {
    osname = "Mac OS";
    icon = BASEURL + "assets/img/wallets/apple.svg";

  } else if (name.includes("ubuntu") || name.includes("linux")) {
    osname = "Linux";
    icon = BASEURL + "assets/img/wallets/linux.svg";
  
  } else if (name.includes("windows")) {
    osname = "Windows";
    icon = BASEURL + "assets/img/wallets/windows.svg";

  } else if (ext === "apk") {
    osname = "Android APK";
    icon = BASEURL + "assets/img/wallets/android.svg";

  } else {
    osname = "Resources";
    icon = BASEURL + "assets/img/icons/blockchain.svg";
  }; 

  return {'name': osname, 'icon': icon};
};


// prepare the links 
function buildLinks(data) {
  let assets = data.repo.assets;

  for (let i = 0; i < assets.length; i++) {
    // guess the os    
    let os = getOS(assets[i].name);

    // if we could determine the OS add the link
    if (os) {
      var link = {
        'icon': os.icon,
        'os': os.name,
        'name': assets[i].name,
        'link': assets[i].browser_download_url
      };
      data.links.push(link); 
    };
  };
  return data;
}


// if QT or CLI, remove the other
function seperatePirate(data) {

  // what files do we need to remove?
  let target = "-qt-";
  if (data.wallet == "treasure-chest") target = "-cli-";

  var list = [];
  
  // if the link has the target, remove it
  for (let i = 0; i < data.links.length; i++) {
    let filename = data.links[i].name.toLowerCase();
    
    if (!filename.includes(target)) {
      list.push(data.links[i]);
    }
  }
  data.links = list
  
  return data;
}


// sort the links by OS
function sortOS(links) {
  var categories = {};

  for (let i = 0; i < links.length; i++) {
    if (links[i].os in categories) {
      categories[links[i].os].links.push(links[i]);
    } else {
      categories[links[i].os] = {
        "icon": links[i].icon,
        "links": [links[i]]
      }
    };
  };
  const sortObject = obj => Object.keys(obj).sort().reverse().reduce((res, key) => (res[key] = obj[key], res), {});

  categories = sortObject(categories);
  return categories;
}

// create the html for the links
function createLinkElement(title,data) {
  // create the conatiner div
  var container = document.createElement("div");
  container.id = "link-container";

  // add the icon image
  container.innerHTML += '<img alt="'+title+' icon" src="'+data.icon+'" />'

  // create linkbox div
  var linkbox = document.createElement("div");
  linkbox.id = "linkbox";
  var headline = document.createElement("h3");
  headline.innerHTML = title;
  linkbox.appendChild(headline)

  // add links to linkbox
  for (let i = 0; i < data.links.length; i++) {
    var link = document.createElement("a");
    link.href = data.links[i].link;
    link.title = data.links[i].name + " download link";
    link.innerHTML = data.links[i].name;
    linkbox.appendChild(link);
  };  

  container.appendChild(linkbox);  
  return container;
};

// finnaly add all the links to the page
function addToPage(data) {
  let section = document.getElementById(data.wallet);
  let links = section.getElementsByClassName("links")[0];
  let version = section.getElementsByClassName("version")[0].getElementsByTagName('a')[0];
  var ul = document.createElement('ul'); 
  var hr = document.createElement('hr'); 

   // update version
  version.href = data.repo.html_url;
  version.innerHTML = data.repo.tag_name;

  // list each OS  
  var list = sortOS(data.links);
  for (const key in list) {
    if (list.hasOwnProperty(key)) {
 
      // if it has a OS, add it
      if (key != "Resources") {
        var li = document.createElement('li');
        li.appendChild(createLinkElement(key, list[key]));    
        ul.appendChild(li);
      };
    };
  };

  // add resources
  if ("Resources" in list) {
    var li = document.createElement('li');
    li.appendChild(createLinkElement("Resources",list["Resources"]));    
    ul.appendChild(li);
  };
  
  links.innerHTML = ""
  links.appendChild(ul);   
};

// call api and process
async function getapi(data) {
  let response = await fetch(data.apiurl);  

  if (response.ok) { 
    data.repo = await response.json();
  } else {
    console.log("HTTP-Error: " + response.status);
    return;
  };
  
  // make a list of links with icons and names
  data = buildLinks(data);

  // if QT or CLI, remove the other
  if (data.reponame === "pirate") {
    data = seperatePirate(data);
  };

  // apply links to page
  addToPage(data);
};

// prepare data for api
function updateLinks(wallet) {
  // if links already updated, skip updating to prevent spamming
  if (wallets[wallet]['updated']) return;

  // start a data object
  wallets[wallet]['updated'] = true;
  data = wallets[wallet];
  data['wallet'] = wallet;
  data.apiurl = "https://api.github.com/repos/PirateNetwork/" + data.reponame + "/releases/latest";

  getapi(data);
};

// flip the description and download cards
function flip(wallet, side) { 
  let desc = document.getElementById(wallet).getElementsByClassName("desc")[0];
  let download = document.getElementById(wallet).getElementsByClassName("download")[0];

  // switch the buttons
  if (side === "download") {
    download.style.opacity = 0;
    desc.style.opacity = 1;
    download.style.zIndex = 0;
    desc.style.zIndex = 99;

    // if veiwing the downloads side, update the links
    updateLinks(wallet)
  } else {
    download.style.opacity = 1;
    desc.style.opacity = 0;
    download.style.zIndex = 99;
    desc.style.zIndex = 0;

  }; 

  // flip the card sides
  const card = document.getElementById(wallet).getElementsByClassName("flip")[0];
  card.classList.toggle("flipCard");
};

window.onload = function() {
  // check if 3rd party wallets url was used
  var hash = window.location.hash.slice(1).toLocaleLowerCase();  
  if( hash  == 'thirdparty' ) {
      toggle();
  }  else if (hash) {
    document.getElementById(hash).style.border = "1px solid var(--pirate-neon)"
  };
};