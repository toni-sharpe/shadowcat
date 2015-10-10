var Navigation = React.createClass({displayName: "Navigation",
  buildList: function() {
    var navItems = this.getNavItems();
    var rows = [];
    var x = 0;
    this.getNavItems().forEach(function(navItem) {
      rows.push(React.createElement(NavigationLink, {key: 'nav' + x, slug: navItem.slug, name: navItem.name}));
      x ++;
    });
    return rows;
  },

  getNavItems: function() {
    return [
      {
        name: 'Home',
        slug: 'index'
      },
      {
        name: 'Service',
        slug: 'service'
      },
      {
        name: 'Project',
        slug: 'project'
      },
      {
        name: 'Blog',
        slug: 'blog'
      },
      {
        name: 'Products',
        slug: 'products'
      },
      {
        name: 'Basket',
        slug: 'basket'
      }
    ];
  },

  render: function() {
    return (
      React.createElement("nav", {className: "navigation"}, 
        React.createElement("ul", null, 
          this.buildList()
        )
      )
    )
  }
});
