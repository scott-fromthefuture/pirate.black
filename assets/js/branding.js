// a object for keeping track of selection states
let settings = {
    "logo": {
        "type": "svg",
        "layout": "main",
        "color": "wg"
    },
    "art": {
        "type": "svg",
        "color": "gold",        
    },
    "code":"hex"
};

// capitalize the first letter of a string
function cap(str) {
    str = str.toUpperCase();
    if (String(str).length > 1) {
        str = str.charAt(0) + str.slice(1).toLowerCase();
    };    
    return str;
};

// change the image attributes
function change(section, attribute, color=false) {

    let existing_setting = settings[section][attribute];

    // if it is color, we can just set it 
    if (attribute === "color") {
        settings[section][attribute] = color;

    // if they want to change type, it is eithe svg or png
    } else if (attribute === "type") {
        if (existing_setting === "svg") {
            settings[section]["type"] = "png";
        } else {
            settings[section]["type"] = "svg";
        }
    
    // if they want to change layout, it is either inline or main
    } else if (attribute === "layout") {
        if (existing_setting === "main") {
            settings[section]["layout"] = "stacked";
        } else {
            settings[section]["layout"] = "main";
        }
    } 

    // update the image sources
    if (section === "logo") {
        let container = document.getElementById("branding_logo");

        let base = 'url("https://raw.githubusercontent.com/PirateNetwork/mediakit/main/Logo%20';

        // mind the case
        let dir = settings[section]["type"].toUpperCase();
        let ext = settings[section]["type"].toLowerCase();

        // layout needs first letter capitalized
        let layout = settings[section]["layout"];
        layout = layout.charAt(0).toUpperCase()+ layout.slice(1);

        // format required if stacked
        let stacked = "";
        if (layout === "Stacked") {
            stacked = "Stacked_";
        };

        // handle background color
        let color = settings[section]["color"].toUpperCase();
        let logocontainer = document.getElementById("logo-container");
        if (color === "BLACK" || color === "BG") {     
            logocontainer.style.backgroundColor = "var(--pirate-calmseas)";
        } else {
            logocontainer.style.backgroundColor = "var(--pirate-deepblue)";
        };

        // handle color case
        if (color === "WHITE" || color === "BLACK") {     
            color = cap(color);
        }; 

        // update the background image source
        let new_contents = base + layout + '/' + dir + '/Pirate_Logo_' + stacked + color + '.' + ext + '")';
        container.style.backgroundImage = new_contents;

    // if not teh main log, then is the brand art
    } else {
        var images = ["coin", "p", "ship", "skull", "wordmark"];

        // set some common vars
        let type = settings[section]["type"];
        let color = settings[section]["color"];
        let base = "https://raw.githubusercontent.com/PirateNetwork/mediakit/main/";

        // for each image category, update source
        for (let i = 0; i < images.length; i++) {
            var image = cap(images[i]);
            
            // format the url sections
            var dir = cap(image);
            if (dir === "P") {
                dir = "P%20Logo";
            };
            var fdir = type.toUpperCase();
            var fimg = image + "_";
            var ftype = '.' + type.toLowerCase();
            var fcolor = cap(color);          

            // build the url
            var url = base + dir + '/' + fdir + '/Pirate_Logo_' + fimg + fcolor + ftype

            // update the image sources
            var img = document.getElementById(images[i]);
            img.src = url;
        };

        // change background color if dark logo 
        var bgcolor = "var(--pirate-navyblue)";
        if (color === "black" ) {              
            var bgcolor = "var(--pirate-calmseas)";
        };

        // update the background colors
        var elms = document.querySelectorAll("[id='art-container']");
        for(var item = 0; item < elms.length; item++) 
            elms[item].style.backgroundColor = bgcolor;
    };
};

// download the images on click
function download(img) {
  
    // if it is a logo, get the background image url
    if (img === "logo") {
        var box = document.getElementById("branding_logo");
        var bgi = box.style.backgroundImage;
        var url = bgi.slice(4, -1).replace(/"/g, "");
        console.log(url)

    // otherwise get the image source
    } else {
        var img = document.getElementById(img);
        var url = img.src;      
        console.log(url);
    };

    // get filename from url
    str = url.split("/");
    filename = str[str.length - 1];
    console.log(filename)

    // downlaod the file
    let options = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };    
    fetch(url, options)
    .then( response => {
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
        });
    });          
};

// change between hex and rgb color codes
function colorCode() {
    var codes = [
        {'hex':'bb9645','rgb':'187,150,69'},
        {'hex':'ffbd30','rgb':'255,190,48'},
        {'hex':'eacd88','rgb':'234,205,136'},
        {'hex':'141414','rgb':'20,20,20'},
        {'hex':'3f52b7','rgb':'63,82,183'},
        {'hex':'151326','rgb':'21,19,38'},
        {'hex':'202036','rgb':'32,32,54'},
        {'hex':'201633','rgb':'32,22,51'}
    ];

    // switch between hex and rgb
    if (settings["code"] === "hex") {
        settings["code"] = "rgb";

        // iterate through each color and update to rgb 
        for (let i = 0; i < codes.length; i++) {
            var block = document.getElementById(codes[i]['hex']);
            block.innerText = "rgb(" + codes[i]['rgb'] + ")";
        };
    } else {
        settings["code"] = "hex";

        // iterate through each color and update to hex
        for (let i = 0; i < codes.length; i++) {
            var block = document.getElementById(codes[i]['hex']);
            block.innerText = "#" + codes[i]['hex'];
        };
    };
};