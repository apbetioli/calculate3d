export class Parameters {
    constructor() {
        this.inputs = document.querySelectorAll("#parameters input");
        this.values = {};
        this.onChangeListeners = [];
        this.load();
        this.registerOnInputChange();
    }

    addOnChangeListeners(listener) {
        this.onChangeListeners.push(listener);
    }

    notifyOnChangeListeners() {
        this.onChangeListeners.forEach(listener => listener());
    }

    load() {
        this.inputs.forEach(input => {
            let value = localStorage.getItem(input.getAttribute('id'));
            if(value)
                input.value = value;

            this.values[input.getAttribute('id')] = input.value;
        });
    }

    getValue(id) {
        return 1 * this.values[id];
    }

    registerOnInputChange() {
        this.inputs.forEach(input => input.onchange = () => {
            this.store();
            this.notifyOnChangeListeners();
        });
    }

    store() {
        this.inputs.forEach(input => {
            let key = input.getAttribute('id');
            this.values[key] = input.value;
            localStorage.setItem(key, input.value);        
        });
    }
    
};

export default Parameters;