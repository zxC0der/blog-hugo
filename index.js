const fs=require("fs");
const matter = require('gray-matter');
const jsonToYaml = require('json2yaml');
const moment = require("moment");
let args=process.argv.splice(2);
let docs_dir="/home/keane/WebstormProjects/blog/docs";
if(args.length>0){
    docs_dir=args[0];
}
let save_dir="/home/keane/WebstormProjects/blog/public";
if(args.length>1){
    save_dir=args[1];
}
// 原始数据
let data=[];
// 分类列表
let cats={};
// 标签列表
let tags={};
let dirs=fs.readdirSync(docs_dir);
console.log(dirs);
dirs.forEach(function (dir){
    if(dir[0]=='.'){
        return;
    }
    let files=fs.readdirSync(docs_dir+"/"+dir);
    files.forEach(function (filename){
        // 修复front matter
        let file=fs.readFileSync(docs_dir+"/"+dir+"/"+filename);
        let o=matter(file);
        let mat=o.data;
        if(mat.draft){
            return;
        }
        if(mat.permalink===undefined){
            console.log(filename);
            throw Error("必须定义permalink");
        }
        if(mat.tags===undefined){
            mat.tags=["默认"];
        }
        if(mat.math===undefined){
            mat.math=true;
        }
        mat.category=dir;
        // 要删除.md
        mat.title=filename.slice(0,-3);
        if(mat.date===undefined){
            mat.date=moment().format("YYYY-MM-DD HH:mm:ss ZZ");
        }
        const newData = jsonToYaml
                .stringify(mat)
                .replace(/\n\s{2}/g,"\n")
                .replace(/"/g,"")  + '---\r\n'
            + o.content;
        fs.writeFileSync(docs_dir+"/"+dir+"/"+filename, newData); // 写入
        let obj={
            "title":mat.title,
            "date":mat.date,
            "category":mat.category,
            "tags":mat.tags,
            "permalink":mat.permalink,
            "content":o.content,
        }
        data.push(obj);
        if(cats[mat.category]===undefined){
            cats[mat.category]=1;
        }else{
            cats[mat.category]++;
        }
        mat.tags.forEach(function (tag){
            if(tags[tag]===undefined){
                tags[tag]=1;
            }else{
                tags[tag]++;
            }
        });
    })
});
// 格式转换
let tagList=[]
let catList=[]
for(let tag in tags){
    tagList.push({
        "name":tag,
        "num":tags[tag],
    })
}
for(let cat in cats){
    catList.push({
        "name":cat,
        "num":cats[cat],
    })
}
function sortFun(a,b){
    return a.num<b.num?1:-1;
}
tagList.sort(sortFun)
catList.sort(sortFun)
function sortDataByDate(a,b){
    return a.date<b.date?1:-1;
}
data.sort(sortDataByDate);
fs.writeFileSync(save_dir+"/data.json",JSON.stringify(data));
fs.writeFileSync(save_dir+"/tags.json",JSON.stringify(tagList));
fs.writeFileSync(save_dir+"/cats.json",JSON.stringify(catList));

