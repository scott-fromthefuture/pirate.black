// button to play music 
function play_pause() {
    var audio = document.getElementById("og");
    var img = document.getElementById("pp");
    if (audio.paused) {
      audio.play();
      img.src = BASEURL + "assets/img/icons/pause.svg"
    } else {
      audio.pause();
      img.src = BASEURL + "assets/img/icons/play.svg"
    }
};

// reveal a youtube embed and play
function playVideo(element) {
    // The id of the container must be passed
    var container = document.getElementById(element);

    // show iframe and update source to playi t
    var video = container.getElementsByTagName("iframe")[0];
    var src = video.src;
    video.src = src + "?autoplay=1";
    video.style.display = "block";
};

  // dollars round to two decimal, even when ending in zero
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // api url
  let api_url = 'https://corsproxy.io/?' + encodeURIComponent('https://whattomine.com/coins/298.json');
  //let api_url = 'https://api.allorigins.win/get?url=https://whattomine.com/coins/298.json';
  // HAD TO USE A CORS PROXY https://allorigins.win/ 

  // get resut using fetch()
  async function  fetchapi(arguments) {
    let url = api_url + arguments;
    let response = await fetch(url); 
    // check response is good
    if (response.ok) { 
      const result = await response.json();
      return result;      
    } else {
      alert("HTTP-Error: " + response.status);
    };   
  };

// mining calculator form
window.onload = function() {
  
  // handle the form
  calcForm.onsubmit = async (event) => {
    event.preventDefault();
  
    // get form data
    var data = {
      "hashrate": calcForm.elements["hashrate"].value, 
      "power": calcForm.elements["power"].value,
      "cost": calcForm.elements["cost"].value, 
      "fee": calcForm.elements["fee"].value
    };

    // use form inputs to format the api arguments
    let arguments = "?hr="+ data.hashrate +"&p="+ data.power +"&fee="+ data.fee +"&cost="+ data.cost +"&cost_currency=USD&span_d=24";
    var apiresponse = await fetchapi(arguments);
    var r = apiresponse;
 

    // vars for the table loop
    var factors = [1,7,30.5,365];
    var period = ["day","week","month","year"];
    var resultTable = document.getElementById("result-table");
    var tbody = resultTable.getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";

    // make HTML and append em to the table
    for (let i = 0; i < factors.length; i++) {
      var prof = "green-hl";
      if (r.profit.replace('$', '') < 0 ) { prof = "red-hl" };

      //manually add fee
      var revenue = r.revenue.replace('$', '')*factors[i];
      var fee = revenue * (data.fee / 100);

      row = "<tr><td>"+period[i]+"</td><td>"+
        parseFloat((r.estimated_rewards*factors[i]).toFixed(3))+"</td><td>$"+
        formatter.format(revenue)+"</td><td>$"+
        formatter.format(fee)+"</td><td>$"+
        formatter.format(r.cost.replace('$', '')*factors[i])+"</td><td class=\""+ prof +"\">$"+
        formatter.format(r.profit.replace('$', '')*factors[i])+"</td></tr>";

      // append to result table
      tbody.innerHTML+= row;
    }

    // display the result table
    document.getElementById("result-area").style.display = 'block';
    document.getElementById("instructions-area").style.display = 'none';
    return false;
  };

};

// stats websocket 
let lastheight = 0;
let nexthalvingheight = 0;

// notify user halvening occured
function halvening(newera) {
    // update data
    getHeight();

    //launch fireworks
    let celebrate = document.getElementById("celebrate");
    celebrate.style.display = "block";
    celebrate.innerHTML = "<img src='" + BASEURL + "assets/gifs/fireworks.gif' />";
};

