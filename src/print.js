class Print {
    constructor(name, type="text", step) {
        this.name = name;
        this.type = type;
        this.step = step;
    }

    render() {
        let input = document.createElement("input");
        input.setAttribute("value", this.name);
        input.setAttribute("type", this.type);
        input.setAttribute("class", 'form-control');
        input.setAttribute("step", this.step);

        let td = document.createElement("td");
        td.appendChild(input);

        let tr = document.createElement("tr");
        tr.appendChild(td);

        return tr;
    }
}

export default Print;