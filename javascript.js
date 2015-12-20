AnimationTriggers = {
  triggers: [],

  add: function(key, scrollPositionOffset) {
    var trigger = document.querySelectorAll('.animtrig-' + key)[0];
    scrollPoint = ScrollMeasures.getOffSet(trigger);
    this.triggers.push({
      target: trigger,
      classAttr: key + '--animate',
      scrollPoint: (scrollPoint - scrollPositionOffset)
    });
  },

  scrollHandler: function() {
    var triggerCount = AnimationTriggers.triggers.length;

    for (var x = 0; x < triggerCount; x ++) {
      var trigger = AnimationTriggers.triggers[x],
          classNotAdded = trigger.target.className.indexOf(trigger.classAttr) === -1,
          scrollPointPassed = ScrollMeasures.bodyTop() > trigger.scrollPoint;

      if (scrollPointPassed && classNotAdded) {
        trigger.target.className = trigger.target.className + ' ' + trigger.classAttr;
      }
    }
  }
}

ScrollMeasures = {
  bodyTop: function() {
    return Math.abs(document.body.getBoundingClientRect().top);
  },

  getOffSet: function(trigger) {
    var elTop = trigger.getBoundingClientRect().top;
    return this.bodyTop() + elTop;
  }
}

Utilities = {
  apiCall: function(page) {
    window.jsonpCallback = function(data) {
      window.data = data;
    }
    var head = document.head;
    var script = document.createElement("script");
    script.setAttribute("src", "http://shadowcatfilms.com/api/" + page);
    head.appendChild(script);
  },

  loadReact: function(page) {
    window.onload = function() {
      React.render(
        React.createElement(window[page[0].toUpperCase() + page.slice(1)]),
        document.getElementById('react-' + page)
      );
    }
  }
}

window.onscroll = AnimationTriggers.scrollHandler;

var AsidePanel = React.createClass({displayName: "AsidePanel",
  getButton: function() {
    var button = null;
    if (this.props['aside-type'] =='signpost') {
      button = React.createElement("a", {className: "aside-panel__link button", href: this.props['slug']}, this.props['link-text'])
    }
    return button;
  },

  getImage: function() {
    var image = null;
    if (this.props['aside-type'] =='image' || this.props['aside-type'] =='signpost') {
      image = React.createElement("img", {className: "aside-panel__image", src: 'http://shadowcatfilms.com/' + this.props['image-src']})
    }
    return image;
  },

  hoverOverride: function() {
    hoverOverride = '';
    if (this.props['aside-type'] =='info') {
      hoverOverride = 'aside-panel__details--always-shown';
    }
    return hoverOverride;
  },

  render: function() {
    return (
      React.createElement("section", {className: 'aside-panel aside-panel--' + this.props['type'] + ' ' + this.props['layout-class'] + ' ' + this.props['colour']}, 
        this.getImage(), 
        React.createElement("div", {className: 'aside-panel__details ' + this.hoverOverride()}, 
          React.createElement("h2", {className: "aside-panel__heading"}, this.props['heading']), 
          React.createElement("p", {className: "aside-panel__text"}, this.props['text']), 
          this.getButton()
        )
      )
    )
  }
});

var BreadCrumbs = React.createClass({displayName: "BreadCrumbs",
  buildCrumbs: function() {
    var crumbs = this.props['bread-crumbs'];
    var rows = [];
    var x = 0;
    crumbs.forEach(function(crumb) {
      if (crumb.slug !== null) {
        rows.push(React.createElement("li", {className: "bread-crumbs__crumb"}, React.createElement("a", {href: '/' + crumb.slug}, crumb.name)));
      } else {
        rows.push(React.createElement("li", {className: "bread-crumbs__crumb bread-crumbs__crumb--last"}, React.createElement("span", null, crumb.name)));
      }
      x ++;
    });
    return rows;
  },

  render: function() {
    return (
      React.createElement("div", {className: "bread-crumbs"}, 
        React.createElement("ul", null, 
          this.buildCrumbs()
        )
      )
    )
  }
});