// coundown timer
var seconds = 23333100;   
function timer() {
    var days        = Math.floor(seconds/24/60/60);
    var hoursLeft   = Math.floor((seconds) - (days*86400));
    var hours       = Math.floor(hoursLeft/3600);
    var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
    var minutes     = Math.floor(minutesLeft/60);
    var remainingSeconds = seconds % 60;
    function pad(n) {
        return (n < 10 ? "0" + n : n);
    }
    document.getElementById('days').innerText = pad(days);
    document.getElementById('hours').innerText = pad(hours);
    document.getElementById('mins').innerText = pad(minutes);
    document.getElementById('secs').innerText = pad(remainingSeconds);
      
    // if less than 0 seconds on timer
    if (seconds == 0) {        
        document.getElementById('anymoment').style.display = "block";
    };
    seconds--;        
};       

// when a new height is recieved, update the HTML
function update(height) {
    // define some vars
    lastheight = height; 
    let block_time = 60;
    let halving_blocks = 388885;     
    let starting_subsidy = 256;

    //some maths   
    let average_halving_days = (halving_blocks * block_time)/60/60/24; //seconds/mins/hours
    let halving_progress = height / halving_blocks;
    let era = Math.floor(halving_progress);
    let next_era = era + 1;
    let current_subsidy = starting_subsidy / Math.pow(2, era);
    let next_halving_block = halving_blocks * next_era;
    let next_halving_blocks = next_halving_block - height;
    let next_halving_seconds = next_halving_blocks * block_time;

    let timenow = Date.now();
    let halvingtime = timenow + (next_halving_seconds * 1000);
    var halvingdate = new Date(halvingtime);

    let progress = halving_blocks - next_halving_blocks;  
    let progress_percent = ((progress / 388885) * 100).toFixed(2) + "%";

    // insert data into elements
    
    document.getElementById("subsidy").innerText = current_subsidy;
    document.getElementById("next_halving_block").innerText = next_halving_block;
    document.getElementById("next_halving_date").innerText = halvingdate.toLocaleString();
    document.getElementById("progress").innerText = progress;
    document.getElementById("remaining").innerText = next_halving_blocks;
    document.getElementById("bar").style.width = progress_percent;
    document.getElementById("progress_percent").innerText = progress_percent;
    // start countdown loop
    seconds = next_halving_seconds;

 

    var res = height.split("");
    console.log(height)
    var colored_height = res.toString().replace(',','') + `<span color="red;">${res[-1]}</span>`;
    document.getElementById("height").innerText = colored_height;
   

    //setTimeout(function () { i.style.color = "white" }, 2000);

    // if block is new era, put on a show
    if (height == nexthalvingheight){
        halvening(era);
    }
    nexthalvingheight = next_halving_block;
};

// get current height from explorer API
async function getHeight() {
    let api_url = 'https://explorer.pirate.black/insight-api-komodo/status?q=getInfo';
    let backup_api_url = "https://pirate.explorer.dexstats.info/insight-api-komodo/status?q=getInfo";
        let data = {};
    let response = await fetch(api_url);

    // check response
    if (response.ok) { 
        data = await response.json();
    } else {
        // handle error. Should fallback to bckup api url if first fails
        alert("HTTP-Error: " + response.status);
    }   
    // update the html
    update(data.info.blocks);
};

// should we wait to run everything till DOM? 
document.addEventListener("DOMContentLoaded", function(){   
    $('#rippled').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.02,
        });           

    // call the API and get the current data
    getHeight();

    // start the coundown timer
    var countdownTimer = setInterval(timer, 1000);

    // Start a websocket to listen for new blocks
    eventToListenTo = 'block'
    room = 'inv'
    var socket = io("https://explorer.pirate.black/");
    socket.on('connect', function() {
        // Join the room "inv".
        socket.emit('subscribe', room);
    })
    socket.on(eventToListenTo, function(data) {
        console.log("New block: " + data);
        if (lastheight > 0) {
            // just iterate up one instead of checking API each block
            var currentheight = lastheight + 1;              
            update(currentheight);
        } else {
            // otherwise we didnt get the current block, check the API
            getHeight();
        };
    })
});

(function () {
  if (typeof EventTarget !== "undefined") {
      let func = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function (type, fn, capture) {
          this.func = func;
          if(typeof capture !== "boolean"){
              capture = capture || {};
              capture.passive = false;
          }
          this.func(type, fn, capture);
      };
  };
}());