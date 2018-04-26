export class Print {
    constructor() {
        this.fields = [];
    }

    addField(field) {
        this.fields.push(field);
    }

    render() {
        let tr = document.createElement("tr");

        this.fields.forEach(field => {
            tr.appendChild(field.render());
        });

        return tr;
    }
};

export class Input {
    constructor(name, value, type="text", step) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.step = step;
    }

    render() {
        let input = document.createElement("input");
        input.setAttribute("name", this.name);
        input.setAttribute("value", this.value);
        input.setAttribute("type", this.type);
        input.setAttribute("class", 'form-control');
        input.setAttribute("step", this.step);

        let td = document.createElement("td");
        td.appendChild(input);

        return td;
    }
};

export class Text {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    render() {
        let text = document.createElement("text");
        text.textContent = this.value;
        
        let td = document.createElement("td");
        td.appendChild(text);

        return td;
    }
};


export default Print;