var ButtonCta = React.createClass({displayName: "ButtonCta",
  render: function() {
    return (
      React.createElement("div", {className: "button-cta"}
      )
    )
  }
});

var ButtonLarge = React.createClass({displayName: "ButtonLarge",
  render: function() {
    return (
      React.createElement("div", {className: "button-large"}
      )
    )
  }
});

var ButtonSmall = React.createClass({displayName: "ButtonSmall",
  render: function() {
    return (
      React.createElement("div", {className: "button-small"}
      )
    )
  }
});

var ButtonSubmit = React.createClass({displayName: "ButtonSubmit",
  render: function() {
    return (
      React.createElement("div", {className: "button-submit"}
      )
    )
  }
});

var ContactDetail = React.createClass({displayName: "ContactDetail",
  render: function() {
    return (
      React.createElement("div", {className: "contact-detail"}
      )
    )
  }
});

var ImageThumbnail = React.createClass({displayName: "ImageThumbnail",
  render: function() {
    return (
      React.createElement("div", {className: "image-thumbnail"}
      )
    )
  }
});

var InputText = React.createClass({displayName: "InputText",
  render: function() {
    return (
      React.createElement("div", {className: "input-text"}
      )
    )
  }
});

var InputTextarea = React.createClass({displayName: "InputTextarea",
  render: function() {
    return (
      React.createElement("div", {className: "input-textarea"}
      )
    )
  }
});

var KeyValueDetail = React.createClass({displayName: "KeyValueDetail",
  render: function() {
    return (
      React.createElement("div", {className: "key-value-detail"}
      )
    )
  }
});

var Logo = React.createClass({displayName: "Logo",
  render: function() {
    return (
      React.createElement("img", {className: "logo", src: "assets/img/logo.svg"})
    )
  }
});

var Map = React.createClass({displayName: "Map",
  render: function() {
    return (
      React.createElement("iframe", {
        className: 'map ' + this.props['parent-element'] + '__map', 
        frameborder: "0", 
        src: "https://www.google.com/maps/embed/v1/place?zoom=13&key=AIzaSyBgYZX_kaXMWqE-HVoXAqJQmrDhFZZ9ReU&q=" + this.props['address'].replace(/ /g, '+'), allowfullscreen: true}
      )
    )
  }
});

var Navigation = React.createClass({displayName: "Navigation",
  buildList: function() {
    var navItems = this.props['nav-items'];
    var rows = [];
    var x = 0;
    navItems.forEach(function(navItem) {
      rows.push(React.createElement(NavigationLink, {key: 'nav' + x, slug: navItem.slug, name: navItem.name, selected: navItem.selected}));
      x ++;
    });
    return rows;
  },

  getInitialState: function() {
    return({
      'open': false
    });
  },

  openClass: function() {
    return this.state.open ? 'is-open' : 'is-closed';
  },

  slideMenu: function() {
    this.state.open = this.state.open ? false : true;
    this.setState(this.state);
  },

  render: function() {
    return (
      React.createElement("nav", {className: 'navigation ' + this.openClass()}, 
        React.createElement("div", {className: "navigation__links"}, 
          React.createElement("ul", null, 
            this.buildList()
          ), 
          React.createElement("div", {className: "navigation__close", onClick: this.slideMenu}, "close")
        ), 
        React.createElement("a", {className: "navigation__trigger button", onClick: this.slideMenu}, "Menu")
      )
    )
  }
});

var NavigationLink = React.createClass({displayName: "NavigationLink",
  navLiClass: function() {
    return 'navigation__item navigation__item--' + this.props.slug;
  },
  navLinkClass: function() {
    return 'navigation__link navigation__link--' + this.props.slug + ' ' + this.navSelected();
  },
  navSelected: function() {
    return true === this.props.selected ? 'selected' : ''
  },
  navUrl: function() {
    return '/' + this.props.slug + '.html';
  },
  render: function() {
    return (
      React.createElement("li", {className: this.navLiClass()}, 
        React.createElement("a", {className: this.navLinkClass(), href: this.navUrl()}, 
          this.props.name
        )
      )
    )
  }
});

