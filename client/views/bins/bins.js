Template.bins.itemBin = function() {
  return Session.get("itemBin");
}

Template.bins.itemSrc = function() {
  return Session.get("itemSrc");
}

/*
Template.bins.events = {
  'drag #theItem': function(event) {
    event.preventDefault();
  },
  'drop #theItem': function(event) {
    event.preventDefault();

    var setNewItem = function() {
      var items = Items.find();
      var i = Math.floor(Math.random() * items.count());
      var item = items.fetch()[i];
      Session.set("itemBin", item.bin);
      Session.set("itemSrc", item.src);
    }();
  }

}
*/


Template.bins.rendered = function() {

  var theItemTarget = document.getElementsByTagName("img")[0];
  var theBins= document.getElementById("bins");
  var score = Session.get("score") || 0;

	var yuiLoaded = function() {

    YUI({ filter: 'raw' }).use('dd-drop', 'dd-proxy', 'dd-constrain', 'dd-ddm-drop', function(Y) {

      var setNewItem = function() {
        var items = Items.find();
        var i = Math.floor(Math.random() * items.count());
        var item = items.fetch()[i];
        Session.set("itemBin", item.bin);
        Session.set("itemSrc", item.src);
      };

      var ddItem = new Y.DD.Drag({
            node: '.drag',
      });

      ddItem.on('drag:start', function(){
            var	n = this.get('node');
                n.setStyle('opacity', .25);
      });

      var shakeBin = function(target) {
        
        setTimeout(function() {
          target.setAttribute("class", "target shake yui3-dd-drop");
        }, 100);
         target.setAttribute("class", "target");
      };

      function removeHoverState(e) {
        var dropTarget = e.drop.get('node');
        var targetId = dropTarget.get('id');

        if ( targetId === "binR" ) {
          dropTarget.setAttribute("src", "singlestream.png");
          theItemTarget.setAttribute("class", "drag");
        }
        if ( targetId === "binT" ) {
          dropTarget.setAttribute("src", "trash.png");
          theItemTarget.setAttribute("class", "drag");
        }
        if ( targetId === "binC" ) {
          dropTarget.setAttribute("src", "compost.png");
          theItemTarget.setAttribute("class", "drag");
        }

      }

      function addHoverState(e) {
        var dropTarget = e.drop.get('node');
        var targetId = dropTarget.get('id');

        if ( targetId === "binR" ) {
          dropTarget.setAttribute("src", "singlestream-hover.png");
          theItemTarget.setAttribute("class", "drag shrink-it");
        }
        if ( targetId === "binT" ) {
          dropTarget.setAttribute("src", "trash-hover.png");
          theItemTarget.setAttribute("class", "drag shrink-it");
        }
        if ( targetId === "binC" ) {
          dropTarget.setAttribute("src", "compost-hover.png");
          theItemTarget.setAttribute("class", "drag shrink-it");
        }
      }

      ddItem.on('drag:enter', function(e) {
        addHoverState(e);
      });

      ddItem.on('drag:exit', function(e) {
        removeHoverState(e);
      });

      var dropNodes = Y.Node.all('.target');

      dropNodes.each(function(v, k) {
        var tar = new Y.DD.Drop({
          node: v
        });
      });

      Y.DD.DDM.on('drag:drophit', function(e) {

        var itemDragged = e.drag.get('node');
        // var thisItemId = itemDragged.get('id');
        var thisItemId = Session.get("itemBin");

        var dropTarget = e.drop.get('node');
        var targetId = dropTarget.get('id');

        removeHoverState(e);

        if ( targetId === "binR" && thisItemId === "recycling" || targetId === "binR" && thisItemId === "recycling-compost" ) {
          score += 100;
          // correctBin.play();
        } else if ( targetId === "binT" && thisItemId === "trash" ) {
          score += 100;
          //correctBin.play();
        } else if ( targetId === "binC" && thisItemId === "compost" || targetId === "binC" && thisItemId === "recycling-compost") {
          score += 100;
          //correctBin.play();
        } else {
          score -= 100;
          shakeBin(dropTarget);
        }

        // update score in session
        Session.set("score", score);

        // pick a new item
        setNewItem();

      });

      ddItem.on('drag:end', function(e) {
        e.preventDefault();
        var n = this.get('node');
        n.setStyle('opacity', '1');
      });
    });

	};

	Meteor.Loader.loadJs("http://yui.yahooapis.com/3.17.2/build/yui/yui-min.js", yuiLoaded, 10000);

};
