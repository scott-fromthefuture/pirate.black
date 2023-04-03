// store the current switch selection
let selection = "arrr";

// switch between arrr and warrr exchange listings
function toggle() {

    // switch to wARRR
    if (selection === "arrr") {
        selection = "warrr";
        document.getElementById("type").checked = true;
        window.location.hash = ("#warrr")
        
        // change switch able color
        document.getElementById("arrr-label").style.opacity = .5;
        document.getElementById("warrr-label").style.opacity = 1;

        // switch the visible div
        document.getElementById("arrr-exchanges").style.display = "none";
        document.getElementById("warrr-exchanges").style.display = "block";

        // switch the coin in the art section
        document.getElementById('coin').src = "assets/img/site/bsceth_coin.svg";
        
    // switch to ARRR    
    } else {
        selection = "arrr";
        document.getElementById("type").checked = false;
        history.replaceState({}, document.title, window.location.href.split('#')[0]);

        // change switch able color
        document.getElementById("arrr-label").style.opacity = 1;
        document.getElementById("warrr-label").style.opacity = .5;

        // switch the visible div
        document.getElementById("arrr-exchanges").style.display = "block";
        document.getElementById("warrr-exchanges").style.display = "none";

        // switch the coin in the art section
        document.getElementById('coin').src = "assets/img/site/pirate_coin.svg";
    };    
};

// on page load, check if the url has a hash to set toggle
window.onload = function() {
    var hash = window.location.hash.slice(1).toLocaleLowerCase(); 
    if( hash  === 'warrr' ) { 
        toggle();
    }; 
};