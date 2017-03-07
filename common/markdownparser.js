/**
 * Created by hastings on 2/03/2017.
 */
const keywords = {
    "HASH1": {
        sign: "#",
        name: "hash1"
    }, "HASH2": {
        sign: "##",
        name: "hash2"
    }, "HASH3": {
        sign: "###",
        name: "hash3"
    }, "HASH4": {
        sign: "####",
        name: "hash4"
    }, "HYPHEN": {
        sign: "-",
        name: "hyphen"
    }, "DIVIDER": {
        sign: "---",
        name: "divider"
    }, "LINEBREAK": {
        sign: "\n",
        name: "linebreak"
    }
};

/**
 * Usage:
 let md = MDParser().parse(`# Markdown1
 ## Markdown1.1
 ### Markdown1.1.1
 # Markdown2
 ## Markdown2.1
 ## Markdown2.2`);
 * */
export const MDParser = ()=> {
    let parser = {};

    parser.parseLine = (txt, index, node)=> {
        if (!index && index != 0)
            throw new Error("No index of line error!");
        let lastNode = null;
        let currNode = {};
        if (node)
            lastNode = node;
        let regex = /^(#\s|##\s|###\s|####\s|-\s).+/;
        let txtStr = regex.test(txt) ? txt.split(/(#\s|##\s|###\s|####\s)/).slice(1) : txt;
        if (!lastNode) {
            if (typeof txtStr == "string") {
                let delimiter = null;
                currNode = new Node(index, txtStr, null, delimiter);
            } else {
                let delimiter = txtStr[0].trim();
                currNode = new Node(index, txtStr, null, delimiter);
            }
        } else {
            if (typeof txtStr == "string") {
                let delimiter = null;
                currNode = new Node(index, txtStr, lastNode, delimiter);
            } else {
                let delimiter = txtStr[0].trim();
                currNode = new Node(index, txtStr, lastNode, delimiter);
            }
        }
        return currNode;
    }

    parser.parse = (txt)=> {
        if (!txt)
            return [];
        let nodes = [];
        let _nodes = [];
        if (typeof txt != "string") {
            throw new Error("Input is not text error! Please change to plain text for parsing!");
        }
        let lines = txt.split(/\n|\r/);
        for (let k in lines) {
            try {
                if (!_nodes.length) {
                    let n = parser.parseLine(lines[k], k);
                    if (n.content)
                        _nodes.push(n);
                } else {
                    let tNode = _nodes.pop();
                    _nodes.push(tNode);
                    let n = parser.parseLine(lines[k], k, tNode);
                    if (n.content)
                        _nodes.push(n);
                }
            } catch (err) {
                throw new Error("Parsing Error at line: " + k + " " + err);
            }
        }
        while (_nodes.length) {
            let n = _nodes.pop();
            let slice = n.content && typeof n.content == 'object' ? n.content.slice(1).join("") : n.content;
            nodes.push({
                name: n.id,
                parent: n.getParent() ? n.getParent().id : '',
                content: slice
            });
        }
        return nodes;
    }

    return parser;
}

export class Node {
    constructor(index, content, last, delimiter) {
        this.id = index;
        this.children = [];
        this.content = content ? content : "";
        if (delimiter) {
            this.delimiter = delimiter;
            switch (this.delimiter) {
                case keywords["HASH1"].sign:
                    this.level = 1;
                    break;
                case keywords["HASH2"].sign:
                    this.level = 2;
                    break;
                case keywords["HASH3"].sign:
                    this.level = 3;
                    break;
                case keywords["HASH4"].sign:
                    this.level = 4;
                    break;
                case keywords["HYPHEN"].sign:
                    if (!last)
                        this.level = 1;
                    else
                        this.level = last.getLevel() + 1;
                    break;
                default:
                    this.level = 1;
            }
            if (last && this.level > last.getLevel()) {
                this.parent = last;
                last.add(this);
            } else if (last && last.getParent() && this.level == last.getLevel()) {
                this.parent = last.getParent();
                last.getParent().add(this);
            } else
                this.parent = null;
        } else {
            this.level = 1;
        }
    }

    getChildren() {
        return this.children;
    }

    add(node) {
        this.children.push(node);
    }

    eject() {
        return this.children.pop();
    }

    setParent(node) {
        this.parent = node;
    }

    getParent() {
        return this.parent ? this.parent : null;
    }

    getLevel() {
        return this.level;
    }

    getDelimiter() {
        return this.delimiter ? this.delimiter : null;
    }
}