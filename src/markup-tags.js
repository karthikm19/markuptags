var MarkupTags = function(el){
    this.$el                = el;
    this.$select            = null;
    this.$undoButton        = null;
    this.contentHistory     = [];
    this.init();
};
MarkupTags.prototype = {
    /**
     * Initialize and start
     */
    init: function() {
        this.tagsList = {
            Text: {
                strong:     { label: 'Bold', open: '<strong>', close: '</strong>'       },
                italic:     { label: 'Italic', open: '<i>', close: '</i>'               },
                underlined: { label: 'Underlined', open: '<u>', close: '</u>'           },
                marked:     { label: 'Highlighted', open: '<mark>', close: '</mark>'    },
                deleted:    { label: 'Strike-Through', open: '<s>', close: '</s>'       },
                sub:        { label: 'Subscript', open: '<sub>', close: '</sub>'        },
                sup:        { label: 'Superscript', open: '<sup>', close: '</sup>'      }
            },
            Layout: {
                'break':    { label: 'Line Break', open: '<br />', close: ''            },
                'para':     { label: 'Paragraph', open: '<br />', close: ''             },
                'hr':       { label: 'Horizontal Ruler', open: '<hr />', close: ''      },
            }
        };
        
        this.createTagsList();
        this.setEvents();
    },

    /**
     * Create dropdown list
     */
    createTagsList: function() {
        this.$undoButton = $('<button>')
            .attr('title', 'Undo')
            .attr('type', 'button')
            .addClass('form-control-sm markup-undo-button cursor-pointer pull-right')
            .text('Undo');
        var $selectList = $('<select>')
            .addClass('formatSelectedText pull-right form-control-sm markup-select-list')
            .addClass('icon icon-create-message-black icon-align-left');

        // add default option
        $selectList.append(
            $('<option>')
                .attr('value', '')
                .text('apply format...')
        );

        // create format list
        $.each(this.tagsList, function(title, type) {
            // add title option (disabled)
            $selectList.append(
                $('<option>')
                .attr('disabled', 'disabled')
                .text('______ ' + title + ' ______')
            );

            // add the types
            $.each(type, function(key, val) {
                $selectList.append(
                    $('<option>')
                        .attr('value', key)
                        .attr('data-open', val.open)
                        .attr('data-close', val.close)
                        .text(val.label)
                );
            });
        })
        this.$el.after($selectList);
        this.$select = $selectList;
        this.$select.after(this.$undoButton);
    },

    /**
     * Set DOM events
     */
    setEvents: function() {
        this.$el.on(
            "keyup input mouseup textInput",
            $.proxy(this.saveSelection, this)
        );
        this.$el.focus();

        // On selecting a list item
        this.$select.on('change', $.proxy(function(e) {
            e.preventDefault();
            var $this = e.currentTarget;
            var $optionSelected = $("option:selected", $this);
            var formatType = $this.value;

            if (formatType.trim()) {
                this.contentHistory.push(this.$el.val());
                this.$el.surroundSelectedText(
                    $optionSelected.data('open'),
                    $optionSelected.data('close')
                );
            }

            this.$el.focus();
            $($this).prop('selectedIndex',0);

            // For IE, which always shifts the focus onto the button
            window.setTimeout($.proxy(function() {
                this.$el.focus();
            }, this), 0);
        }, this));

        // On clicking the undo button
        this.$undoButton.on('click', $.proxy(function() {
            if (0 < this.contentHistory.length) {
                var historyLastItem = this.contentHistory.pop();
                this.$el.val(historyLastItem);
            }
        }, this));
    },

    /**
     * Save current selection
     */
    saveSelection: function() {
        var sel = this.$el.getSelection();
    }
};