var PageHeading = React.createClass({displayName: "PageHeading",
  render: function() {
    return (
      React.createElement("div", {className: "page-heading"}
      )
    )
  }
});

var ProjectSummary = React.createClass({displayName: "ProjectSummary",
  getTestimonials: function() {
    var testimonials = this.props['project-summary'].testimonials;
    var rows = [];
    var x = 0;
    testimonials.forEach(function(testimonial) {
      rows.push(
        React.createElement(Testimonial, {
          key: 'project-summary' + x, 
          testimonial: testimonial})
      );
      x ++;
    });
    return rows;
  },

  componentDidMount: function() {
    window.AnimationTriggers.add('project-image-' + this.props['position'], 450);
    window.AnimationTriggers.add('project-button-' + this.props['position'], 450);
  },

  render: function() {
    return (
      React.createElement("article", {className: 'project-summary project-summary--' + this.props['project-type']}, 
        React.createElement("div", {className: "project-summary__text"}, 
          React.createElement("h1", {className: "project-summary__heading"}, this.props['project-summary'].name), 
          React.createElement("div", {className: "project-summary__details", dangerouslySetInnerHTML: {__html: this.props['project-summary'].node_html}}), 
          React.createElement("div", {className: "project-summary__testimonials"}, 
            this.getTestimonials()
          )
        ), 
        React.createElement("aside", {className: "project-summary__aside"}, 
          React.createElement("img", {className: 'animtrig-project-image-' + this.props['position'] + ' project-summary__image', src: 'http://shadowcatfilms.com/' + this.props['project-summary'].image}), 
          React.createElement("a", {href: "#", className: 'animtrig-project-button-' + this.props['position'] + ' button project-summary__button'}, "View project")
        )
      )
    )
  }
});

var SectionHeadingSimple = React.createClass({displayName: "SectionHeadingSimple",
  render: function() {
    return (
      React.createElement("div", {className: "section-heading-simple"}
      )
    )
  }
});

var SectionHeadingWithStrapline = React.createClass({displayName: "SectionHeadingWithStrapline",
  render: function() {
    return (
      React.createElement("div", {className: "section-header"}, 
        React.createElement("h1", {className: "section-header__heading"}, this.props.heading), 
        React.createElement("h2", {className: "section-header__strapline"}, this.props.strapline)
      )
    )
  }
});

var Testimonial = React.createClass({displayName: "Testimonial",
  render: function() {
    return (
      React.createElement("blockquote", {className: "testimonial"}, 
        React.createElement("div", {className: "testimonial__quote", dangerouslySetInnerHTML: {__html: this.props['testimonial'].node_html}}
        ), 
        React.createElement("span", {className: "testimonial__credit"}, this.props['testimonial'].credit)
      )
    )
  }
});

var Aside = React.createClass({displayName: "Aside",
  render: function() {
    return (
      React.createElement("div", {className: "aside"}
      )
    )
  }
});

var BlogSmall = React.createClass({displayName: "BlogSmall",
  buildList: function() {
    var blogPosts = this.props['blog-posts'];
    var rows = [];
    var x = 0;
    blogPosts.forEach(function(post) {
      rows.push(
        React.createElement(BlogPostSmall, {
          heading: post.name, 
          date: post.created, 
          text: post.node_html})
      );
      x ++;
    });
    return rows;
  },
  render: function() {
    return (
      React.createElement("div", {className: "background background--grey-very-light"}, 
        React.createElement("div", {className: "blog-small content-is-centred"}, 
          React.createElement(SectionHeadingWithStrapline, {heading: "Blog Latest", strapline: "These are the latest posts from our blog"}), 
          this.buildList()
        )
      )
    )
  }
});

var BlogPostSmall = React.createClass({displayName: "BlogPostSmall",
  render: function() {
    return (
      React.createElement("article", {className: "blog-small__post text"}, 
        React.createElement("h1", {className: "blog-small__post-heading"}, this.props.heading), 
        React.createElement("span", {className: "blog-small__post-date"}, this.props.date), 
        React.createElement("div", {className: "blog-small__post-text text", dangerouslySetInnerHTML: {__html: this.props['text']}}
        )
      )
    )
  }
});

