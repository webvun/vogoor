import { Vogoor } from './vogoor.js'

class LiveParser extends Vogoor {
    constructor() { 
        super();
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", (event) => {
            let elements = this.prefix ? 
                document.querySelectorAll("[class*="+this.prefix+"]") : 
                document.querySelectorAll("[class*=\\:]");
                
            for (let i = 0; i < elements.length; ++i) {
                let classes = this.findClass(elements[i].className.split(" "));
                
                for (let j = 0; j < classes.length; ++j) { 
                    let translatedClass = this.translateClass(classes[j]);
                    this.createCSSSelector(translatedClass.name, translatedClass.propertyName+':'+translatedClass.propertyValue);
                }
            }

            document.body.style.visibility = "visible"; 
        });
    }

}

export { LiveParser }