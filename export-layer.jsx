/* TO DO


*/
var outputFolder = decodeURI(app.activeDocument.path)
var docRef = app.activeDocument

// JPEG Save Options
jpgSaveOptions = new JPEGSaveOptions()
jpgSaveOptions.embedColorProfile = true
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE
jpgSaveOptions.matte = MatteType.NONE
jpgSaveOptions.quality = 10

// checks if layer background is selected -> button "Export selected layers" is disabled
var bg = docRef.activeLayer.name;
 var isBgSelected = "background"
if (bg != "Background") {
  if (bg != "background") {
  var isBgSelected = "noBackground";
}
}

// get array of selected layers
if (isBgSelected != "background") {
cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };
function newGroupFromLayers(doc) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass( sTID('layerSection') );
    desc.putReference( cTID('null'), ref );
    var lref = new ActionReference();
    lref.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
    desc.putReference( cTID('From'), lref);
    executeAction( cTID('Mk  '), desc, DialogModes.NO );
}
function undo() {
   executeAction(cTID("undo", undefined, DialogModes.NO));
}
function getSelectedLayers(doc) {
  var selLayers = [];
  newGroupFromLayers();
  var group = doc.activeLayer;
  var layers = group.layers;
  for (var i = 0; i < layers.length; i++) {
    selLayers.push(layers[i]);
  }
  undo();
  return selLayers;
}
var selectedLayers = getSelectedLayers(app.activeDocument);
}
// sets background visible
var Ebenen = docRef.artLayers.length
	for (var j = 0; j < Ebenen; j++) { 
		docRef.activeLayer = docRef.layers[j]
		var Ebenenname = docRef.activeLayer.name
			if (Ebenenname != "background"){
				if (Ebenenname != "Background") {
				docRef.activeLayer.visible = false;
			}
		}
	}
// export dialog
var w = new Window('dialog', "Export Options");
var exportAll = w.add('button {text: "Export all layers", active: true}');
var exportSelected = w.add ('button {text: "Export only seletcted Layers", enabled: false}');
var cancel = w.add('button', undefined, "Cancel");
exportSelected.onClick = function(){
  exportSelectedLayers();
  w.close();
}
exportAll.onClick = function(){
  exportAllLayers();
  w.close();
}
if (isBgSelected != "background") {
  exportSelected.enabled = true;
}
w.show();

// exports selected layers NEW
function exportSelectedLayers(){
fileAlreadyExists = new Array();
for (var k = 0; k < selectedLayers.length; k++) {
  selectedLayers[k].selected = true;
    docRef.activeLayer = selectedLayers[k];
    var Ebenenname = docRef.activeLayer.name
      docRef.activeLayer.visible = true;
      var jpgname = docRef.activeLayer.name
      fileObject = new File(outputFolder + "/" + jpgname + ".jpg")
      if (fileObject.exists) {
        fileAlreadyExists.push(jpgname+".jpg");
        } else {
          app.activeDocument.saveAs(fileObject, jpgSaveOptions, true,Extension.LOWERCASE)
        }
      docRef.activeLayer.visible = false;
    }
var alertText = "The following files already existed: "+ '\n';
if (fileAlreadyExists.length >0){
  for (i = 0;i<fileAlreadyExists.length;i++) {
    alertText = alertText + fileAlreadyExists[i] + '\n';
  }
  alert(alertText);
}
}
// exports all layers, kinda legacy
function exportAllLayers() {
fileAlreadyExists = new Array();
  for (var k = 0; k < Ebenen; k++) {
    docRef.activeLayer = docRef.layers[k]
    var Ebenenname = docRef.activeLayer.name
    if (Ebenenname != "background" && Ebenenname != "Background" && Ebenenname != "Balken"){
      docRef.activeLayer.visible = true;
      var jpgname = docRef.activeLayer.name
      fileObject = new File(outputFolder + "/" + jpgname + ".jpg")
        if (fileObject.exists) {
        fileAlreadyExists.push(jpgname+".jpg");
        } else {
          app.activeDocument.saveAs(fileObject, jpgSaveOptions, true,Extension.LOWERCASE)
        }
      docRef.activeLayer.visible = false;
    }
  }
var alertText = "The following files already existed: "+ '\n';
if (fileAlreadyExists.length >0){
  for (i = 0;i<fileAlreadyExists.length;i++) {
    alertText = alertText + fileAlreadyExists[i] + '\n';
  }
  alert(alertText);
}
}
// selectes previously selected layer
if (isBgSelected != "background") {
docRef.activeLayer = selectedLayers[0];
}


/* // exports selected layers OLD
for (var k = 0; k < selectedLayers.length; k++) {
  selectedLayers[k].selected = true;
    docRef.activeLayer = selectedLayers[k];
    var Ebenenname = docRef.activeLayer.name
      docRef.activeLayer.visible = true;
      var jpgname = docRef.activeLayer.name
      jpgFile = new File(outputFolder + "/" + jpgname + ".jpg")
      app.activeDocument.saveAs(jpgFile, jpgSaveOptions, true,Extension.LOWERCASE)
      docRef.activeLayer.visible = false;
    }
*/	


/* for( i = 0; i < selectedLayers.length; i++) {
    selectedLayers[i].selected = true;
    docRef.activeLayer = selectedLayers[i];
    alert(docRef.activeLayer.name)
 }
*/


/* var doc = app.activeDocument;

var varname = doc.activeLayer.name;
alert(varname);
*/

//doc.activeLayer = doc.artLayers.getByName("asd");

/*
convertToSmartObject();
function convertToSmartObject() {
var idnewPlacedLayer = stringIDToTypeID( "newPlacedLayer" );
executeAction( idnewPlacedLayer, undefined, DialogModes.NO );
}
*/
