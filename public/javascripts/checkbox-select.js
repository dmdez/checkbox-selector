(function($, window) {

    function CheckboxSelect(container) {
        var $container = $(container);
        var $filter = $('<input type="text" class="checkbox-filter" placeholder="Filter Selection..." />');
        var $close = $('<span class="close">Done</span>');
        var $checkboxSelection = $('.checkbox-selection', container);  // needs to be changed
        var $checkboxes = $(':checkbox', container);
        var $checkboxContainer = $('ul', container);
        var $trigger = $('h3', container);
        var $appendTo = $('.checkbox-window', container);        

        $appendTo
            .append($close)
            .prepend($filter);

        $checkboxes
            .each(configCheckbox)
            .on('change', checkboxChange)
            .trigger('change');

        $trigger.on('click', triggerClick);

        $close.on('click', closeSelector);


        $filter.on('keyup', function() {
            var value = $(this).val();
            filterByValue(value);
        });

        function triggerClick() {
            $container.toggleClass('active');
        }

        function closeSelector() {
            $container.removeClass('active');
        }

        function configCheckbox() {
            var checkbox = this;
            var $label = $(checkbox).parent();
            var id = $(checkbox).attr('id');
            var $visibleLabel = $('<span class="label" data-id="' + id + '">' + $label.text() + '</span>');
            var $remove = $('<span class="entypo-cancel-squared cancel"></span>');

            $visibleLabel.append($remove);

            $remove.on('click', function() {
                checkbox.remove();
                console.log('remove');
            });

            checkbox['remove'] = function() {
                
                $label.removeClass('active');

                $(checkbox).removeAttr('checked');

                $checkboxSelection
                    .find('[data-id="' + id + '"]').remove();

            };

            checkbox['active'] = function() {
                $label.addClass('active');
                $checkboxSelection.append($visibleLabel.clone(true));
            };
        }

        function checkboxChange() {
            if (this.checked === true) {
                this.active();
            } else {
                this.remove();
            }
            
        }

        function filterByValue(value) {
            value = value.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });

            if(value == '')
                $checkboxContainer.find('label').show();
            else{
                $checkboxContainer.find('label:not(.active):not(:contains(' + value + '))').hide();
                $checkboxContainer.find('label:not(.active):contains(' + value + ')').show();
            }
        };
        
    }

    $.fn.checkboxSelect = function(options) {
        return this.each(function() {
            return new CheckboxSelect(this, options);
        });
    };

    $('.checkbox-group').checkboxSelect();

})(jQuery, window);