var ButtonPair = React.createClass({displayName: "ButtonPair",
  render: function() {
    return (
      React.createElement("div", {className: "button-pair"}, 
        React.createElement("a", {className: "button-pair__button button-pair__button-1 button", href: '/' + this.props['link-details'][1].slug + '.html'}, this.props['link-details'][1].name), 
        React.createElement("a", {className: "button-pair__button button-pair__button-2 button", href: '/' + this.props['link-details'][2].slug + '.html'}, this.props['link-details'][2].name)
      )
    )
  }
});

var CallToAction = React.createClass({displayName: "CallToAction",
  render: function() {
    return (
      React.createElement("div", {className: "background background--orange-dark call-to-action__background"}, 
        React.createElement("article", {className: "content-is-centred call-to-action"}, 
          React.createElement("h1", {className: "call-to-action__heading"}, this.props.heading), 
          React.createElement("a", {className: "call-to-action__button button", href: this.props['button-slug'] + '.html'}, this.props['button-text'])
        )
      )
    )
  }
});

var ChoiceProjects = React.createClass({displayName: "ChoiceProjects",
  render: function() {
    return (
      React.createElement("div", {className: "choice-projects"}
      )
    )
  }
});

var Contact = React.createClass({displayName: "Contact",
  render: function() {
    return (
      React.createElement("div", {className: "background background--blue-dark"}, 
        React.createElement("div", {className: "contact content-is-centred"}, 
          React.createElement(SectionHeadingWithStrapline, {heading: "Get In Touch", strapline: "Please use any of the methods below to get in touch. We’d love to hear from you about anything."}), 
          React.createElement("form", {className: "contact__form"}, 
            React.createElement("label", {htmlFor: "name", className: "contact__form-label"}, "Name:"), 
            React.createElement("input", {id: "name", className: "contact__form-input", type: "text", placeholder: "Enter your name"}), 
            React.createElement("label", {htmlFor: "telephone", className: "contact__form-label"}, "Telephone:"), 
            React.createElement("input", {id: "telephone", className: "contact__form-input", type: "text", placeholder: "Enter your telephone number"}), 
            React.createElement("label", {htmlFor: "email", className: "contact__form-label"}, "Email:"), 
            React.createElement("input", {id: "email", className: "contact__form-input", type: "text", placeholder: "you@example.com"}), 
            React.createElement("label", {htmlFor: "message", className: "contact__form-label"}, "Message:"), 
            React.createElement("textarea", {id: "message", className: "contact__form-input contact__form-textarea", type: "text", placeholder: "Your message"}
            ), 
            React.createElement("button", {className: "contact__form-submit button"}, "Send contact")
          ), 
          React.createElement("div", {className: "contact__details"}, 
            React.createElement(Map, {
              address: "16 Monkridge Court, South Gosforth, Newcastle, NE3 1YW", 
              "parent-element": "contact"}), 
            React.createElement("div", {className: "contact__detail"}, 
              React.createElement("span", {className: "contact__detail-heading"}, "Managing Director"), 
              React.createElement("p", {className: "contact__detail-body"}, "Alysoun Sharpe")
            ), 
            React.createElement("div", {className: "contact__detail"}, 
              React.createElement("span", {className: "contact__detail-heading"}, "Telephone"), 
              React.createElement("p", {className: "contact__detail-body"}, React.createElement("a", {href: "tel:01234567890"}, "01234 567 890"))
            ), 
            React.createElement("div", {className: "contact__detail"}, 
              React.createElement("span", {className: "contact__detail-heading"}, "Address"), 
              React.createElement("p", {className: "contact__detail-body"}, 
                "3 The Street,", React.createElement("br", null), 
                "A Little Town Somewhere,", React.createElement("br", null), 
                "That County,", React.createElement("br", null), 
                "AB12 3CD"
              )
            ), 
            React.createElement("div", {className: "contact__detail"}, 
              React.createElement("span", {className: "contact__detail-heading"}, "Email"), 
              React.createElement("p", {className: "contact__detail-body"}, React.createElement("a", {href: "mailto:email@shadowcatfilms.co.uk"}, "email@shadowcatfilms.co.uk"))
            )
          )
        )
      )
    )
  }
});

