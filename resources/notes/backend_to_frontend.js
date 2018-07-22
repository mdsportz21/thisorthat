/**
 * Rules
 * 1. Order
 *  1. Play-in games
 *    sides -> game
 *  2. First round
 *    sides -> game...
 * 2. slotOne = visitor, slotTwo = home
 */

// Example Conversion

// Get finals matchup id
// Get game from gamesByMatchupId

// TEST:
// Import all of these functions into App.js
// Insert games into Bracket react component object
// See if it works!!!



    // a game is made up of:
    //  ID
    //  name
    //  sides

    // brackets are built from the finals back
    // sourceGame is used to define the previous round's games

    //let's always make the home == one and visitor == two

    // so, to construct a bracket, i need to:
    //  build a dictionary of slots by ID
    //  build a dictionary of matchups by ID
    //  find the finals matchup (last round) and transform to bracket game
    //      id = whatever
    //      name = round of {rounds[-1].matchups.size() * 2}
    //      if there is another round before this
    //          sides:
    //              home
    //        