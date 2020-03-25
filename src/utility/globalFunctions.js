export default {
    showOverlay: function() {
        var overlay = document.getElementsByClassName("overlay");
        var index = 3000;
        if(overlay.length) {
            index = overlay[overlay.length - 1].style['z-index'] + 2;
        }

        let div = document.createElement('div');
        div.className = "overlay";
        div.style['z-index'] = index;
        document.body.append(div);

        var result = {
            index: index + 1,
            div: div,
        };

        return result;
    }
}