var Footer = React.createClass({displayName: "Footer",
  render: function() {
    return (
      React.createElement("div", {className: "background background--black"}, 
        React.createElement("footer", {className: "footer content-is-centred"}, 
          React.createElement("ul", {className: "footer__social"}, 
            React.createElement("li", {className: "footer__social-link facebook"}, React.createElement("a", {href: "#"}, "Facebook")), 
            React.createElement("li", {className: "footer__social-link twitter"}, React.createElement("a", {href: "#"}, "Twitter")), 
            React.createElement("li", {className: "footer__social-link youtube"}, React.createElement("a", {href: "#"}, "Youtube"))
          ), 
          React.createElement("span", {className: "footer__copywrite"}, "© 2015 Shadowcat Films")
        )
      )
    )
  }
});

var Header = React.createClass({displayName: "Header",
  render: function() {
    return (
      React.createElement("div", {className: "background background--grey-very-light"}, 
        React.createElement("header", {className: "content-is-centred header"}, 
          React.createElement(Logo, null), 
          React.createElement("div", {className: "header__business-name"}, "Shadowcat Films"), 
          React.createElement(Navigation, {"nav-items": this.props['nav-items'], selected: this.props['page-slug']})
        )
      )
    )
  }
});

var Heading = React.createClass({displayName: "Heading",
  render: function() {
    return (
      React.createElement("div", {className: "heading", style: { backgroundImage: 'url(' + this.props['background'] + ')'}}, 
        React.createElement("div", {className: "heading__tinted-overlay"}, 
          React.createElement("div", {className: "heading__content content-is-centred"}, 
            React.createElement("h1", {className: "heading__title"}, this.props['title']), 
            React.createElement("span", {className: "heading__strapline"}, this.props['strapline'])
          )
        )
      )
    )
  }
});

var ImageFixed = React.createClass({displayName: "ImageFixed",
  render: function() {
    return (
      React.createElement("div", {className: "image-fixed", style: { backgroundImage: 'url("' + this['props'].src + '")'}}, 
        React.createElement("div", {className: "content-is-centred"}, 
          React.createElement("h2", {className: "image-fixed__heading"}, React.createElement("span", {className: "image-fixed__heading-wrapper"}, this['props'].heading)), 
          React.createElement("span", {className: "image-fixed__strapline"}, this['props'].strapline)
        )
      )
    )
  }
});

var Lightbox = React.createClass({displayName: "Lightbox",
  render: function() {
    return (
      React.createElement("div", {className: "lightbox"}
      )
    )
  }
});

var OurChoiceProjects = React.createClass({displayName: "OurChoiceProjects",
  buildPanels: function() {
    var projects = this.props['projects'];
    var rows = [];
    var x = 0;
    projects.forEach(function(project) {
      rows.push(
        React.createElement(AsidePanel, {
          key: 'proj' + x, 
          "layout-class": "tile", 
          "aside-type": "signpost", 
          heading: project.name, 
          "image-src": project.image, 
          slug: project.url, 
          "link-text": "View project", 
          type: project.project_type, 
          text: project.short_desc})
      );
      x ++;
    });
    return rows;
  },

  componentDidMount: function() {
    window.AnimationTriggers.add('our-choice-projects', 200);
  },

  render: function() {
    return (
      React.createElement("article", {className: "animtrig-our-choice-projects our-choice-projects content-is-centred"}, 
        React.createElement("h1", {className: "our-choice-projects__heading"}, "Our choice projects"), 
        React.createElement("div", {className: "our-choice-projects__choices tiles"}, 
          this.buildPanels()
        )
      )
    )
  }
});

