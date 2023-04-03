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

// get most recent monthly update article
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/piratechain')
  .then((res) => res.json())
  .then((data) => {

    const res = data.items;
    const posts = res.filter(item => item.categories.length > 0);

    function toText(node) {
      let tag = document.createElement('div')
      tag.innerHTML = node
      node = tag.innerText
      return node
    };
    function shortenText(text,startingPoint ,maxLength) {
      return text.length > maxLength?
      text.slice(startingPoint, maxLength):
      text
    };

    let output = '';
    let item = posts[0];
      output += `
      <article class="update-post" itemscope itemType="http://schema.org/BlogPosting">
        <a href="${item.link}" target="_blank" rel="noopener noreferrer">
            <img src="${item.thumbnail}" class="update-img"></img>
            <div class="update-content">
              <div class="update-preview">
                <h2 class="update-title" itemprop="headline">${item.title}</h2>
                <p class="update-intro" itemprop="articleBody">${shortenText(toText(item.content),0, 300)+ '...'}</p>
              </div>
              <div class="update-info">
                <address class="update-author">${item.author}</address>
                <time class="update-date" datetime="${shortenText(item.pubDate,0 ,10)}" itemprop="datePublished">${shortenText(item.pubDate,0 ,10)}</time>
              </div>
            </div>
        <a/>
      </article>`;
    document.querySelector('.update-article').innerHTML = output;
})

//rotate word in hero section
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);

};