// Cloe.js
// Copyright (c) 2017 by Jin Yeom

$.fn.extend({
  animateCss: function (animName) {
    var animEnd = 'webkitAnimationEnd mozAnimationEnd ' +
      'MSAnimationEnd oanimationend animationend';

    this.addClass('animated ' + animName).one(animEnd, function() {
      $(this).removeClass('animated ' + animName);
    });
  }
});

var respond = function(response) {
  $('#response').animateCss('fadeIn');
  $('#response').html(response);
  $('#title-response').html(response);
};

if (annyang) {
  var listening = false;
  var helpMessage = true;

  // start listening responses
  var startListeningResponses = ['What\'s up?', 'Yes?', 'Yeah?', 'Mmhmm?',
    'What do you need?', 'Heeeeyyyyyyy, What\'s up?'];

  // stop listening responses
  var stopListeningResponses = ['Alright!', 'Okay!', 'Alrighty.',
    'That\'s cool.', 'Let me know if you need anything!'];

  // list of supported websites
  var supportedWebsites = ['google', 'facebook', 'reddit', 'twitter',
    'netflix', 'tumblr', 'github', 'youtube', 'hulu', 'amazon'];

  // random selection helper function
  var randSelect = function(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

  // scroll to a specified section of the page
  var scrollTo = function(identifier) {
    $('html, body').animate({
        scrollTop: $(identifier).offset().top
    }, 1000);
  }

  // Get started.
  var getStarted = function() {
    scrollTo('#overview');
  };

  // Start listening.
  var startListening = function() {
    if (helpMessage) {
      $('#help').remove();
      helpMessage = false;
    }
    scrollTo('#cloe');
    respond(randSelect(startListeningResponses));
    listening = true;
  };

  // Stops listening.
  var stopListening = function() {
    if (listening) {
      respond(randSelect(stopListeningResponses));
      listening = false;
    }
  };

  Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' +
      ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes();
  }

  // Show current time.
  var showTime = function() {
    if (listening) {
      var time = new Date();
      respond('It\'s ' + time.timeNow() + '.');
      listening = false;
    }
  };

  // Google search given a search topic.
  var googleSearch = function(topic) {
    if (listening) {
      respond('Searching \'' + topic + '\' on Google...');
      var processed = topic.replace(/ /g, '%20');
      window.open('https://www.google.com/#q=' + processed);
      listening = false;
    }
  };

  // Bing search given a search topic.
  var bingSearch = function(topic) {
    if (listening) {
      respond('Searching \'' + topic + '\' on Bing...');
      var processed = topic.replace(/ /g, '%20');
      window.open('https://www.bing.com/search?q=' + processed);
      listening = false;
    }
  };

  // Open a website given a website name; Google search if not in the list.
  var openWebsite = function(website) {
    if (listening) {
      website = website.toLowerCase();
      if (supportedWebsites.includes(website)) {
        respond('Opening \'' + website + '\' on a new tab...');
        window.open('https://www.' + website + '.com');
      } else {
        googleSearch(website);
      }
      listening = false;
    }
  };

  var commands = {
    // start listening
    '(hey) Chloe': startListening,

    // stop listening
    'nevermind': stopListening,
    'nothing': stopListening,
    'stop listening': stopListening,

    // current time
    'show me time': showTime,
    'what time is it': showTime,

    // current weather

    // web search
    'google *topic': googleSearch,
    'bing *topic': bingSearch,
    'search *topic': googleSearch,

    'open *website': openWebsite,
    'go to *website': openWebsite,
  };

  annyang.addCommands(commands);
  annyang.start();
}