var ServiceTestimonials = React.createClass({displayName: "ServiceTestimonials",
  buildPanels: function() {
    var _this = this;
    var projects = this.props['projects'];
    var rows = [];
    var x = 0;
    projects.forEach(function(project) {
      rows.push(
        React.createElement(ProjectSummary, {
          key: 'ps-' + x, 
          position: 'pos-' + (x + 1), 
          "project-summary": project, 
          "project-type": _this.props['project-type']})
      );
      x ++;
    });
    return rows;
  },

  render: function() {
    return (
      React.createElement("section", {className: "background background--grey-very-light service-testimonials__background"}, 
        React.createElement("div", {className: "animtrig-service-testimonials service-testimonials content-is-centred"}, 
          React.createElement(SectionHeadingWithStrapline, {heading: "Projects & Testimonials", strapline: "See our three choice projects"}), 
          this.buildPanels()
        )
      )
    )
  }
});

var ServicesIntroduction = React.createClass({displayName: "ServicesIntroduction",
  getButtonDetails: function() {
    return {
      1: {
        name: 'Documentaries',
        slug: 'documentaries'
      },
      2: {
        name: 'Video Production',
        slug: 'video-production'
      }
    };
  },
  render: function() {
    return (
      React.createElement("article", {className: "services-introduction content-is-centred"}, 
        React.createElement("h1", {className: "services-introduction__heading"}, "Find out all about our services"), 
        React.createElement(ButtonPair, {"link-details": this.getButtonDetails()}), 
        React.createElement("div", {className: "services-introduction__text text", dangerouslySetInnerHTML: {__html: this.props['services-text']}}
        )
      )
    )
  }
});

var Text = React.createClass({displayName: "Text",
  render: function() {
    return (
      React.createElement("section", {className: "text"}, 
        React.createElement("h1", null, this.props['heading']), 
        React.createElement("div", {dangerouslySetInnerHTML: {__html: this.props['text']}})
      )
    )
  }
});

var TextDetails = React.createClass({displayName: "TextDetails",

  componentDidMount: function() {
    window.AnimationTriggers.add('text-details-' + this.props['position'], 200);
  },

  render: function() {
    return (
      React.createElement("section", {className: "background background--grey-very-light"}, 
        React.createElement("div", {className: 'animtrig-text-details-' + this.props['position'] + ' text-details text-details--text-is-' + this.props['align-text'] + ' content-is-centred'}, 
          React.createElement("div", {className: "text-details__text"}, 
            React.createElement(Text, {heading: this.props['heading'], text: this.props['text']})
          ), 
          React.createElement("aside", {className: "text-details__aside"}, 
            React.createElement(AsidePanel, {
              "layout-class": "text-details__aside-panel", 
              heading: "This is a new aside", 
              "aside-type": "info", 
              type: "", 
              text: "Meggings cray Carles Odd Future, aesthetic next level lumbersexual street art stumptown", 
              colour: this.props['aside-colours'][0]}), 
            React.createElement(AsidePanel, {
              "layout-class": "text-details__aside-panel", 
              heading: "My new aside is also here", 
              "aside-type": "image", 
              "image-src": this.props['aside-images'][0], 
              type: "", 
              text: "Plaid High Life you probably haven't heard of them polaroid, try-hard cornhole Pinterest.", 
              colour: this.props['aside-colours'][1]}), 
            React.createElement(AsidePanel, {
              "layout-class": "text-details__aside-panel", 
              heading: "And another aside panel", 
              "aside-type": "image", 
              "image-src": this.props['aside-images'][1], 
              type: "", 
              text: "Cornhole quinoa Wes Anderson, typewriter chillwave forage yr heirloom squid fashion axe you probably haven't heard of them viral brunch.", 
              colour: this.props['aside-colours'][2]})
          )
        )
      )
    )
  }
});

var ThumbnailGallery = React.createClass({displayName: "ThumbnailGallery",
  render: function() {
    return (
      React.createElement("div", {className: "thumbnail-gallery"}
      )
    )
  }
});

