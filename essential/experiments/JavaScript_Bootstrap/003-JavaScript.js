function mouseOver(ev) {
    switch (ev.target.id) {
        case 'image':
            ev.target.style.width = "30%";
            break;
        case 'paragraph':
            ev.target.style.fontSize = 'xx-large';
            ev.target.style.backgroundColor = 'red';
            break;
        case 'text':
            ev.target.innerHTML = 'Mouse over me!! :)';
            break;
        case 'move':
            ev.target.innerHTML = 'I moved left';
            ev.target.parentNode.className = 'border';
            break;
    }
    
}

function mouseOut(ev) {

    switch (ev.target.id) {
        case 'image':
            ev.target.style.width = "20%";
            break;
        case 'paragraph':
            ev.target.style.fontSize = 'larger';
            ev.target.style.backgroundColor = 'yellow';
            break;
        case 'text':
            ev.target.innerHTML = 'Please mouse over!!';
            break;
        case 'move':
            ev.target.innerHTML = 'Move me left';
            ev.target.parentNode.className = 'border text-center';
            break;
    }

}