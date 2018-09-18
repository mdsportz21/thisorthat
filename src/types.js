// https://stackoverflow.com/questions/36293160/typescript-javascript-import-all-types

// this syntax was taken from hovering over the @typedef in BracketUtils

export type Matchup = {
  matchupId: string;
  sourceMatchupTwoId: string;
  sourceMatchupOneId: string;
  teamOneId: string;
  teamTwoId: string;
  winnerTeamId: string;
}

export type Round = {
  matchups: Matchup[];
}

export type Team = {
  name: string;
  imgLink: string;
  teamId: string;
  seed: number;
}

export type BracketField = {
  bracketFieldId: string;
  name: string;
  teams: Team[];
}

// The main object
export type BracketInstance = {
  bracketInstanceId: string;
  rounds: Round[];
  bracketField: BracketField;  // the id of the bracket field the bracket instance was created from
  user: string;
}

// Not sure if we'll keep using BracketResult
// Alternatively, we can just send:
// 1. bracket instance id
// 2. list of rounds



// Bracket Result
export type BracketResult = {
  matchupId: string;
  winnerTeamId: string;
}

export type BracketResults = {
  results: BracketResult[];
}

// React Tournament Bracket Types (Frontend Types)


export type TournamentTeam = {
  id: string;
  name: string;
}


// A Score
export type TournamentScore = {
  score: number;
}


// A Game. Brackets are built from the finals to the first round, recursively, using gameObject.sides.visitor|home.seed.sourceGame.
export type TournamentGame = {
  id: string;
  name: string;
  // eslint-disable-next-line
  sides: TournamentSides;
  selected: boolean;
}


// A Seed
export type TournamentSeed = {
  sourceGame: TournamentGame;
  rank: number;
  displayName: string;
  sourceGameId: string; // this is used to populate sourceGame
}


// A Side
export type TournamentSide = {
  gameId: string;
  team: TournamentTeam;
  score: TournamentScore;
  seed: TournamentSeed;
}


// Sides
export type TournamentSides = {
  visitor: TournamentSide;
  home: TournamentSide;
}

// Everything we need for display
export type BracketDisplayInfo = {
  displayedRootGame : TournamentGame; // root of the portion of the bracket that is currently being displayed
  gamesForDisplay: TournamentGame[];
  gamesForDisplayIndex: number;
  rootGame: TournamentGame;
  selectedGame: TournamentGame; // of the displayed games, the one that is currently selected
  teamsById: { [x: string]: Team }; // teamsById: Object.<string, Team>;
}

// STORES

export type BracketStore = {
  bracketFields: BracketField[];
  bracketDisplayInfo: BracketDisplayInfo;
  bracketInstance: BracketInstance;
  homeOnTop: boolean;
}