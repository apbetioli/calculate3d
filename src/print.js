export class Print {
    constructor(name = '') {
        this.name = name;
        this.weight = 0.0;
        this.time = 0;
        this.formattedTime = ''; 
        this.filamentCost = 0.0;
        this.energyCost = 0.0;
        this.additionalCost = 0.0;
        this.failureMargin = 0.0;
        this.totalCost = 0.0;
        this.roi = 0.0;
        this.markup = 0.0;
        this.sellPrice = 0.0;
    }

    add(print) {
        this.time += print.time;
        this.weight += print.weight;
        this.filamentCost += print.filamentCost;
        this.energyCost += print.energyCost;
        this.additionalCost += print.additionalCost;
        this.failureMargin += print.failureMargin;
        this.totalCost += print.totalCost;
        this.roi += print.roi;
        this.markup += print.markup;
        this.sellPrice += print.sellPrice;
    }

    render() {
        this.fields = [
            new Text("name", this.name),
            new Text("weight", this.toFloat(this.weight)),
            new Text("time", this.formattedTime ? this.formattedTime: this.time),
            new Text("filament_cost",  this.toFloat(this.filamentCost)),
            new Text("energy_cost",  this.toFloat(this.energyCost)),
            new Text("additional_cost",  this.toFloat(this.additionalCost)),
            new Text("total_cost",  this.toFloat(this.totalCost)),
            new Text("failure_margin",  this.toFloat(this.failureMargin)),
            new Text("roi",  this.toFloat(this.roi)),
            new Text("markup",  this.toFloat(this.markup)),
            new Text("sell_price",  this.toFloat(this.sellPrice))
        ];

        const tr = document.createElement("tr");
        tr.setAttribute("id", this.name);
        this.fields.forEach(field => tr.appendChild(field.render()));
        return tr;
    }

    toFloat(num) {
        return parseFloat("" + num).toFixed(2);
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
        const input = document.createElement("input");
        input.setAttribute("name", this.name);
        input.setAttribute("value", this.value);
        input.setAttribute("type", this.type);
        input.setAttribute("class", 'form-control');
        input.setAttribute("step", this.step);

        const td = document.createElement("td");
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
        const text = document.createElement("text");
        text.textContent = this.value;
        
        const td = document.createElement("td");
        td.appendChild(text);

        return td;
    }
};


export default Print;