class UnderscoreCSS {
    constructor(prefix, propertySeparator) { 
        this.prefix = prefix;
        this.propertySeparator = propertySeparator;
        this.valueSeparator = "_";
        this.shortClassNames = [
            {name: "color", short:"c"},
            {name: "padding-top", short:"pt"},
            {name: "p", short:"padding"},
        ];
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", (event) => {
            var els = this.prefix ? 
                document.querySelectorAll("[class*="+this.prefix+"]") : 
                document.querySelectorAll("[class*=\\:]");
                
            
            for (var i = 0; i < els.length; ++i) {
                let classes = this.findClass(els[i].className.split(" "));
                
                for (var j = 0; j < classes.length; ++j) { 
                    var prp = classes[j].split(this.propertySeparator);
                    var className = this.creatClassName(classes[j]);
                    var prpName = this.prefix ? prp[0].replace(this.prefix, "") : prp[0];
                    prpName = this.transformPropertyName(prpName);
                    var prpVal = this.transformToCSSValues(prp[1].split(this.valueSeparator));
                    this.createCSSSelector(className, prpName+':'+prpVal);
                }
            }
        });
    }

    transformPropertyName(str) {
        for (var i = 0; i < this.shortClassNames.length; ++i) {
            if (this.shortClassNames[i]["short"] == str) {
                str = this.shortClassNames[i]["name"];
            }
        }

        return str;
    }

    creatClassName(str) {
        let specChars = ["~", "!", "@", "$", "%", "^", "&",
         "*", "(", ")", "+", "=", ".", "/", "'", ";", ":", 
         '"', "?", ">", "<", "[", "]", "{", "}", "|", "#"];

        for (var i = 0; i < specChars.length; ++i) {
            str = str.replaceAll(specChars[i], "\\"+specChars[i]);
        }

        return '.' + str;
    }

    transformToCSSValues(values) {
        let transformed = "";

        for (var i = 0; i < values.length; ++i) { 
            let val = values[i];
            transformed += (transformed == "" ?  val : (" "+val));
        }

        return transformed;
    }

    splitMulti(str, tokens){
        var tempChar = tokens[0];
        for(var i = 1; i < tokens.length; i++){
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
    }

    findClass(classes) {
        let res = [];

        for (var i = 0; i < classes.length; ++i) { 
            if ((this.prefix && classes[i].startsWith(this.prefix)) && 
                classes[i].includes(this.propertySeparator)) {
                res.push(classes[i]);
            }

            if (!this.prefix && classes[i].includes(this.propertySeparator)) {
                res.push(classes[i]);
            }
        }

        return res;
    }

    createCSSSelector (selector, style) {
        if (!document.styleSheets) return;
        if (document.getElementsByTagName('head').length == 0) return;
    
        var styleSheet,mediaType;
    
        if (document.styleSheets.length > 0) {
            for (var i = 0, l = document.styleSheets.length; i < l; i++) {
            if (document.styleSheets[i].disabled) 
                continue;
            var media = document.styleSheets[i].media;
            mediaType = typeof media;
    
            if (mediaType === 'string') {
                if (media === '' || (media.indexOf('screen') !== -1)) {
                styleSheet = document.styleSheets[i];
                }
            }
            else if (mediaType=='object') {
                if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
                styleSheet = document.styleSheets[i];
                }
            }
    
            if (typeof styleSheet !== 'undefined') 
                break;
            }
        }
    
        if (typeof styleSheet === 'undefined') {
            var styleSheetElement = document.createElement('style');
            styleSheetElement.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(styleSheetElement);
    
            for (i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].disabled) {
                continue;
            }
            styleSheet = document.styleSheets[i];
            }
    
            mediaType = typeof styleSheet.media;
        }
    
        if (mediaType === 'string') {
            for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
            if(styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase()==selector.toLowerCase()) {
                styleSheet.rules[i].style.cssText = style;
                return;
            }
            }
            styleSheet.addRule(selector,style);
        }
        else if (mediaType === 'object') {
            var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
            for (var i = 0; i < styleSheetLength; i++) {
            if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.cssRules[i].style.cssText = style;
                return;
            }
            }
            styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
        }
    }

    setPrefix(name) {
        this.prefix = name;
    }

    getPrefix() {
        return this.prefix;
    }

    addShortClassNames(arr) {
        Array.prototype.push.apply(this.shortClassNames, arr); 
    }
}


let UnderscoreCSSObject = new UnderscoreCSS(false, ":");





        


