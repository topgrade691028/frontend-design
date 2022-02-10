var app;

(function() {
'use strict';

app = {
    monthAndSlashRegex: /^\d\d \/ $/, // regex to match "MM / "
    monthRegex: /^\d\d$/, // regex to match "MM"
    
    el_cardNumber: '.ccFormatMonitor',
    el_expDate: '#inputExpDate',
    el_cvv: '.cvv',
    el_ccUnknown: 'cc_type_unknown',
    el_ccTypePrefix: 'cc_type_',
    el_monthSelect: '#monthSelect',
    el_yearSelect: '#yearSelect',
    
    
    cardTypes: {
        'American Express': {
          name: 'American Express',
          code: 'ax',
          security: 4,
          pattern: /^3[47]/,
          valid_length: [15],
          formats: {
            length: 15,
            format: 'xxxx xxxxxxx xxxx'
          }
        },
        'Visa': {
                  name: 'Visa',
                  code: 'vs',
          security: 3,
                  pattern: /^4/,
                  valid_length: [16],
                  formats: {
                          length: 16,
                          format: 'xxxx xxxx xxxx xxxx'
                      }
              },
        'Maestro': {
                  name: 'Maestro',
                  code: 'ma',
          security: 3,
                  pattern: /^(50(18|20|38)|5612|5893|63(04|90)|67(59|6[1-3])|0604)/,
                  valid_length: [16],
                  formats: {
                          length: 16,
                          format: 'xxxx xxxx xxxx xxxx'
                      }
              },
        'Mastercard': {
                  name: 'Mastercard',
                  code: 'mc',
          security: 3,
                  pattern: /^5[1-5]/,
                  valid_length: [16],
                  formats: {
                          length: 16,
                          format: 'xxxx xxxx xxxx xxxx'
                      }
              } 
      }
};

app.addListeners = function() {
    $(app.el_expDate).on('keydown', function(e) {
        app.removeSlash(e);
    });

    $(app.el_expDate).on('keyup', function(e) {
        app.addSlash(e);
    });

    $(app.el_expDate).on('blur', function(e) {
        app.populateDate(e);
    });

    $(app.el_cvv +', '+ app.el_expDate).on('keypress', function(e) {
        return e.charCode >= 48 && e.charCode <= 57;
    });  
};

app.addSlash = function (e) {
    var isMonthEntered = app.monthRegex.exec(e.target.value);
    if (e.key >= 0 && e.key <= 9 && isMonthEntered) {
    e.target.value = e.target.value + " / ";
    }
};

app.removeSlash = function(e) {
    var isMonthAndSlashEntered = app.monthAndSlashRegex.exec(e.target.value);
    if (isMonthAndSlashEntered && e.key === 'Backspace') {
    e.target.value = e.target.value.slice(0, -3);
    }
};

app.populateDate = function(e) {
    var month, year;
    
    if (e.target.value.length == 7) {
    month = parseInt(e.target.value.slice(0, -5));
    year = "20" + e.target.value.slice(5);
    
    if (app.checkMonth(month)) {
        $(app.el_monthSelect).val(month);
    } else {
        $(app.el_monthSelect).val(0);
    }
    
    if (app.checkYear(year)) {
        $(app.el_yearSelect).val(year);
    } else {
        $(app.el_yearSelect).val(0);
    }
    
    }
};

app.checkMonth = function(month) {
    if (month <= 12) {
    var monthSelectOptions = app.getSelectOptions($(app.el_monthSelect));
    month = month.toString();
    if (monthSelectOptions.includes(month)) {
        return true; 
    }
    }
};

app.checkYear = function(year) {
    var yearSelectOptions = app.getSelectOptions($(app.el_yearSelect));
    if (yearSelectOptions.includes(year)) {
    return true; 
    }
};
        
app.getSelectOptions = function(select) {
    var options = select.find('option');
    var optionValues = [];
    for (var i = 0; i < options.length; i++) {
    optionValues[i] = options[i].value;
    }
    return optionValues;
};

app.setMaxLength = function ($elem, length) {
    if($elem.length && app.isInteger(length)) {
    $elem.attr('maxlength', length);
    }else if($elem.length){
    $elem.attr('maxlength', '');
    }
};

app.isInteger = function(x) {
    return (typeof x === 'number') && (x % 1 === 0);
};

app.createExpDateField = function() {
    $(app.el_monthSelect +', '+ app.el_yearSelect).hide();
    $(app.el_monthSelect).parent().prepend('<input type="text" class="ccFormatMonitor">');
};


app.isValidLength = function(cc_num, card_type) {
    for(var i in card_type.valid_length) {
    if (cc_num.length <= card_type.valid_length[i]) {
        return true;
    }
    }
    return false;
};

app.getCardType = function(cc_num) {
    for(var i in app.cardTypes) {
    var card_type = app.cardTypes[i];
    if (cc_num.match(card_type.pattern) && app.isValidLength(cc_num, card_type)) {
        return card_type;
    }
    }
};

app.getCardFormatString = function(cc_num, card_type) {
    for(var i in card_type.formats) {
    var format = card_type.formats[i];
    if (cc_num.length <= format.length) {
        return format;
    }
    }
};

app.formatCardNumber = function(cc_num, card_type) {
    var numAppendedChars = 0;
    var formattedNumber = '';
    var cardFormatIndex = '';

    if (!card_type) {
    return cc_num;
    }

    var cardFormatString = app.getCardFormatString(cc_num, card_type);
    for(var i = 0; i < cc_num.length; i++) {
    cardFormatIndex = i + numAppendedChars;
    if (!cardFormatString || cardFormatIndex >= cardFormatString.length) {
        return cc_num;
    }

    if (cardFormatString.charAt(cardFormatIndex) !== 'x') {
        numAppendedChars++;
        formattedNumber += cardFormatString.charAt(cardFormatIndex) + cc_num.charAt(i);
    } else {
        formattedNumber += cc_num.charAt(i);
    }
    }

    return formattedNumber;
};

app.monitorCcFormat = function($elem) {
    var cc_num = $elem.val().replace(/\D/g,'');
    var card_type = app.getCardType(cc_num);
    $elem.val(app.formatCardNumber(cc_num, card_type));
    app.addCardClassIdentifier($elem, card_type);
};

app.addCardClassIdentifier = function($elem, card_type) {
    var classIdentifier = app.el_ccUnknown;
    if (card_type) {
    classIdentifier = app.el_ccTypePrefix + card_type.code;
    app.setMaxLength($(app.el_cvv), card_type.security);
    } else {
    app.setMaxLength($(app.el_cvv));
    }

    if (!$elem.hasClass(classIdentifier)) {
    var classes = '';
    for(var i in app.cardTypes) {
        classes += app.el_ccTypePrefix + app.cardTypes[i].code + ' ';
    }
    $elem.removeClass(classes + app.el_ccUnknown);
    $elem.addClass(classIdentifier);
    }
};


app.init = function() {

    $(document).find(app.el_cardNumber).each(function() {
    var $elem = $(this);
    if ($elem.is('input')) {
        $elem.on('input', function() {
        app.monitorCcFormat($elem);
        });
    }
    });
    
    app.addListeners();
    
}();

})();