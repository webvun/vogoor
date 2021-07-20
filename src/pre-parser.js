import { Vogoor } from './vogoor.js'
import * as fs from 'fs';
import * as cheerio from 'cheerio';
import * as path from 'path';

class PreParser extends Vogoor {
    constructor() { 
        super();
        this.cssFilePath = process.argv[2] ? process.argv[2] : "", 
        this.htmlDirPath = process.argv[3] ? process.argv[3] : "",
        this.configure();
        this.init();
    }

    configure() {
        this.config = {
            prefix: this.prefix,
            propertySeparator: this.propertySeparator,
            valueSeparator: this.valueSeparator,
            shortClassNames: this.shortClassNames
        };

        if (fs.existsSync("./vogoor.conf.json")) {
            let configFile = JSON.parse(fs.readFileSync("./vogoor.conf.json", {encoding:'utf8'}));
            this.shortClassNames = configFile.shortClassNames;
            this.prefix = configFile.prefix,
            this.propertySeparator = configFile.propertySeparator,
            this.valueSeparator = configFile.valueSeparator;
        } else {
            fs.writeFile('vogoor.conf.json', JSON.stringify(this.config , null, 4), function (err, file) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    }

    init() {
        this.readCssFileContent();
        this.walk(this.htmlDirPath, (err, filenames) => {
            if (err) throw err;
            filenames.forEach((filename) => {
                if (path.extname(filename) == '.html') { 
                    fs.readFile(filename, 'utf-8', (err, content) => {
                        if (err) {
                            onError(err);
                            return;
                        }
                        this.onFileContent(filename, content);
                    });
                }
            });
        });
    }

    readCssFileContent() {
        fs.readFile(this.cssFilePath, 'utf-8', (err, content) => {
            if (err) {
                console.log(err);
                return;
            }
            this.cssFileContent = content;
        });
    }

    walk(dir, done) {
        var results = [];
        fs.readdir(dir, (err, list) => {
            if (err) return done(err);
            var pending = list.length;
            if (!pending) return done(null, results);
            list.forEach((file) => {
                file = path.resolve(dir, file);
                fs.stat(file, (err, stat) => {
                    if (stat && stat.isDirectory()) {
                        this.walk(file, (err, res) => {
                            results = results.concat(res);
                            if (!--pending) done(null, results);
                        });
                    } else {
                        results.push(file);
                        if (!--pending) done(null, results);
                    }
                });
            });
        });
    }

    onFileContent(filename, content) {
        const $ = cheerio.load(content);
        let self = this;

        $("[class*=\\:]").each(function (i) {
            let classAttr = $(this).attr('class');
            let classNames = self.findClass(classAttr.split(" "));
            
            for (var j = 0; j < classNames.length; ++j) { 
                let translatedClass = self.translateClass(classNames[j]);
                
                if (translatedClass && translatedClass.name != "") {
                    if (self.validCSS(translatedClass.propertyName, translatedClass.propertyValue)) {
                        self.newCssSelectors = (translatedClass.name + " {" + translatedClass.propertyName+': '+translatedClass.propertyValue + ";}");
                        if (!self.cssFileContent.includes(self.newCssSelectors)) {
                            self.cssFileContent += self.newCssSelectors+"\n";
                            fs.writeFile(self.config.cssFilePath, self.cssFileContent, 'utf-8', (err) => {
                                if (err) throw err;
                                
                            });
                        }
                    }
                }
            }
        });
    }

}

export { PreParser };