const fs = require("fs");
const path = require('path');
const matter = require('gray-matter');
const jsonToYaml = require('json2yaml');
const moment = require("moment");
let docs_dir = path.join(__dirname, "../../../content/posts");
let dirs = fs.readdirSync(docs_dir);
console.log(dirs);
dirs.forEach(function (dir) {
    if(dir==='_index.md'){
        return;
    }
    let files = fs.readdirSync(docs_dir + "/" + dir);
    files.forEach(function (filename) {
        // 修复front matter
        let file = fs.readFileSync(docs_dir + "/" + dir + "/" + filename);
        let o = matter(file);
        let mat = o.data;
        if (mat.draft) {
            return;
        }
        if (mat.permalink === undefined) {
            console.log(filename);
            throw Error("必须定义permalink");
        }
        if (mat.tags === undefined) {
            mat.tags = ["默认"];
        }
        if (mat.math === undefined) {
            mat.math = true;
        }
        mat.category = dir;
        // 要删除.md
        mat.title = filename.slice(0, -3);
        if (mat.date === undefined) {
            mat.date = moment().format("YYYY-MM-DD HH:mm:ss ZZ");
        }
        const newData = jsonToYaml
                .stringify(mat)
                .replace(/\n\s{2}/g, "\n")
                .replace(/"/g, "") + '---\r\n'
            + o.content;
        fs.writeFileSync(docs_dir + "/" + dir + "/" + filename, newData); // 写入
    })
});