var VideoPanel = React.createClass({displayName: "VideoPanel",
  render: function() {
    return (
      React.createElement("div", {className: "video-panel background background--blacker"}, 
        React.createElement(SectionHeadingWithStrapline, {heading: "Documentaries Showreel Video", strapline: "A collection of excerpts from our documentary films"}), 
        React.createElement(VideoPlayer, {src: this.props.src})
      )
    )
  }
});

var VideoPlayer = React.createClass({displayName: "VideoPlayer",
  render: function() {
    return (
      React.createElement("div", {className: "content-is-centred"}, 
        React.createElement("iframe", {className: "video-player", src: this.props.src, frameBorder: "0", webkitAllowFullScreen: true, mozAllowFullScreen: true, allowFullScreen: true})
      )
    )
  }
});

var Blog = React.createClass({displayName: "Blog",
  render: function() {
    return (
      React.createElement("div", {className: "blog"}
      )
    )
  }
});

var BlogPost = React.createClass({displayName: "BlogPost",
  render: function() {
    return (
      React.createElement("div", {className: "blog-post"}
      )
    )
  }
});

var Documentaries = React.createClass({displayName: "Documentaries",
  getInitialState: function() {
    console.log(window.data)
    return window.data;
  },

  render: function() {
    return (
      React.createElement("div", {className: "documentaries background"}, 
        React.createElement(Header, {"page-slug": "documentaries", "nav-items": this.state.navItems}), 
        React.createElement(Heading, {
          background: "assets/backgrounds/documentaries__header.jpg", 
          title: this.state.node.name, 
          strapline: this.state.node.short_desc}), 
        React.createElement(TextDetails, {
          "align-text": "left", 
          heading: "Main Details Text", 
          text: this.state.node_details.node_html, 
          "aside-colours": ['blue-light','blue','grey'], 
          "aside-images": ['assets/img/documentaries__aside-1.jpg','assets/img/documentaries__aside-2.jpg'], 
          position: "1"}), 
        React.createElement(VideoPanel, {src: "http://player.vimeo.com/video/67992157"}), 
        React.createElement(ImageFixed, {
          heading: "This is the fixed image heading", 
          strapline: "Seitan try-hard retro, before they sold out letterpress vegan stumptown.", 
          src: "/assets/backgrounds/documentaries__fixed-1.jpg"}), 
        React.createElement(ServiceTestimonials, {projects: this.state.documentaries, "project-type": "documentary"}), 
        React.createElement(CallToAction, {heading: "Looking for our documentary products?", "button-text": "View Products", "button-slug": "products"}), 
        React.createElement(ImageFixed, {
          heading: "Craft beer dreamcatcher humblebrag", 
          strapline: "Roof party pop-up ugh, tumblr biodiesel organic keffiyeh scenester occupy vegan quinoa.", 
          src: "/assets/backgrounds/documentaries__fixed-2.jpg"}), 
        React.createElement(TextDetails, {
          "align-text": "right", 
          heading: "Secondary Details Text", 
          text: this.state.node_details.secondary_html, 
          "aside-colours": ['grey','blue-light','blue'], 
          "aside-images": ['assets/img/documentaries__aside-3.jpg','assets/img/documentaries__aside-4.jpg'], 
          position: "2"}), 
        React.createElement(ImageFixed, {
          heading: "Bicycle rights hammock flexitarian", 
          strapline: "Chartreuse raw denim aesthetic, knausgaard ugh green juice chillwave kale chips disrupt lo-fi salvia vice.", 
          src: "/assets/backgrounds/documentaries__fixed-3.jpg"}), 
        React.createElement(Contact, null), 
        React.createElement(Footer, null)
      )
    )
  }
});

