export class Print {
    constructor(name = '') {
        this.name = name;
        this.weight = 0;
        this.time = 0;
        this.filamentCost = 0;
        this.energyCost = 0;
        this.additionalCost = 0;
        this.failureMargin = 0;
        this.totalCost = 0;
        this.roi = 0;
        this.markup = 0;
        this.sellPrice = 0;
    }

    render() {
        this.fields = [
            new Text("name", this.name),
            new Text("weight", this.weight),
            new Text("time", this.time),
            new Text("filament_cost", this.filamentCost),
            new Text("energy_cost", this.energyCost),
            new Text("additional_cost", this.additionalCost),
            new Text("failure_margin", this.failureMargin),
            new Text("total_cost", this.totalCost),
            new Text("roi", this.roi),
            new Text("markup", this.markup),
            new Text("sell_price", this.sellPrice),
        ];

        let tr = document.createElement("tr");
        tr.setAttribute("id", this.name);
        this.fields.forEach(field => tr.appendChild(field.render()));
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