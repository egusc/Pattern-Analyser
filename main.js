const testlib = require( './testlib' );

/*A program created as part of Advanced Programming module.
Takes an input file and find patterns of strings within input file.
Patterns to look for declared within seperate input file.

Written by Ewan Guscott
*/

let patternTable = {};  //Object containing patterns and count of patterns
let fulldata = [];  //Array to store all data from data file

testlib.on( 'ready', function( patterns ) {
	console.log( "Patterns:", patterns );
    patterns.forEach( function(item, index, array ) {
        const key = patterns[index];    //Declares key to be added to patternTable object
        patternTable[key] = 0;
      });
    testlib.runTests();    
} );


testlib.on( 'data', function( data ) {
    fulldata.push(data);        //Adds data to fulldata array
} );

testlib.on('reset', function() {
    const patterns = Object.keys(patternTable); //Gets required patterns and adds to array 
    patterns.forEach( function(item, index, array ) {
        patternTable[patterns[index]] = 0;
    });

    patterns.forEach( function(item, index, array ) {
        patternToSearch = patterns[index];  //Current pattern the program is searching for
        offsets = [];       //Array containing indexes of found patterns
        
        
        fulldata.forEach( function(item,index,array ) {
            if ((( fulldata.slice(index, (index + patternToSearch.length) )).join('')).includes(patternToSearch)) //Sees if letters following one at index follow pattern required
            {
                offsets.push(index);    //Adds index of pattern to offsets aray
            }
        })
        patternTable[patternToSearch] = offsets.length;     //Adds final count of number of the pattern to the patternTable
        offsets.forEach( function(item, index, array ) {
            testlib.foundMatch(patternToSearch, offsets[index]);    //Signals all matches that have been found
        })
        
      })
      testlib.frequencyTable(patternTable);   //Displays tables of number of patterns found
      fulldata = [];
});

testlib.on( 'end', function(  ) {
    const patterns = Object.keys(patternTable); //Gets required patterns and adds to array 
    patterns.forEach( function(item, index, array ) {
        patternTable[patterns[index]] = 0;
    });

    patterns.forEach( function(item, index, array ) {
        patternToSearch = patterns[index];  //Current pattern the program is searching for
        offsets = [];       //Array containing indexes of found patterns
        
        
        fulldata.forEach( function(item,index,array ) {
            if ((( fulldata.slice(index, (index + patternToSearch.length) )).join('')).includes(patternToSearch)) //Sees if letters following one at index follow pattern required
            {
                offsets.push(index);    //Adds index of pattern to offsets aray
            }
        })
        patternTable[patternToSearch] = offsets.length;     //Adds final count of number of the pattern to the patternTable
        offsets.forEach( function(item, index, array ) {
            testlib.foundMatch(patternToSearch, offsets[index]);    //Signals all matches that have been found
        })
        
      })
      testlib.frequencyTable(patternTable);   //Displays tables of number of patterns found
} );

testlib.setup(2);