var Home = React.createClass({displayName: "Home",
  getInitialState: function() {
    console.log(window.data)
    return window.data;
  },

  render: function() {
    return (
      React.createElement("main", {className: "home"}, 
        React.createElement("div", {className: "home__top-wrapper"}, 
          React.createElement(Header, {"page-slug": "home", "nav-items": this.state.navItems}), 
          React.createElement(VideoPlayer, {src: "http://player.vimeo.com/video/95396328"}), 
          React.createElement(ServicesIntroduction, {"services-text":  /* this.state.node_details.node_html */ "<p>Hashtag trust fund Odd Future deep v lumbersexual, biodiesel retro forage occupy butcher. Pork belly art party banjo single-origin coffee flannel, actually sriracha mixtape. Shoreditch mixtape skateboard, banjo migas plaid hoodie Schlitz Brooklyn kitsch trust fund slow-carb. Brooklyn cronut biodiesel.</p><h2>Echo Park Pitchfork</h2><p>Hillwave Wes Anderson listicle fap wayfarers Echo Park paleo readymade lumbersexual tofu +1 you probably havent heard of them. Meggings flannel seitan tilde actually, hoodie cardigan master cleanse occupy.</p><p> Pork belly art party banjo single-origin coffee flannel, actually sriracha mixtape. Shoreditch mixtape skateboard, banjo migas plaid hoodie Schlitz Brooklyn kitsch trust fund slow-carb. Brooklyn cronut biodiesel.</p>" }), 
          React.createElement(OurChoiceProjects, {projects: this.state.home_projects}), 
          React.createElement(CallToAction, {heading: "Looking for our spotlight product?", "button-text": "Get a DVD Copy", "button-slug": "products"}), 
          React.createElement(BlogSmall, {"blog-posts": this.state.home_blog_posts}), 
          React.createElement(Contact, null), 
          React.createElement(Footer, null)
        )
      )
    )
  }
});

var Project = React.createClass({displayName: "Project",
  render: function() {
    return (
      React.createElement("div", {className: "project"}
      )
    )
  }
});

var Video = React.createClass({displayName: "Video",
  getInitialState: function() {
    console.log(window.data)
    return window.data;
  },

  render: function() {
    return (
      React.createElement("div", {className: "video background"}, 
        React.createElement(Header, {"page-slug": "video", "nav-items": this.state.navItems}), 
        React.createElement(Heading, {
          background: "assets/backgrounds/video-production__header.jpg", 
          title: this.state.node.name, 
          strapline: this.state.node.short_desc}), 
        React.createElement(TextDetails, {
          "align-text": "left", 
          heading: "Main Details Text", 
          text: this.state.node_details.node_html, 
          "aside-colours": ['green-light','green','grey'], 
          "aside-images": ['assets/img/video-production__aside-1.jpg','assets/img/video-production__aside-2.jpg'], 
          position: "1"}), 
        React.createElement(VideoPanel, {src: "http://player.vimeo.com/video/67992157"}), 
        React.createElement(ImageFixed, {
          heading: "This is the fixed image heading", 
          strapline: "Seitan try-hard retro, before they sold out letterpress vegan stumptown.", 
          src: "/assets/backgrounds/video-production__fixed-1.jpg"}), 
        React.createElement(ServiceTestimonials, {projects: this.state.videos, "project-type": "video"}), 
        React.createElement(CallToAction, {heading: "Looking for our video products?", "button-text": "View Products", "button-slug": "products"}), 
        React.createElement(ImageFixed, {
          heading: "Craft beer dreamcatcher humblebrag", 
          strapline: "Roof party pop-up ugh, tumblr biodiesel organic keffiyeh scenester occupy vegan quinoa.", 
          src: "/assets/backgrounds/video-production__fixed-2.jpg"}), 
        React.createElement(TextDetails, {
          "align-text": "right", 
          heading: "Secondary Details Text", 
          text: this.state.node_details.secondary_html, 
          "aside-colours": ['grey','green-light','green'], 
          "aside-images": ['assets/img/video-production__aside-3.jpg','assets/img/video-production__aside-4.jpg'], 
          position: "2"}), 
        React.createElement(ImageFixed, {
          heading: "Bicycle rights hammock flexitarian", 
          strapline: "Chartreuse raw denim aesthetic, knausgaard ugh green juice chillwave kale chips disrupt lo-fi salvia vice.", 
          src: "/assets/backgrounds/video-production__fixed-3.jpg"}), 
        React.createElement(Contact, null), 
        React.createElement(Footer, null)
      )
    )
  }
});
