import Loader from './loader';

class OBJLoader {

    static loadOBJModel(fileName, loader) {
        function onLoad () {
            const lines = this.responseText.split('\n');
            console.log(lines);
        }

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", onLoad);
        xhr.open("GET", fileName);
        xhr.send();


    }
}

export default OBJLoader;