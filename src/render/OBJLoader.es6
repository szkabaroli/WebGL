import Loader from './loader';

class OBJLoader {

    static loadOBJModel(fileName, loader) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", fileName, true);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                    return rawFile.responseText;
            }
        }
        rawFile.send();


    }
}

export default OBJLoader;