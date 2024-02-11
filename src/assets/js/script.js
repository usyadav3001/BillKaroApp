"use strict";
$(document).ready(function() {
    // card js start
    $(".card-header-right .close-card").on('click', function() {
        var $this = $(this);
        $this.parents('.card').animate({
            'opacity': '0',
            '-webkit-transform': 'scale3d(.3, .3, .3)',
            'transform': 'scale3d(.3, .3, .3)'
        });

        setTimeout(function() {
            $this.parents('.card').remove();
        }, 800);
    });
    $(".card-header-right .reload-card").on('click', function() {
        var $this = $(this);
        $this.parents('.card').addClass("card-load");
        $this.parents('.card').append('<div class="card-loader"><i class="fa fa-spinner rotate-refresh"></div>');
        setTimeout(function() {
            $this.parents('.card').children(".card-loader").remove();
            $this.parents('.card').removeClass("card-load");
        }, 3000);
    });
    $(".card-header-right .card-option .open-card-option").on('click', function() {
        var $this = $(this);
        if ($this.hasClass('fa-times')) {
            $this.parents('.card-option').animate({
                'width': '30px',
            });
            $(this).removeClass("fa-times").fadeIn('slow');
            $(this).addClass("fa-wrench").fadeIn('slow');
        } else {
            $this.parents('.card-option').animate({
                'width': '140px',
            });
            $(this).addClass("fa-times").fadeIn('slow');
            $(this).removeClass("fa-wrench").fadeIn('slow');
        }
    });
    $(".card-header-right .minimize-card").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        var card = $(port).children('.card-block').slideToggle();
        $(this).toggleClass("fa-minus").fadeIn('slow');
        $(this).toggleClass("fa-plus").fadeIn('slow');
    });
    $(".card-header-right .full-card").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        port.toggleClass("full-card");
        $(this).toggleClass("fa-window-restore");
    });

    $(".card-header-right .icofont-spinner-alt-5").on('mouseenter mouseleave', function() {
        $(this).toggleClass("rotate-refresh").fadeIn('slow');
    });
    $("#more-details").on('click', function() {
        $(".more-details").slideToggle(500);
    });
    $(".mobile-options").on('click', function() {
        $(".navbar-container .nav-right").slideToggle('slow');
    });
    $(".search-btn").on('click', function() {
        $(".main-search").addClass('open');
        $('.main-search .form-control').animate({
            'width': '200px',
        });
    });
    $(".search-close").on('click', function() {
        $('.main-search .form-control').animate({
            'width': '0',
        });
        setTimeout(function() {
            $(".main-search").removeClass('open');
        }, 300);
    });
    // $(".header-notification").on('click', function() {
    //     $(this).children('.show-notification').slideToggle(500);
    //     $(this).toggleClass('active');
    //
    // });

    $(document).ready(function(){
        $(".header-notification").click(function(){
            $(this).find(".show-notification").slideToggle(500);
            $(this).toggleClass('active');
        });
    });
    $(document).on("click", function(event){
        var $trigger = $(".header-notification");
        if($trigger !== event.target && !$trigger.has(event.target).length){
            $(".show-notification").slideUp(300);
            $(".header-notification").removeClass('active');
        }
    });

    // card js end
    $.mCustomScrollbar.defaults.axis = "yx";
    $("#styleSelector .style-cont").slimScroll({
        setTop: "1px",
        height:"calc(100vh - 520px)",
    });
    $(".main-menu").mCustomScrollbar({
        setTop: "1px",
        setHeight: "calc(100% - 56px)",
    });
    /*chatbar js start*/
    /*chat box scroll*/
    var a = $(window).height() - 80;
    $(".main-friend-list").slimScroll({
        height: a,
        allowPageScroll: false,
        wheelStep: 5,
        color: '#1b8bf9'
    });

    // search
    $("#search-friends").on("keyup", function() {
        var g = $(this).val().toLowerCase();
        $(".userlist-box .media-body .chat-header").each(function() {
            var s = $(this).text().toLowerCase();
            $(this).closest('.userlist-box')[s.indexOf(g) !== -1 ? 'show' : 'hide']();
        });
    });

    // open chat box
    $('.displayChatbox').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat').toggle('slide', options, 500);
    });

    //open friend chat
    $('.userlist-box').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat_inner').toggle('slide', options, 500);
    });
    //back to main chatbar
    $('.back_chatBox').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat_inner').toggle('slide', options, 500);
        $('.showChat').css('display', 'block');
    });
    $('.back_friendlist').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.p-chat-user').toggle('slide', options, 500);
        $('.showChat').css('display', 'block');
    });
    // /*chatbar js end*/

    $('[data-toggle="tooltip"]').tooltip();

    // wave effect js
    Waves.init();
    Waves.attach('.flat-buttons', ['waves-button']);
    Waves.attach('.float-buttons', ['waves-button', 'waves-float']);
    Waves.attach('.float-button-light', ['waves-button', 'waves-float', 'waves-light']);
    Waves.attach('.flat-buttons', ['waves-button', 'waves-float', 'waves-light', 'flat-buttons']);
});
$(document).ready(function() {
    $(".theme-loader").animate({
        opacity: "0"
    },1000);
    setTimeout(function() {
        $(".theme-loader").remove();
    }, 800);
});

