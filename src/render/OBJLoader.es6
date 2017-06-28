import Loader from './loader';
import {Vec3, Vec2} from './math';

class OBJLoader {

    static loadOBJModel(fileName) {
        let cVertices = [];
        let cTextures = [];
        let cNormals = [];
        let cIndicies = [];
        let aCache = [];

        //final
        let fIndicies = [];
        let fIndexCnt = 0;
        let fTextures = [];
        let fNormals = [];
        let fVertices = [];
        
        //load file via ajax
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", onLoad);
        xhr.open("GET", fileName);
        xhr.send();
        
        
        function onLoad() {
            
            const lines = this.responseText.split('\n');
            
            lines.forEach((line) => {
                
                const currentLine = line.split(' ');
                switch(currentLine[0]) {
                    case 'v': 
                        cVertices.push(parseFloat(currentLine[1]), parseFloat(currentLine[2]), parseFloat(currentLine[3]));
                        break;
                    case 'vt': 
                        cTextures.push(parseFloat(currentLine[1]), parseFloat(currentLine[2]));
                        break;
                    case 'vn':
                        cNormals.push(parseFloat(currentLine[1]), parseFloat(currentLine[2]), parseFloat(currentLine[3]));
                        break;
                    case 'f':

                        for(var i = 1; i < currentLine.length; i++){
                            if(currentLine[i] in aCache) {
                                fIndicies.push( aCache[currentLine[i]] ); //it has, add its index to the list.
                            } else {
                                var vtn = currentLine[i].split('/');
                                var ind = (parseInt(vtn[0])-1) * 3;
                                fVertices.push( cVertices[ind] , cVertices[ind+1] , cVertices[ind+2] );

                                ind = (parseInt(vtn[1])-1) * 2;
                                fTextures.push( cTextures[ind] , cTextures[ind+1] );

                                ind = (parseInt(vtn[2])-1) * 3;
                                fNormals.push( cNormals[ind] , cNormals[ind+1] , cNormals[ind+2] );

                                aCache[ currentLine[i] ] = fIndexCnt;
                                fIndicies.push(fIndexCnt);
                                fIndexCnt++;
                            }
                            
                        }
                        break;
                        
                }
            });
        }
        return {v: fVertices, t: fTextures, n: fNormals, i: fIndicies};    
    }
}

export default OBJLoader;