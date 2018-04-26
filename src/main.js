import Parameters from './parameters';
import Print, {Input, Text} from './print';

class App {
    constructor() {
        this.parameters = new Parameters();
        this.parameters.load();

        this.prints = [];

        this.bindUI();
        this.render();
    }

    bindUI() {
        document.getElementById('addButton').onclick = () => this.addPrint();
    }

    addPrint() {
        let print = new Print();
        print.addField(new Text("name", "baby groot"));
        print.addField(new Input("weight", "30"));
        print.addField(new Input("filament_cost", "30"));
        print.addField(new Input("time", "30"));
        print.addField(new Text("energy_cost", "30"));
        print.addField(new Input("additional_cost", "30"));
        print.addField(new Text("failure_margin", "30"));
        print.addField(new Text("total_cost", "300"));
        print.addField(new Text("roi", "30"));
        print.addField(new Text("profit", "30"));
        print.addField(new Text("sell_price", "30"));
        print.addField(new Text("final_price", "30"));

        this.prints.push(print);
        this.render();
    }

    render() {
        let prints_body = document.getElementById("prints_body");
        prints_body.innerHTML = "";

        this.prints.forEach(print => {
            prints_body.appendChild(print.render());
        });
    }

}

new App();