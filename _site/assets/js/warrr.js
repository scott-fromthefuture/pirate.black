// reveal a youtube embed and play
function playVideo(element) {
  // The id of the container must be passed
  var container = document.getElementById(element);

  // show iframe and update source to playi t
  var video = container.getElementsByTagName("iframe")[0];
  var src = video.src;
  video.src = src + "?autoplay=1";
  video.style.display = "block";
}

// store the current switch selection
let selection = "bsc";

// switch between BSC abd ETH wARRR details
function toggle() {

  // switch to ETH
  if (selection === "bsc") {
    selection = "eth";
    document.getElementById("type").checked = true;
    window.location.hash = ("#eth")
    
    // change switch able color
    document.getElementById("bsc-label").style.opacity = .5;
    document.getElementById("eth-label").style.opacity = 1;

    // switch the visible div
    document.getElementById("bsc-details").style.zIndex = 100;
    document.getElementById("bsc-details").style.opacity = 0;
    document.getElementById("eth-details").style.opacity = 1;
    document.getElementById("eth-details").style.zIndex = 101

  // switch to BSC    
  } else {
    selection = "bsc";
    document.getElementById("type").checked = false;
    window.location.hash = ("#bsc")

    // change switch able color
    document.getElementById("bsc-label").style.opacity = 1;
    document.getElementById("eth-label").style.opacity = .5;

    // switch the visible div
    document.getElementById("bsc-details").style.zIndex = 101;
    document.getElementById("bsc-details").style.opacity = 1;
    document.getElementById("eth-details").style.opacity = 0;
    document.getElementById("eth-details").style.zIndex = 100;
};    
};


// wARRR network details
const networks = {
  'BSC':{
    'chainId':'0x38',
    'rpcURL':'https://bsc-dataseed1.binance.org/',
    'networkName':'BNB Smart Chain Mainnet',
    'currencyName':'BNB',
    'currencySymbol':'BNB',
    'currencyDecimal':18,
    'explorerURL':'https://bscscan.com/',
    'warrr':{
      'address':'0xcdaf240c90f989847c56ac9dee754f76f41c5833',
      'symbol':'wARRR',
      'decimals':8,
      'image':'https://bscscan.com/token/images/pirateblackchain_32.png',
      'type':'ERC20'
    },
    'warrrlp':{
        'address':'0xf01575e88e5c9e1fec464128096106155458e2a1',
        'symbol':'wARRR-LP',
        'decimals':18,
        'image':'https://bscscan.com/token/images/pirateblackchain_32.png',
        'type':'ERC20'
      }
      // bsc staking = https://bscscan.com/address/0x5502920b1c231d3b4d8f124658c447a72b72db4d#writeContract#F7
      // eth staking = https://etherscan.io/address/0x5f083DD5DBA10447239F09304b39c90851cA78cc#writeContract#f7
  },
  'ETH':{
    'chainId':'0x1',
    'rpcURL':'https://mainnet.infura.io/v3/',
    'networkName':'Ethereum Mainnet',
    'currencyName':'ETHER',
    'currencySymbol':'ETH',
    'currencyDecimal':18,
    'explorerURL':'https://etherscan.io',
    'warrr':{
      'address':'0x057acee6DF29EcC20e87A77783838d90858c5E83',
      'symbol':'wARRR',
      'decimals':8,
      'image':'https://bscscan.com/token/images/pirateblackchain_32.png',
      'type:':'ERC20'
    },
    'warrrlp':{
        'address':'0xB53f8F2907d8E5fED503f8ebCe4433FB5c5BEae2',
        'symbol':'wARRR-LP',
        'decimals':18,
        'image':'https://bscscan.com/token/images/pirateblackchain_32.png',
        'type':'ERC20'
      }
  }
};

// Add BSC network to Metamask
const addNetwork = async (selectedNetwork) => {        
    let selected = networks[selectedNetwork];

    // Check if we have a metamask like wallet
    if (!window.ethereum) {
        alert('Metamask not detected');
        window.open("https://metamask.io/download/", "_blank");
        return;
    } else {
        // check if already BSC
        let walletChain = await window.ethereum.chainId;
        if (selected.chainId == walletChain) {
            alert(selected.networkName + ' already installed');
            return;
        };
    };
    // Add and/or switch to BSC
    await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: selected.chainId,
            chainName: selected.networkName,
            rpcUrls: [selected.rpcURL],
            blockExplorerUrls: [selected.explorerURL],
            nativeCurrency: {
                name: selected.currencyName,
                symbol: selected.currencySymbol, 
                decimals: selected.currencyDecimal,
            }
        }],
    }); 
};



// add wARRR to metamask, but switch to th ecorrect network first
const addToken = async (selectedNetwork, selectedToken) => {  
    let selected = networks[selectedNetwork];
    

    // try switching to the corretc network
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: selected.chainId }],
        });

    // if we get this error, the network has not yet been added
    } catch (switchError) {
        if (error.code === 4902) {
            alert(selected.networkName + ' must be added first');
            return;
        };

    // ok, so add the token    
    } 
    await new Promise(resolve => setTimeout(resolve, 1000)); // hacky way to get metamask to respond
    let token = selected[selectedToken];
    try {
        await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: token.address, 
                    symbol: token.symbol, 
                    decimals: token.decimals, 
                    image: token.image, 
                },
            },
        });
    } catch (error) {
        console.log("error: " + JSON.stringify(error));
    };    
};  

// on page load, check if the url has a hash to set toggle
window.onload = function() {
    var hash = window.location.hash.slice(1).toLocaleLowerCase(); 
    if( hash  === 'eth' ) { 
        toggle();
    }; 
};
