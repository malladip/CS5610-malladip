function add_symbol(value) {
    var existing_value = document.getElementById('output_display').value;
    var new_value = existing_value + value;
    document.getElementById('output_display').value = new_value;
}

function do_operation(sign) {
    if(sign == 'C'){
        document.getElementById('output_display').value = "";
    } else if (sign == '=') {
        var equation = document.getElementById('output_display').value;

        try {
            document.getElementById('output_display').value = eval(equation);
        } catch (e) {
            alert("Syntax Error");

        }
    }else{
        add_symbol(sign);
    }
}
