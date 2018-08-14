// https://stackoverflow.com/questions/36293160/typescript-javascript-import-all-types

// this syntax was taken from hovering over the @typedef in BracketUtils

// The main object
export type BracketInstance = {
  bracketInstanceId: string;
  rounds: Round[];
  bracketField: BracketField;  // the id of the bracket field the bracket instance was created from
  user: string;
}


export type BracketField = {
  bracketFieldId: string;
  name: string;
  teams: Team[];
}


export type Round = {
  matchups: Matchup[];
}


export type Matchup = {
  matchupId: string;
  sourceMatchupTwoId: string;
  sourceMatchupOneId: string;
  teamOneId: string;
  teamTwoId: string;
  winnerTeamId: string;
}


export type Team = {
  name: string;
  imgLink: string;
  teamId: string;
  seed: number;
}

// Not sure if we'll keep using BracketResult
// Alternatively, we can just send:
// 1. bracket instance id
// 2. list of rounds


export type BracketResults = {
results: BracketResult[];
}


// Bracket Result
export type BracketResult = {
  matchupId: string;
  winnerTeamId: string;
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
  sides: TournamentSides;
  selected: boolean;
}


// A Seed
export type TournamentSeed = {
  sourceGame: TournamentGame;
  rank: number;
  displayName: string;
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

 

 // STORES

export type BracketStore = {
  homeOnTop: boolean;
  finalTournamentGame: TournamentGame;
  selectedGame: TournamentGame;
  bracketFields: BracketField[];
  bracketInstance: BracketInstance;
  teamsById: Map<string, Team>;
}