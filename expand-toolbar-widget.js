/*\
title: $:/plugins/axxie/clear-view/expand-toolbar-widget.js
type: application/javascript
module-type: widget

Widget that places required visual and hidden elements into the dom.
The expanding and collapsing is implemented by css.

\*/

(function () {

    /*jslint node: true, browser: true */
    /*global $tw: false */
    "use strict";

    var Widget = require("$:/core/modules/widgets/widget.js").widget;

    var ExpandToolbar = function (parseTreeNode, options) {
        this.initialise(parseTreeNode, options);
    };

    var globalId = 1;

    /*
    Inherit from the base widget class
    */
    ExpandToolbar.prototype = new Widget();

    /*
    Render this widget into the DOM
    */
    ExpandToolbar.prototype.render = function (parent, nextSibling) {
        this.parentDomNode = parent;
        var buttonClass = this.wiki.getTiddlerText("$:/config/Toolbar/ButtonClass", ".tc-btn-invisible");
        var id = "collapse" + globalId++;
        var html = 
            '<input id="' + id + '" type="checkbox" class="toolbar-expander-checkbox">' +
            '<label for="' + id + '" class="' + buttonClass + ' toolbar-expander">' + 
            this.wiki.getTiddlerText("$:/core/images/chevron-left", "") +
            '</label>' + 
            '<label for="' + id + '" class="' + buttonClass + ' toolbar-collapser">' + 
            this.wiki.getTiddlerText("$:/core/images/chevron-right", "") +
            '</label>';


        var template = this.document.createElement('div');
        template.innerHTML = html;
        var tiddlerViewFrame = parent;
        while (tiddlerViewFrame && !tiddlerViewFrame.classList.contains('tc-tiddler-view-frame')) {
            tiddlerViewFrame = tiddlerViewFrame.parentElement;
        }

        if (!tiddlerViewFrame) return;

        var tiddlerControls = tiddlerViewFrame.getElementsByClassName('tc-tiddler-controls')[0]

        tiddlerControls.insertAdjacentElement("beforebegin", template.firstChild);
        tiddlerControls.insertAdjacentElement("beforebegin", template.firstChild);
        tiddlerControls.insertAdjacentElement("afterend", template.firstChild);
    };

    /*
    Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
    */
    ExpandToolbar.prototype.refresh = function (changedTiddlers) {
        return false;
    };

    exports['expand-toolbar'] = ExpandToolbar;

})();
