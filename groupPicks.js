
var nameList = [];
var pickMatrix = [];
var groupSizes = [5,5,4,4,4];
var finalGroups = [];
var rankedArray = [];
// Will be array of arrays, rows representing the PICKED, columns representing BY

var generateMatrix = function(nameList){
  var size = nameList.length;
  // var zeroFilledArray = Array.apply(null, Array(size)).map(Number.prototype.valueOf,0);
  // for(var i = 0; i<size; i++){
  //   pickMatrix.push(zeroFilledArray);
  // }
  var zeroArray =[];
  for(var i =0; i< size; i++){
    for(var j = 0; j < size; j++){
      zeroArray.push(0);
    }
    pickMatrix.push(zeroArray);
    zeroArray=[];
  }
};

var generateFinalGroups= function(groupSizes){
  var zeroArray =[];
  for(var i =0; i< groupSizes.length; i++){
    // for(var j = 0; j < groupSizes[i]; j++){
    //   zeroArray.push(0);
    // }
    finalGroups.push(zeroArray);
    zeroArray=[];
  }
  //console.log("Final Groups generated ", finalGroups);
}

var addPicks = function(name, nameList, indivPicks, pickMatrix){
  //indivPicks needs to be an array of names
  var pickerColIndex = nameList.indexOf(name);

  for(var i = 0; i< indivPicks.length; i++){

    var pickeeRowIndex = nameList.indexOf( indivPicks[i] );
    pickMatrix[pickeeRowIndex][pickerColIndex] = 1;
  }
  //console.log("Picks for ", name);
}

var pickedRanksCondensed = function(nameList, pickMatrix){
  var size = nameList.length;
  var finalRank = 0
  // ranked Array will be in same order as nameList
  // _.each(pickMatrix, function(row){
  //   var finalRank =
  //   _.reduce(pickMatrix[row], function(tot,val){
  //     return tot + val;
  //     }, 0);

  for(var i = 0; i< size; i++){
    // Rows per name
    var finalRank = 0
    for(var j = 0; j < size; j++){
      //Col per picker
      finalRank += pickMatrix[i][j];
    }
    rankedArray.push(finalRank);
  }
  console.log("Final condensed: ", rankedArray)
};


var assignGroups = function(nameList, pickMatrix, rankedArray, groupSizes){
  var max = nameList.length;
  var assignedNames = {};
  //var randomGroupIndex = 5*Math.floor(Math.random())
  for(var i = 0; i< max; i++){ //lowest value in rankedArray
    //find index of fewest rankings
    for(var j = 0; j< max; j++){ //steps through People
      var currentPerson = nameList[j];
      //console.log("current: ", currentPerson, rankedArray, i);
      if((rankedArray[j] === i) && (!assignedNames[currentPerson])){
        //assign group
        var randomGroupIndex = randomGroup(groupSizes.length);
        console.log(currentPerson, " to random group: ", randomGroupIndex);
        var currentGroup = finalGroups[randomGroupIndex]
        //check if group is full
        //debugger;
        if(currentGroup.length < groupSizes[randomGroupIndex] -2){
        //find one of their ranked people
          for(var k = 0; k < nameList.length;k++){
            if((pickMatrix[j][k]===1) && (!assignedNames[nameList[k]])){
              assignedNames[currentPerson] = true;
              assignedNames[nameList[k]] = true;

              finalGroups[randomGroupIndex].push(currentPerson);
              finalGroups[randomGroupIndex].push(nameList[k]);
              console.log("FinalGroup updated: ", finalGroups)
            }
          }
          //console.log("FinalGroup updated: ", finalGroups)

        }else if(currentGroup.length < groupSizes[randomGroupIndex] -1){
          assignedNames[currentPerson] = true;
          finalGroups[randomGroupIndex].push(currentPerson);
          console.log("FinalGroup updated: ", finalGroups)

        }

      }
    }


  }


};

var  randomGroup= function(size){
  return  Math.floor(size * Math.random())
}

var testNameList = ["Yoda", "Felurian", "Nightcrawler", "Baka", "GleepGloop", "Samus", "Jeff"];
//var testPickMatrix = [ [0,1,0],[1,0,0],[0,1,0]];
generateMatrix(testNameList);
generateFinalGroups(groupSizes);
//console.log("Empty: ", pickMatrix);
addPicks("Nightcrawler", testNameList, ["Felurian", "GleepGloop", "Yoda"], pickMatrix);
addPicks("Yoda", testNameList, ["Felurian", "Nightcrawler"], pickMatrix);
addPicks("Baka", testNameList, ["Felurian", "Yoda", "Jeff"], pickMatrix);
addPicks("GleepGloop", testNameList, ["Felurian", "Samus", "Yoda"], pickMatrix);
addPicks("Samus", testNameList, ["Felurian", "Samus", "Baka"], pickMatrix);
addPicks("Jeff", testNameList, ["Felurian", "Samus", "Yoda"], pickMatrix);
console.log("Picks: ", pickMatrix);
pickedRanksCondensed(testNameList, pickMatrix);

assignGroups(testNameList, pickMatrix, rankedArray, groupSizes);


var mks19 = ["Suzanne", "Shu", "Matt", "Carter", "Jason", "Ricky", "David",
      "Brendan", "Adi", "Colin", "Ian", "Thomas", "Patrick", "James", "Chris",
      "Ryan", "Mike", "Jim", "Yoshi", "Richie", "Vincent", "Stephen"];


