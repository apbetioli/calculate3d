export class Parameters {
    constructor() {
        this.inputs = document.querySelectorAll("#parameters input");
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
        });
    }

    getValue(id) {
        return localStorage.getItem(id);
    }

    registerOnInputChange() {
        this.inputs.forEach(input => input.onchange = () => {
            this.store();
            this.notifyOnChangeListeners();
        });
    }

    store() {
        this.inputs.forEach(input => localStorage.setItem(input.getAttribute('id'), input.value));
    }
    
};

export default Parameters;