// toggle full screen
function toggleFullScreen() {
    var a = $(window).height() - 10;

    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

$('body').append('' +
    '<div class="fixed-button">' +
        '<a href="https://themeforest.net/item/mega-able-bootstrap-4-and-angular-5-admin-dashboard-template/20790784?ref=phoenixcoded" target="_blank" class="btn btn-md btn-primary">' +
            '<i class="fa fa-shopping-cart" aria-hidden="true"></i> Upgrade To Pro' +
        '</a> ' +
    '</div>' +
'');
var $window = $(window);
var nav = $('.fixed-button');
$window.scroll(function() {
    if ($window.scrollTop() >= 200) {
        nav.addClass('active');
    } else {
        nav.removeClass('active');
    }
});

// SETUP
// /////////////////////////////////
// assign names to things we'll need to use more than once
const csSelector = document.querySelector("#myCustomSelect"); // the input, svg and ul as a group
const csInput = csSelector.querySelector("input");
const csList = csSelector.querySelector("ul");
const csOptions = csList.querySelectorAll("li");
const csIcons = csSelector.querySelectorAll("svg");
const csStatus = document.querySelector("#custom-select-status");
const aOptions = Array.from(csOptions);

// when JS is loaded, set up our starting point
// if JS fails to load, the custom select remains a plain text input
// create and set start point for the state tracker
let csState = "initial";
// inform assistive tech (screen readers) of the names & roles of the elements in our group
csSelector.setAttribute("role", "combobox");
csSelector.setAttribute("aria-haspopup", "listbox");
csSelector.setAttribute("aria-owns", "custom-select-list"); // container owns the list...
csInput.setAttribute("aria-autocomplete", "both");
csInput.setAttribute("aria-controls", "custom-select-list"); // ...but the input controls it
csList.setAttribute("role", "listbox");
csOptions.forEach(function (option) {
  option.setAttribute("role", "option");
  option.setAttribute("tabindex", "-1"); // make li elements keyboard focusable by script only
});
// set up a message to keep screen reader users informed of what the custom input is for/doing
csStatus.textContent =
  csOptions.length +
  " options available. Arrow down to browse or start typing to filter.";

// EVENTS
// /////////////////////////////////
csSelector.addEventListener("click", function (e) {
  const currentFocus = findFocus();
  switch (csState) {
    case "initial": // if state = initial, toggleOpen and set state to opened
      toggleList("Open");
      setState("opened");
      break;
    case "opened":
      // if state = opened and focus on input, toggleShut and set state to initial
      if (currentFocus === csInput) {
        toggleList("Shut");
        setState("initial");
      } else if (currentFocus.tagName === "LI") {
        // if state = opened and focus on list, makeChoice, toggleShut and set state to closed
        makeChoice(currentFocus);
        toggleList("Shut");
        setState("closed");
      }
      break;
    case "filtered":
      // if state = filtered and focus on list, makeChoice and set state to closed
      if (currentFocus.tagName === "LI") {
        makeChoice(currentFocus);
        toggleList("Shut");
        setState("closed");
      } // if state = filtered and focus on input, do nothing (wait for next user input)

      break;
    case "closed": // if state = closed, toggleOpen and set state to filtered? or opened?
      toggleList("Open");
      setState("filtered");
      break;
  }
});

csSelector.addEventListener("keyup", function (e) {
  doKeyAction(e.key);
});

document.addEventListener("click", function (e) {
  if (!e.target.closest("#myCustomSelect")) {
    // click outside of the custom group
    toggleList("Shut");
    setState("initial");
  }
});

// FUNCTIONS
// /////////////////////////////////

function toggleList(whichWay) {
  if (whichWay === "Open") {
    csList.classList.remove("hidden-all");
    csSelector.setAttribute("aria-expanded", "true");
  } else {
    // === 'Shut'
    csList.classList.add("hidden-all");
    csSelector.setAttribute("aria-expanded", "false");
  }
}

function findFocus() {
  const focusPoint = document.activeElement;
  return focusPoint;
}

function moveFocus(fromHere, toThere) {
  // grab the currently showing options, which might have been filtered
  const aCurrentOptions = aOptions.filter(function (option) {
    if (option.style.display === "") {
      return true;
    }
  });
  // don't move if all options have been filtered out
  if (aCurrentOptions.length === 0) {
    return;
  }
  if (toThere === "input") {
    csInput.focus();
  }
  // possible start points
  switch (fromHere) {
    case csInput:
      if (toThere === "forward") {
        aCurrentOptions[0].focus();
      } else if (toThere === "back") {
        aCurrentOptions[aCurrentOptions.length - 1].focus();
      }
      break;
    case csOptions[0]:
      if (toThere === "forward") {
        aCurrentOptions[1].focus();
      } else if (toThere === "back") {
        csInput.focus();
      }
      break;
    case csOptions[csOptions.length - 1]:
      if (toThere === "forward") {
        aCurrentOptions[0].focus();
      } else if (toThere === "back") {
        aCurrentOptions[aCurrentOptions.length - 2].focus();
      }
      break;
    default:
      // middle list or filtered items
      const currentItem = findFocus();
      const whichOne = aCurrentOptions.indexOf(currentItem);
      if (toThere === "forward") {
        const nextOne = aCurrentOptions[whichOne + 1];
        nextOne.focus();
      } else if (toThere === "back" && whichOne > 0) {
        const previousOne = aCurrentOptions[whichOne - 1];
        previousOne.focus();
      } else {
        // if whichOne = 0
        csInput.focus();
      }
      break;
  }
}

function doFilter() {
  const terms = csInput.value;
  const aFilteredOptions = aOptions.filter(function (option) {
    if (option.innerText.toUpperCase().startsWith(terms.toUpperCase())) {
      return true;
    }
  });
  csOptions.forEach((option) => (option.style.display = "none"));
  aFilteredOptions.forEach(function (option) {
    option.style.display = "";
  });
  setState("filtered");
  updateStatus(aFilteredOptions.length);
}

function updateStatus(howMany) {
  csStatus.textContent = howMany + " options available.";
}

function makeChoice(whichOption) {
  const optionTitle = whichOption.querySelector("strong");
  csInput.value = optionTitle.textContent;
  moveFocus(document.activeElement, "input");
  // update aria-selected, if using
}

function setState(newState) {
  switch (newState) {
    case "initial":
      csState = "initial";
      break;
    case "opened":
      csState = "opened";
      break;
    case "filtered":
      csState = "filtered";
      break;
    case "closed":
      csState = "closed";
  }
  // console.log({csState})
}

function doKeyAction(whichKey) {
  const currentFocus = findFocus();
  switch (whichKey) {
    case "Enter":
      if (csState === "initial") {
        // if state = initial, toggleOpen and set state to opened
        toggleList("Open");
        setState("opened");
      } else if (csState === "opened" && currentFocus.tagName === "LI") {
        // if state = opened and focus on list, makeChoice and set state to closed
        makeChoice(currentFocus);
        toggleList("Shut");
        setState("closed");
      } else if (csState === "opened" && currentFocus === csInput) {
        // if state = opened and focus on input, close it
        toggleList("Shut");
        setState("closed");
      } else if (csState === "filtered" && currentFocus.tagName === "LI") {
        // if state = filtered and focus on list, makeChoice and set state to closed
        makeChoice(currentFocus);
        toggleList("Shut");
        setState("closed");
      } else if (csState === "filtered" && currentFocus === csInput) {
        // if state = filtered and focus on input, set state to opened
        toggleList("Open");
        setState("opened");
      } else {
        // i.e. csState is closed, or csState is opened/filtered but other focus point?
        // if state = closed, set state to filtered? i.e. open but keep existing input?
        toggleList("Open");
        setState("filtered");
      }
      break;

    case "Escape":
      // if state = initial, do nothing
      // if state = opened or filtered, set state to initial
      // if state = closed, do nothing
      if (csState === "opened" || csState === "filtered") {
        toggleList("Shut");
        setState("initial");
      }
      break;

    case "ArrowDown":
      if (csState === "initial" || csState === "closed") {
        // if state = initial or closed, set state to opened and moveFocus to first
        toggleList("Open");
        moveFocus(csInput, "forward");
        setState("opened");
      } else {
        // if state = opened and focus on input, moveFocus to first
        // if state = opened and focus on list, moveFocus to next/first
        // if state = filtered and focus on input, moveFocus to first
        // if state = filtered and focus on list, moveFocus to next/first
        toggleList("Open");
        moveFocus(currentFocus, "forward");
      }
      break;
    case "ArrowUp":
      if (csState === "initial" || csState === "closed") {
        // if state = initial, set state to opened and moveFocus to last
        // if state = closed, set state to opened and moveFocus to last
        toggleList("Open");
        moveFocus(csInput, "back");
        setState("opened");
      } else {
        // if state = opened and focus on input, moveFocus to last
        // if state = opened and focus on list, moveFocus to prev/last
        // if state = filtered and focus on input, moveFocus to last
        // if state = filtered and focus on list, moveFocus to prev/last
        moveFocus(currentFocus, "back");
      }
      break;
    default:
      if (csState === "initial") {
        // if state = initial, toggle open, doFilter and set state to filtered
        toggleList("Open");
        doFilter();
        setState("filtered");
      } else if (csState === "opened") {
        // if state = opened, doFilter and set state to filtered
        doFilter();
        setState("filtered");
      } else if (csState === "closed") {
        // if state = closed, doFilter and set state to filtered
        doFilter();
        setState("filtered");
      } else {
        // already filtered
        doFilter();
      }
      break;
  }
}
